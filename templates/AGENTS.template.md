<!--
Template for the AGENTS.md of a nipscernlab repository.
Copy it to the root of the repository as AGENTS.md, replace every <placeholder>, and delete this comment.
Also add a CLAUDE.md at the root whose first line is @AGENTS.md, followed only by what is specific to Claude.
Keep the section "Rules of the laboratory" as it is: it is the same in every repository.
-->

# Working on <PROJECT>

This file is the entry point for anyone who changes this repository, a person or a coding agent. It says what the project is, where each rule lives and the one path every change takes. It links to documents rather than repeating them, so that each rule has one copy.

## What <PROJECT> is

<One paragraph: what the project does, who uses it, and what it depends on.>

The maintainer is named in [`CODEOWNERS`](CODEOWNERS).

## The one command

```bash
<the command that runs locally what CI runs>
```

It runs what CI runs, in the same order. It is green before every push.

## Where the truth lives

| Question | File |
|---|---|
| What the project does and how to use it | [`README.md`](README.md) |
| How to set up and open a pull request | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| What changed in each version | [`CHANGELOG.md`](CHANGELOG.md) |
| <other question> | <file> |

## Rules of the laboratory

These come from the [nipscernlab guidelines](https://github.com/nipscernlab/.github/blob/main/GUIDELINES.md) and the [writing style](https://github.com/nipscernlab/.github/blob/main/STYLE.md). They apply to people and agents alike.

1. Work on a branch of this repository named `<login>/<topic>`, and reach `main` through a pull request. Nobody pushes to `main` directly.
2. A pull request is merged only when the required CI checks pass. A pull request from anyone other than an organization owner also needs the approval of the maintainer named in `CODEOWNERS`. If you need a merge, ask the maintainer.
3. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/). The body says why.
4. Code and documentation move together. If a change makes a sentence in the README, the manual or any document untrue, the same pull request fixes it. An outdated document is a defect, like a failing test.
5. Every change comes with the tests that show it works.
6. No credential enters the repository: no password, API key, token, connection string or private key. A credential that reaches a commit is reported at once so it can be revoked.
7. Data from the ATLAS collaboration enters this repository only under the collaboration policy.
8. Facts about SAPHO, C±, YANC and the other projects of the laboratory come from their manual and their repositories, not from general knowledge: none of them exists outside this organization. An inference is written as an inference.

## What an agent must never do

- Merge a pull request on its own initiative. A merge needs the explicit authorization, for that pull request, of the person running the agent (see "Merging a pull request" below).
- Push to `main`, or rewrite its history.
- Change repository or organization settings, rulesets, secrets, workflows' permissions or collaborators.
- Disable, skip or weaken a test, a check or a lint to make CI pass.
- Write a fact, a number or a result it has not verified. Check it, or say it was not checked.

## Merging a pull request

An agent merges only when the person running it, who must be allowed to merge that pull request, asks for that merge explicitly. The authorization covers one pull request, once. Before merging, the agent:

1. checks that every required check passed on the pull request's head (`gh pr checks <n>`);
2. checks that the head is the commit the person reviewed: a commit pushed after the authorization needs a new one;
3. writes a comment on the pull request saying who authorized the merge and when;
4. merges with the method the repository uses, never with a rule bypass or an administrator override.

If any of these fails, the agent does not merge and says why.

## Rules of this repository

<Rules specific to this project, each with the tool or test that enforces it, if any.>
