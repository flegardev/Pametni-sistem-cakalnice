import type { Patient } from "../types";
import { openAppWindow } from "../utils/window";

export const printPatientTicket = (patient: Patient) => {
  openAppWindow(`/patient/${encodeURIComponent(patient.id)}/ticket?print=1`);
};
