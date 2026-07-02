# GitHub Packages access

`@fremontglobalsolutions/locale-switcher` is published to GitHub Packages from this repository.

Consumer repos (`Fremont-Global-Web`, `Fremont-AgentOps-Web`, `Fremont-AgentOps-UI`) must be granted read access or their CI `npm ci` will fail with 401/403.

## Consumer CI access (PAT secret)

The default cross-repo `GITHUB_TOKEN` cannot read this org package unless the
package is public/internal or the consumer repo is explicitly granted access —
and that "Manage Actions access" UI is not reliably available for npm packages
in this org. The robust, portable fix is a **PAT secret**.

Consumer workflows authenticate `npm ci` with:

```yaml
NODE_AUTH_TOKEN: ${{ secrets.PACKAGES_READ_TOKEN || secrets.GITHUB_TOKEN }}
```

so they use the PAT when present and fall back to `GITHUB_TOKEN` otherwise.

### One-time setup

1. Create a **classic** personal access token:  
   https://github.com/settings/tokens → **Generate new token (classic)**  
   Scopes: `read:packages` (add `repo` if the package/repo is private).

2. Add it as an **organization secret** so all consumers can use it:  
   https://github.com/organizations/FremontGlobalSolutions/settings/secrets/actions  
   → **New organization secret**  
   - Name: `PACKAGES_READ_TOKEN` (must **not** start with `GITHUB_`)  
   - Value: the PAT  
   - Repository access: `Fremont-Global-Web`, `Fremont-AgentOps-Web`, `Fremont-AgentOps-UI`
     (or all repos).

3. Re-run CI on the consumer branches.

### Alternative: make the package public/internal

If org policy allows it, set the package visibility on its settings page
(**Danger Zone → Change visibility**). Once public/internal, the built-in
`GITHUB_TOKEN` fallback works with no PAT.

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
