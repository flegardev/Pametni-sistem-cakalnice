# 🎓 Pametni Sistem Čakalnice (Smart Clinic Queue) — Beginner's Learning Guide

## What This Project Does
**Pametni-sistem-cakalnice** is a healthcare triage and waiting room queue management system built with React 18, Vite, and Tailwind CSS. It manages patient intake, prioritized triage categorization (`Kritično`, `Nujno`, `Prednostno`, `Normalno`), staff consultation dashboards, and live waiting room TV display synchronization.

---

## 🗺️ Architecture Map

```
ENTRY POINT
  │  (src/main.tsx & src/App.tsx)
  ▼
ROUTING & MULTI-VIEW SCREENS
  │  ├── Patient Kiosk Ticket Issuer (/ticket - PatientTicketPage.tsx)
  │  ├── Staff & Triage Management Dashboard (/patients - PatientsPage.tsx)
  │  ├── Waiting Room Wall Display Screen (/display - DisplayPage.tsx)
  │  └── Public Ticket Status (/status/:id - PatientStatusPage.tsx)
  ▼
GLOBAL STATE & SYNC CONTEXT
  │  (src/state/AppContext.tsx, localStorage Persistence)
  ▼
TRIAGE PRIORITY QUEUE ALGORITHM
  │  (src/utils/queue.ts, Weighted Medical Urgency + FIFO Tie-breaking)
  ▼
REPORTS & CSV EXPORT
     (src/utils/reports.ts, Formula Injection Sanitized Patient Flow Export)
```

---

## 🎯 Core Files to Study First (Recommended Learning Order)

1. [`src/utils/queue.ts`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/utils/queue.ts)
   - **Why study first**: Contains the core healthcare triage sorting algorithm ordering patients by medical priority (`Kritično` > `Nujno` > `Prednostno` > `Normalno`) and arrival time.
2. [`src/state/AppContext.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/state/AppContext.tsx)
   - **Why study next**: Teaches React Context API and state reducers for managing clinic queue state across multiple views.
3. [`src/pages/DisplayPage.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/pages/DisplayPage.tsx)
   - **Why study third**: Shows how full-screen waiting room displays highlight newly called patient numbers.
4. [`src/pages/PatientsPage.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/pages/PatientsPage.tsx)
   - **Why study fourth**: Demonstrates the clinic staff workflow: triage assignment, patient calling, status transitions, and department routing.

---

## 🛠️ How to Run & Verify

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
2. **Run Unit Tests**:
   ```bash
   npm test
   ```
3. **Production Build**:
   ```bash
   npm run build
   ```
