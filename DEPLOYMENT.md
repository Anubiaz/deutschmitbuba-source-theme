# Deutsch mit Buba Source Theme Deployment

This repository is intended to be the canonical source for the production Ghost theme `source`.

## Rules

- `main` should represent the latest deployable production-ready theme.
- Do not commit `node_modules/`, `dist/`, local env files, secrets, or generated logs.
- Run GScan before deploy.
- Deploy only from a known commit, tag, or branch.

## Local Check

```bash
corepack enable
yarn install --frozen-lockfile
yarn test:ci
```

## Server Deploy

On the server, deploy from a Git repository and ref:

```bash
/home/ubuntu/codex-tools/scripts/deploy-source-from-git.sh --repo=<git-url> --ref=main
```

The server script clones/fetches the requested ref into `/home/ubuntu/source-theme-releases`, verifies the theme, backs up the current live theme, syncs files to `/var/www/ghost/content/themes/source`, restarts Ghost, and runs smoke checks.

