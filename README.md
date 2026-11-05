# ryanhudgeons.github.io  (custom domain planned: ljna2714.com)

- `/` — LJNA 2714 company landing page (`index.html`).
- `/ryanhudgeons/` — publisher site: home page plus support/privacy/methods pages per app
  (`cctvcalc/`, `cable-ledger/`, `radius/`, `littlepilots/`). Shares `style.css`, `fonts/`, `img/` there.
- Old paths (`/cctvcalc/`, `/radius/`, `/cable-ledger/`, `/littlepilots/`) are redirect stubs to their
  `/ryanhudgeons/` pages, so URLs already in App Store Connect and Google Play keep working.
- Paw Pairs' pages live in the separate `ryanhudgeons/kidsmatch` repo, served at `/kidsmatch/`.
- Custom domain: add a `CNAME` file (ljna2714.com) ONLY after the DNS records are live, or the site breaks.

## To do when an app is released
- **Paw Pairs** (approved, pending developer release): change its cards (landing page and
  `/ryanhudgeons/`) from "Coming soon" to "Available" and add the App Store badge.
- **Cable Ledger, Radius**: same change at release.
- **Little Pilots**: `ryanhudgeons/littlepilots/privacy.html` exists but is unlinked; add its card at submission.
