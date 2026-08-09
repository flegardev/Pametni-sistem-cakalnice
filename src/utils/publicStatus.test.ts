import { describe, expect, it } from "vitest";
import type { Patient } from "../types";
import {
  createPublicPatientStatusPath,
  parsePublicPatientSnapshot,
} from "./publicStatus";

const patient: Patient = {
  id: "p-lab-1",
  number: "LAB-004",
  initials: "A.B.",
  visitType: "Laboratorij",
  reasonCategory: "Odvzem krvi",
  priority: "Normalno",
  status: "Čaka na odvzem",
  department: "laboratorij",
  assignedRoom: "lab-1",
  arrivalTime: "2026-08-09T12:00:00.000Z",
  qrCodeUrl: "/patient/p-lab-1/status",
  timeline: [],
};

describe("portable public status snapshot", () => {
  it("contains only the minimum public queue fields", () => {
    const path = createPublicPatientStatusPath(patient);
    expect(path).not.toContain("A.B.");
    expect(path).not.toContain("Odvzem");
    expect(parsePublicPatientSnapshot(path.split("?")[1])).toEqual({
      number: "LAB-004",
      status: "Čaka na odvzem",
      department: "laboratorij",
      room: "lab-1",
      arrivalTime: "2026-08-09T12:00:00.000Z",
    });
  });

  it("rejects malformed or unsupported snapshot fields", () => {
    expect(parsePublicPatientSnapshot("?number=%3Cscript%3E&status=%C4%8Caka&department=x&arrival=bad")).toBeNull();
    expect(parsePublicPatientSnapshot("?number=A-1&status=Izmišljeno&department=x&arrival=2026-08-09")).toBeNull();
  });
});
