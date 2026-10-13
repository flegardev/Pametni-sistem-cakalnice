# Pametni Sistem Cakalnice (Smart Waiting Room Management)

A browser-based clinic queue demonstration built with React 18, TypeScript, and Vite, featuring TV status displays, consultation desks, and patient QR snapshots.

This is a portfolio demo. Sign-in and patient records are stored in browser localStorage; they do not provide server-enforced authentication or shared, secure persistence. QR snapshots are portable snapshots rather than a verified live cross-device backend. Use synthetic data for demonstrations.

![Smart Waiting Room Dashboard](./docs/screenshots/02-dashboard.png)

## Overview

**Pametni Sistem Cakalnice** is a healthcare waiting room and queue coordination system designed for outpatient clinics and medical practices. It streamlines patient reception, automates digital ticket issuance, optimizes doctor room allocation, and reduces patient waiting friction.

The application provides dedicated operational views: a reception registration desk, a doctor triage console, a public full-screen TV display board for waiting rooms, and a mobile-friendly status page accessed via ticket QR codes.

## Features

- **Digital Ticketing**: Generates categorized queue tickets (e.g., General Practice, Specialist, Emergency) with estimated wait times.
- **Public TV Waiting Room Display**: Full-screen TV mode (`docs/screenshots/06-javni-zaslon.png`) showing called ticket numbers, room assignments, and visual notifications.
- **Doctor Consultation Desk**: Real-time triage interface allowing physicians to call the next patient, review visit reasons, reassign queues, and log consultation notes.
- **Patient QR Mobile Tracking**: Patients scan a unique QR code (`qrcode.react`) on their ticket to monitor live queue progression on their mobile devices.
- **Operational Reporting**: Dashboards visualizing average waiting durations, daily throughput, peak congestion hours, and room utilization.
- **In-Memory Demo Mode**: Includes mock datasets and state simulation for offline demonstration and development.

## Screenshots

| Doctor Triage Dashboard | Public TV Waiting Display |
|:---:|:---:|
| ![Dashboard](./docs/screenshots/02-dashboard.png) | ![Public TV Display](./docs/screenshots/06-javni-zaslon.png) |

| Live Queue Management | Patient Mobile QR Tracker |
|:---:|:---:|
| ![Queue Management](./docs/screenshots/05-cakalne-vrste.png) | ![QR Mobile Status](./docs/screenshots/07-status-qr.png) |

## Tech Stack

- **Frontend Framework**: React 18, React DOM
- **Routing & State**: React Router 7 (`react-router-dom`), Custom React State Architecture
- **Language & Build Tool**: TypeScript, Vite
- **UI Components & Icons**: Lucide React (`lucide-react`), QRCode React (`qrcode.react`)
- **Styling**: Tailwind CSS / Custom CSS3 Utility Architecture
- **Testing & Tooling**: Vitest, Playwright, ESLint, TypeScript Compiler

## Project Structure

```text
pametni-sistem-cakalnice/
├── docs/                       # Project specifications and interface screenshots
│   └── screenshots/            # UI screenshots (Dashboard, TV display, QR tracking)
├── public/                     # Favicons, audio chime assets, and static files
├── src/
│   ├── components/             # Reusable UI widgets (modals, ticket badges, headers)
│   ├── data/                   # Mock clinic departments, doctors, and demo queues
│   ├── hooks/                  # Custom state hooks for queue timers and sound alerts
│   ├── pages/                  # Reception, Doctor Desk, TV Screen, Analytics pages
│   ├── state/                  # Queue store and event dispatchers
│   ├── types.ts                # TypeScript domain models (Patient, Ticket, Department)
│   ├── utils/                  # Date helpers, QR generators, and formatters
│   ├── App.tsx                 # Route declarations and root layout
│   └── main.tsx                # Application entrypoint
├── tests/                      # Vitest unit test suites
├── _final_desktop_screenshots/ # Production desktop screenshot captures
├── index.html                  # HTML5 entrypoint template
├── package.json                # Project dependencies and lifecycle scripts
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite bundler configuration
```

## Installation & Setup

### Prerequisites

- Node.js 22.12+ or Node.js 24 (verified with Node.js 24)
- npm 9+

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/flegardev/pametni-sistem-cakalnice.git
   cd pametni-sistem-cakalnice
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

## Available Routes & Views

- `/` -- Main Reception & Clinic Dashboard
- `/cakalne-vrste` -- Live Queue & Doctor Consultation Triage
- `/javni-zaslon` -- Fullscreen TV Waiting Room Display
- `/registracija` -- Patient Intake & Ticket Generation
- `/pacienti` -- Patient Directory & Medical History
- `/porocila` -- Operational Analytics & Wait Time Reports
- `/status/:ticketId` -- Patient Mobile QR Live Queue Tracker

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite dev server bound to `127.0.0.1` |
| `npm run build` | Validates types with `tsc -b` and builds production bundle |
| `npm run preview` | Previews the production build locally |
| `npm test` | Runs unit test suites using Vitest |
| `npm run smoke` | Executes end-to-end smoke tests using Playwright |
| `npm run typecheck` | Validates TypeScript typing across all components |
| `npm run lint` | Checks code formatting and quality with ESLint |

## License & Portfolio Notice

Copyright (c) 2026 Tini Flegar. All rights reserved.
Published for portfolio review and technical demonstration.
