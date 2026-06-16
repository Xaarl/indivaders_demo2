# GitHub Setup

Date: 2026-06-16

The local repository has a clean baseline commit and a Sprint 001 handoff branch. It does not yet have a remote configured.

## Current Local State

Baseline commit:

```text
212e353 chore: establish standalone Indievaders baseline
```

Working branch for handoff additions:

```text
codex/sprint-001-handoff
```

## Decisions Needed Before Push

Choose:

1. Repository owner or organization.
2. Repository name.
3. Visibility: private or public.

Recommended initial visibility:

```text
private
```

Recommended repository name:

```text
indievaders
```

## Push Flow

After the remote exists:

```text
git remote add origin <repo-url>
git push -u origin master
git push -u origin codex/sprint-001-handoff
```

Then open a pull request from:

```text
codex/sprint-001-handoff -> master
```

Suggested PR title:

```text
Prepare Sprint 001 PM and design handoff
```

## After Push

1. Create labels from `docs/project-management/github-issue-backlog.md`.
2. Create Sprint 001 issues from `docs/project-management/github-issue-backlog.md`.
3. Confirm `.github/ISSUE_TEMPLATE/` appears in GitHub issue creation.
4. Confirm `.github/PULL_REQUEST_TEMPLATE.md` appears on new PRs.
5. Add PM and designer as collaborators only after visibility is confirmed.

