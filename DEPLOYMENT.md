# Deployment — Pametni Sistem Čakalnice (Smart Queue System)

Vite + React + react-router SPA. Browser-only queue management (ticketing, departments, rooms, call-next, public display, reports/CSV). No backend required for the demo; state persists in the browser. Targets: **Vercel** or **Netlify** (static).

## Build / run
| Command | Purpose |
|---------|---------|
| `npm ci` | Clean install |
| `npm run typecheck` | `tsc -b` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests (excludes smoke/coursework dirs) |
| `npm run smoke` | Playwright smoke (needs `npx playwright install`) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve built `dist/` |

Node: 22+ (CI), verified on 24. Output: `dist`.

## Vercel / Netlify
Config files included. The app uses `BrowserRouter`, so the **SPA rewrite/redirect to `/index.html` is required** for deep links (`/dashboard`, `/patients`, the public display, etc.).

Both deployment configs also set baseline static-site security headers: CSP,
Referrer-Policy, X-Content-Type-Options, Permissions-Policy, and frame blocking.

## Environment variables
None required — runs fully in the browser. `.env.example` lists only *optional future* `VITE_` vars (backend API, analytics). Any `VITE_` var is **client-visible**; never store secrets.

## Privacy note
The public display screen is designed to avoid exposing private patient information. The portable QR URL contains only ticket number, status, department, room, and arrival time, but it is a static, user-modifiable snapshot rather than a secure live-status channel. Verify before any demonstration that only fictional records are used.

## Production boundary

The role selector is a local demo session, not authentication or authorization. `localStorage` is not an acceptable patient-data store. Do not deploy this static prototype into a real clinic without a shared backend, authenticated staff identities, server-enforced permissions, opaque expiring patient tokens, audit logs, retention/deletion controls, encryption, monitoring, backups, and an applicable legal/compliance review.

## Repo hygiene fix applied
`vite.config.js` and `vite.config.d.ts` were committed compiled artifacts. Because Vite resolves `vite.config.js` **before** `vite.config.ts`, the stale compiled file was the one actually used — edits to the `.ts` source were silently ignored. The artifacts were removed and gitignored; `vite.config.ts` is now authoritative.

## Known limitations
- Demo persistence is local to the browser. For multi-station/real deployments, wire a shared backend (`VITE_API_URL`).
- QR snapshots opened on another device do not update after the ticket is issued.
