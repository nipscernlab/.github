// Weekly audit of the organization, run by .github/workflows/audit.yml.
// Reads with the App token, writes one issue with the workflow token.
// A read that fails is reported in the issue rather than failing the run:
// a partial audit is more useful than none.
//
// This repository is public, and so are the issue and the run summary.
// Nothing here may name a person or a private repository: people are
// counted, private repositories are skipped. The owners read the details
// in the organization settings.

const ISSUE_TITLE = 'Weekly audit of the organization'

// Section 3 of GUIDELINES.md. Each entry lists the names that satisfy it.
const REQUIRED_FILES = [
  ['README.md'],
  ['LICENSE', 'LICENCE', 'LICENSE.md', 'LICENCE.md', 'LICENSE.txt'],
  ['CHANGELOG.md'],
  ['CODEOWNERS', '.github/CODEOWNERS', 'docs/CODEOWNERS'],
  ['AGENTS.md'],
  ['CLAUDE.md'],
]

const TODO_FILE = /^(todo|to-do|to_do)(\.[a-z]+)?$/i

module.exports = async ({ github, context, core, getOctokit }) => {
  const reader = getOctokit(process.env.APP_TOKEN)
  const org = context.repo.owner
  const failures = []

  // Returns the response data, or null after recording why the read failed.
  const read = async (what, fn) => {
    try {
      return await fn()
    } catch (err) {
      failures.push(`${what}: ${err.status || ''} ${err.message}`.trim())
      return null
    }
  }

  const out = []
  const today = new Date().toISOString().slice(0, 10)
  out.push(`Updated ${today} by the [weekly audit](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/workflows/audit.yml). Section 10 of [GUIDELINES.md](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/blob/main/GUIDELINES.md) describes what it checks. This issue is rewritten each week; comment below, not in the body.`)

  // Organization settings (section 8).
  const o = await read('organization settings', async () => (await reader.rest.orgs.get({ org })).data)
  out.push('', '## Organization', '')
  if (o) {
    const row = (name, value, expected) => `| ${name} | ${value} | ${value === expected ? 'ok' : `expected ${expected}`} |`
    out.push('| Setting | Value | |', '|---|---|---|')
    out.push(row('Two-factor authentication required', String(o.two_factor_requirement_enabled), 'true'))
    out.push(row('Base permission', String(o.default_repository_permission), 'read'))
    out.push(row('Members can create repositories', String(o.members_can_create_repositories), 'false'))
  }

  // People (section 8): only owners are members; everyone has two-factor.
  const list = (what, route, params) =>
    read(what, () => reader.paginate(route, { org, per_page: 100, ...params }))
  const owners = await list('owners', reader.rest.orgs.listMembers, { role: 'admin' })
  const members = await list('members', reader.rest.orgs.listMembers, { role: 'member' })
  const outside = await list('outside collaborators', reader.rest.orgs.listOutsideCollaborators, {})
  const no2faMembers = await list('members without two-factor', reader.rest.orgs.listMembers, { filter: '2fa_disabled' })
  const no2faOutside = await list('outside collaborators without two-factor', reader.rest.orgs.listOutsideCollaborators, { filter: '2fa_disabled' })
  const count = (xs) => (xs ? String(xs.length) : 'not read')

  out.push('', '## People', '')
  out.push('Counts only; the names are in the organization settings.', '')
  out.push(`- Owners: ${count(owners)}`)
  out.push(`- Members who are not owners (the guidelines expect 0): ${count(members)}`)
  out.push(`- Outside collaborators: ${count(outside)}`)
  out.push(`- Accounts without two-factor authentication (the guidelines expect 0): ${no2faMembers && no2faOutside ? no2faMembers.length + no2faOutside.length : 'not read'}`)

  // Repositories (sections 3, 8 and 9).
  const repos = (await read('repositories', () => reader.paginate(reader.rest.repos.listForOrg, { org, type: 'all', per_page: 100 }))) || []
  const active = repos.filter((r) => !r.archived).sort((a, b) => a.name.localeCompare(b.name))
  // Section 1: the guidelines cover public repositories for now, and private
  // ones must not be named here. This repository holds the defaults and is
  // exempt from the required files.
  const isPublic = (r) => r.visibility === 'public'

  const filesRows = []
  const protectionRows = []
  for (const r of active) {
    const repo = { owner: org, repo: r.name }
    const branch = r.default_branch
    if (!isPublic(r)) continue

    const names = new Set()
    for (const dir of ['', '.github', 'docs']) {
      const listing = await read(`${r.name}: list ${dir || 'root'}`, async () => (await reader.rest.repos.getContent({ ...repo, path: dir, ref: branch })).data)
      if (Array.isArray(listing)) listing.forEach((f) => names.add(dir ? `${dir}/${f.name}` : f.name))
    }
    // A missing .github or docs folder is normal; drop those failures.
    for (let i = failures.length - 1; i >= 0; i--) {
      if (failures[i].startsWith(`${r.name}: list .github`) || failures[i].startsWith(`${r.name}: list docs`)) failures.splice(i, 1)
    }
    const missing = REQUIRED_FILES.filter((alts) => !alts.some((n) => names.has(n))).map((alts) => alts[0])
    const todos = [...names].filter((n) => TODO_FILE.test(n.split('/').pop()))
    if (r.name === '.github') missing.length = 0
    if (missing.length || todos.length) {
      filesRows.push(`| ${r.name} | ${missing.join(', ') || ''} | ${todos.join(', ')} |`)
    }

    const rules = await read(`${r.name}: rules on ${branch}`, async () => (await reader.rest.repos.getBranchRules({ ...repo, branch, per_page: 100 })).data)
    const types = new Set((rules || []).map((x) => x.type))
    const full = await read(`${r.name}: settings`, async () => (await reader.rest.repos.get(repo)).data)
    const sa = (full && full.security_and_analysis) || {}
    const on = (k) => (sa[k] && sa[k].status === 'enabled' ? 'yes' : 'no')
    const pvr = await read(`${r.name}: private vulnerability reporting`, async () =>
      (await reader.request('GET /repos/{owner}/{repo}/private-vulnerability-reporting', repo)).data.enabled ? 'yes' : 'no')
    const dependabot = await reader
      .request('GET /repos/{owner}/{repo}/vulnerability-alerts', repo)
      .then(() => 'yes', (err) => (err.status === 404 ? 'no' : '?'))
    const yn = (b) => (rules ? (b ? 'yes' : 'no') : '?')
    protectionRows.push(`| ${r.name} | ${yn(types.has('pull_request'))} | ${yn(types.has('required_status_checks'))} | ${yn(types.has('non_fast_forward'))} | ${on('secret_scanning')} | ${on('secret_scanning_push_protection')} | ${dependabot} | ${pvr || '?'} |`)

  }

  out.push('', '## Required files', '')
  const publicCount = active.filter(isPublic).length
  out.push(`${publicCount} public repositories that are not archived. Listed only where a file from section 3 is missing or a TODO file is present.`, '')
  if (filesRows.length) out.push('| Repository | Missing | TODO file |', '|---|---|---|', ...filesRows)
  else out.push('Every repository has the required files.')

  out.push('', '## Protection and security', '')
  out.push('Rules are the ones active on the default branch, from any ruleset or branch protection.', '')
  out.push('| Repository | Pull request | Required checks | No force push | Secret scanning | Push protection | Dependabot alerts | Private reporting |')
  out.push('|---|---|---|---|---|---|---|---|', ...protectionRows)


  out.push('', '## Not covered yet', '')
  out.push('- People and access by name, and private repositories: this issue is public.')
  out.push('- Comparison with the access list, which is kept outside public repositories.')
  out.push('- Open vulnerabilities by severity and age: the App has no permission to read alerts.')
  out.push('- Manuals behind their software, and tokens or certificates close to expiry.')

  if (failures.length) {
    out.push('', '## Reads that failed', '')
    failures.forEach((f) => out.push(`- ${f}`))
  }

  const body = out.join('\n')
  const issues = await github.paginate(github.rest.issues.listForRepo, {
    ...context.repo, state: 'open', creator: 'github-actions[bot]', per_page: 100,
  })
  const existing = issues.find((i) => i.title === ISSUE_TITLE)
  if (existing) {
    await github.rest.issues.update({ ...context.repo, issue_number: existing.number, body })
    core.notice(`Updated issue #${existing.number}`)
  } else {
    const created = await github.rest.issues.create({ ...context.repo, title: ISSUE_TITLE, body })
    core.notice(`Created issue #${created.data.number}`)
  }
  await core.summary.addRaw(body).write()
}
