# GitHub Packages access

`@fremontglobalsolutions/locale-switcher` is published to GitHub Packages from this repository.

Consumer repos (`Fremont-Global-Web`, `Fremont-AgentOps-Web`, `Fremont-AgentOps-UI`) must be granted read access or their CI `npm ci` will fail with 401/403.

## Grant consumer CI access

Consumer workflows authenticate with `GITHUB_TOKEN` (`packages: read`). Each consumer repo must be allowed to read this package.

### Automated (preferred)

Run **Actions → Grant package access to consumers → Run workflow** in this repository.  
The workflow also runs automatically after a successful **Publish to GitHub Packages** run.

### Manual (org admin)

1. Open the package settings:  
   https://github.com/orgs/FremontGlobalSolutions/packages/npm/package/locale-switcher/settings

2. Under **Manage Actions access**, add:
   - `Fremont-Global-Web`
   - `Fremont-AgentOps-Web`
   - `Fremont-AgentOps-UI`

3. Re-run failed CI workflows on those repos.

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
