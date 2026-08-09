# Pametni sistem čakalnice

Local-first React prototype for demonstrating patient intake, queue operations, a privacy-minimized public display, operational reports, and QR ticket handoff. It is a portfolio-grade product demo—not a clinical information system.

## What it demonstrates

- Patient intake with validation, department/room routing, priorities, and operational notes
- Queue progression, call-next behavior, status timeline, completion, and deletion
- Anonymous waiting-room display that uses ticket numbers instead of names
- Responsive staff, patient-status, report, settings, and printable-ticket views
- Semicolon-delimited daily CSV export with spreadsheet-formula neutralization
- Portable QR status snapshots containing only ticket number, status, department, room, and arrival time
- Local persistence with visible storage-failure feedback

## Important safety boundary

The role picker creates a browser-local demo session. It is **not authentication or authorization**. All data is stored in `localStorage`, and the example records are fictional. Do not enter real patient data or use this prototype in a healthcare workflow.

In the originating browser, a status page reflects local demo changes. On a different device, the QR URL can only show the privacy-minimized snapshot encoded when the ticket was generated; it is not live or tamper-proof. A real deployment requires a shared backend, authenticated staff accounts, auditable permissions, encrypted transport/storage, retention controls, and an opaque server-issued patient-status token.

## Stack

- React 18 and TypeScript
- Vite 8
- React Router 7
- Vitest and Playwright
- Custom responsive CSS
- Netlify/Vercel static SPA configuration

## Local development

Requires Node.js 22 or a compatible newer release.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/`.

No environment variables are required. `.env.example` documents placeholders for a future backend or analytics integration; every `VITE_` value is public browser configuration and must never contain a secret.

## Verification

```bash
npm audit --audit-level=high
npm audit --omit=dev --audit-level=high
npm run typecheck
npm run lint
npm run test
npm run build
npx playwright install chromium
npm run smoke
```

Local Windows users with system Chrome may set `PW_CHANNEL=chrome` for the Playwright run. CI uses Playwright's bundled Chromium.

## Architecture

- `src/state/AppContext.tsx` owns the local demo state and persistence boundary.
- `src/utils/queue.ts` and `src/utils/reports.ts` contain testable operational calculations and export logic.
- `src/utils/publicStatus.ts` creates and validates the minimum portable QR snapshot.
- `/patient/:id/ticket` renders print output through the application bundle, avoiding inline-script/document-write printing.
- `/patient/:id/status` prefers live local state and falls back to a validated portable snapshot.
- `/display` intentionally shows ticket numbers and rooms, not initials or operational notes.

## Deployment

Build with `npm run build` and publish `dist/`. `vercel.json` and `netlify.toml` include SPA fallbacks and baseline static security headers. See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete boundary.

## Current limitations

- Demo roles are self-selected and provide no security boundary.
- Browser storage is single-device, unaudited, and unsuitable for sensitive data.
- Cross-device QR snapshots are informational, static, and user-modifiable.
- No backend, database, account recovery, audit log, monitoring, backup, or production healthcare compliance work is included.
- Static hosting configuration has not been deployed or production-tested in this upgrade.

## Author

**Tini Flegar** — Full-Stack Developer · IT & Finance. Contact: [flegardev@gmail.com](mailto:flegardev@gmail.com).
