# GitHub Packages access

`@fremontglobalsolutions/locale-switcher` is published to GitHub Packages from this repository.

Consumer repos (`Fremont-Global-Web`, `Fremont-AgentOps-Web`, `Fremont-AgentOps-UI`) must be granted read access or their CI `npm ci` will fail with 401/403.

## Consumer CI access (package is public)

This package is **public**. Consumer workflows authenticate with the built-in
`GITHUB_TOKEN` (`packages: read`) — no per-repo grant and no extra secret is
required. GitHub Packages still requires *a* token to pull, but any valid
`GITHUB_TOKEN` works.

### Making the package public (one-time)

1. Open the package page:  
   https://github.com/orgs/FremontGlobalSolutions/packages/npm/package/locale-switcher

2. Right sidebar → **Package settings**.

3. Bottom of the page → **Danger Zone** → **Change visibility** → **Public**
   (type `locale-switcher` to confirm).

### If you keep it private instead

You must either grant each consumer repo access (package settings →
**Manage Actions access** → **Add repository**, when available) or switch
consumer workflows to a PAT secret with `read:packages` (name it something
other than `GITHUB_*`, e.g. `PACKAGES_READ_TOKEN`).

## Local development

Ensure `gh` can read packages:

```bash
gh auth refresh -h github.com -s read:packages
```

Then from a consumer repo:

```bash
export NODE_AUTH_TOKEN="$(gh auth token)"   # PowerShell: $env:NODE_AUTH_TOKEN = gh auth token
npm install
```

The committed `.npmrc` uses `${NODE_AUTH_TOKEN}` for `npm.pkg.github.com`.

## Publish

Publishing runs via **Actions → Publish to GitHub Packages** on:

- manual **workflow_dispatch**
- **release created**
- **tag push** matching `v*`

The npm scope **must** match the GitHub org: `@fremontglobalsolutions` (not `@fremont`).
