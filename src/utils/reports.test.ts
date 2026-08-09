import { describe, expect, it } from "vitest";
import { demoSettings } from "../data/demoData";
import type { Patient } from "../types";
import { getDailyPatientFlowCsv } from "./reports";

describe("daily patient CSV", () => {
  it("neutralizes spreadsheet formulas in exported cells", () => {
    const patient: Patient = {
      id: "csv-1",
      number: "=HYPERLINK(\"https://example.test\")",
      initials: "+SUM(1,1)",
      visitType: "Ambulanta",
      reasonCategory: "Drugo",
      priority: "Normalno",
      status: "Čaka",
      department: "ambulante",
      arrivalTime: new Date().toISOString(),
      qrCodeUrl: "/patient/csv-1/status",
      timeline: [],
    };

    const csv = getDailyPatientFlowCsv([patient], demoSettings);
    expect(csv).toContain("'=");
    expect(csv).toContain("'+SUM");
    expect(csv).not.toContain(";=HYPERLINK");
    expect(csv).not.toContain(";+SUM");
  });
});
