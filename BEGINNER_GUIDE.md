# 🎓 Pametni Sistem Čakalnice (Smart Clinic Queue) — Beginner's Learning Guide

## What This Project Does
**Pametni-sistem-cakalnice** is a healthcare triage and waiting room queue management system built with React 18, Vite, and Tailwind CSS. It manages patient intake, prioritized triage categorization (`Kritično`, `Nujno`, `Prednostno`, `Normalno`), doctor room calling, and live waiting room TV display synchronization.

---

## 🗺️ Architecture Map

```
ENTRY POINT
  │  (src/main.tsx & src/App.tsx)
  ▼
ROUTING & MULTI-VIEW SCREENS
  │  ├── Patient Kiosk Ticket Issuer (/ticket)
  │  ├── Doctor / Nurse Triage Dashboard (/doctor)
  │  └── Waiting Room Wall Display Screen (/display)
  ▼
GLOBAL STATE & SYNC CONTEXT
  │  (src/state/AppContext.tsx, localStorage Persistence, Multi-tab BroadcastChannel)
  ▼
TRIAGE PRIORITY QUEUE ALGORITHM
  │  (src/utils/queue.ts, Weighted Medical Urgency + FIFO Tie-breaking)
  ▼
UI / TAILWIND COMPONENTS
     (Voice / Chime Announcements, Ticket Printing, Animated Status Cards)
```

---

## 🎯 Core Files to Study First (Recommended Learning Order)

1. [`src/utils/queue.ts`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/utils/queue.ts)
   - **Why study first**: Contains the core healthcare triage sorting algorithm ordering patients by medical priority (`Kritično` > `Nujno` > `Prednostno` > `Normalno`) and arrival time.
2. [`src/state/AppContext.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/state/AppContext.tsx)
   - **Why study next**: Teaches React Context API and `useReducer` for managing complex queue state across multiple views.
3. [`src/pages/DisplayPage.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/pages/DisplayPage.tsx)
   - **Why study third**: Shows how full-screen waiting room displays highlight newly called patient numbers with audio chimes.
4. [`src/pages/DoctorPage.tsx`](file:///C:/Users/tinif/repos/Pametni-sistem-cakalnice/src/pages/DoctorPage.tsx)
   - **Why study fourth**: Demonstrates the doctor's consultation workflow: calling the next patient, changing status, or transferring rooms.

---

## 🛠️ How to Run & Verify

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
2. **Run Unit Tests**:
   ```bash
   npm run test
   ```
