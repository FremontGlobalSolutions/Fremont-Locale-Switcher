# @fremont/locale-switcher

Shared locale dropdown UI (flags + pill trigger + accessible listbox panel) for Fremont web apps.

## Install

Published to GitHub Packages:

```bash
# .npmrc (repo root or ~/.npmrc)
@fremont:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

npm install @fremont/locale-switcher
```

In `package.json`:

```json
"@fremont/locale-switcher": "0.1.0"
```

For local sibling-repo development you can still use:

```bash
npm install file:../Fremont-Locale-Switcher
```

Add `transpilePackages: ['@fremont/locale-switcher']` to `next.config.mjs` / `next.config.ts`.

## Styles

Import in your global stylesheet:

```scss
@import '@fremont/locale-switcher/styles.scss';
```

## Variants

| `variant` | Use when |
|-----------|----------|
| `light` | Fixed light header (Fremont AgentOps marketing site) |
| `dark` | Fixed dark header (Fremont Global marketing site) |
| `auto` | App follows `next-themes` / `.dark` on `<html>` (Fremont AgentOps UI) |

`auto` applies light styles under `:root:not(.dark)` and dark styles under `.dark`, so it tracks the app theme switcher without extra React state.

## Usage with next-intl (URL locales)

See wrappers in Fremont-AgentOps-Web and Fremont-Global-Web (`variant="light"` / `variant="dark"`).

## Usage with next-intl (cookie locales)

For apps that keep locale in a cookie (no URL prefix), set the cookie in `onLocaleChange` and refresh. Use `variant="auto"` when the host app has a light/dark theme toggle:

```tsx
<LocaleSwitcher
  variant="auto"
  onLocaleChange={(next) => {
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }}
  /* ... */
/>
```
