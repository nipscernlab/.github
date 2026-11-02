# Contributing to nipscernlab

This is the default contributing guide for every repository of the nipscernlab organization. A repository with its own `CONTRIBUTING.md` uses that one instead; read it first if it exists, and read the repository `AGENTS.md`, which says how that project is built and tested.

The rules behind this guide are in the [guidelines](GUIDELINES.md). How we write is in [STYLE.md](STYLE.md).

## Before you start

For anything larger than a small fix, open an issue first and describe what you want to change and why. The organization owner named in the repository `CODEOWNERS` will tell you whether the change fits the project before you spend time on it.

## Making a change

Everyone works on a branch named `<login>/<topic>`. The organization owners create it in the repository itself; everyone else, students of the laboratory included, creates it in a personal fork of the repository:

1. Create the branch from an up-to-date `main`.
2. Make the change, with its tests and with every document it affects updated in the same branch.
3. Run the repository's local check command, listed in its `AGENTS.md`, until it passes.
4. Push the branch and open a pull request against `main` of the repository.

A pull request from a fork runs CI without the repository secrets, so a check that needs one does not run on it; the owner who reviews it knows which.

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): a type, an optional scope and a lower case imperative subject, then a body that says why. Releases are built from the format, so a wrong type produces a wrong version. The guidelines ask every repository to check it in CI; where a repository does not yet, the reviewer checks it.

## The pull request

A pull request describes what changed, why, and how it was tested. It links the issue it resolves.

Only the organization owners merge. A pull request is merged when:

- every required CI check passes;
- the organization owner named in the repository `CODEOWNERS` has reviewed it, for contributors who are not organization owners;
- the documentation describes the change, in English, and in Portuguese where the repository keeps a translation.

Review comments are answered with a new commit or a reply, not by force-pushing over the history of the pull request.

## Coding agents

You may use a coding agent. You answer for what it writes as if you had written it. The agent follows the repository `AGENTS.md`. It never pushes to `main` or changes repository settings, and it merges a pull request only as section 8 of the [guidelines](GUIDELINES.md) allows: with the explicit authorisation of the person running it, given in its session, for that one pull request.

## Licensing

By contributing, you agree that your contribution is distributed under the licence of the repository you contribute to, in its `LICENSE` file.

## Security

Do not report a vulnerability in a public issue. Follow [SECURITY.md](SECURITY.md).
