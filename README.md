# دعوة زفاف يوسف و مَلَك | Wedding Invitation

An interactive bilingual (Arabic / English) wedding invitation built with React, TypeScript and Vite.
Arabic is the default language on every device; guests can switch to English with the toggle.

**Friday, 9 October 2026 — Sky Hall, Irbid, Jordan**

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Publishing to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
After the first push, enable it once:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

The Vite `base` is `./` (relative), so the build works from a project page
(`username.github.io/repo/`), a user page, or a custom domain with no config change.

## Project layout

| Path | Contents |
|---|---|
| `src/i18n.tsx` | All Arabic and English copy, names, dates and times |
| `src/components/` | Envelope, hero, verse, countdown, schedule, location, notes, save-the-date |
| `src/index.css` | Theme colours and shared styles |
| `public/angels-promise.m4a` | Background music track |
| `share/card.html` | Source for the 4:3 share card |
| `share/wedding-card.png` | Rendered share card (1600×1200), Arabic only |

## Editing the invitation text

Almost everything guests read lives in `src/i18n.tsx` — the `ar` object for Arabic
and `en` for English. Change the values in both to keep the two languages in sync.

The Google Maps link is in `src/components/Location.tsx`.

## Regenerating the share card

Edit `share/card.html`, then re-render it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --allow-file-access-from-files --hide-scrollbars --window-size=1600,1200 --screenshot="share/wedding-card.png" "file://$PWD/share/card.html"
```
