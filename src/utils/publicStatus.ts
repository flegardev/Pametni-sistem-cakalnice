import { PATIENT_STATUSES } from "../data/constants";
import type { Patient, PatientStatus } from "../types";

export interface PublicPatientSnapshot {
  number: string;
  status: PatientStatus;
  department: string;
  room?: string;
  arrivalTime: string;
}

const safeIdentifier = /^[a-zA-Z0-9čšžČŠŽ_-]{1,64}$/;
const safeNumber = /^[a-zA-Z0-9čšžČŠŽ._-]{1,24}$/;

export const createPublicPatientStatusPath = (patient: Patient) => {
  const params = new URLSearchParams({
    number: patient.number,
    status: patient.status,
    department: patient.department,
    arrival: patient.arrivalTime,
  });

  if (patient.assignedRoom) {
    params.set("room", patient.assignedRoom);
  }

  return `/patient/${encodeURIComponent(patient.id)}/status?${params.toString()}`;
};

export const parsePublicPatientSnapshot = (
  search: string,
): PublicPatientSnapshot | null => {
  const params = new URLSearchParams(search);
  const number = params.get("number") ?? "";
  const status = params.get("status") ?? "";
  const department = params.get("department") ?? "";
  const room = params.get("room") || undefined;
  const arrivalTime = params.get("arrival") ?? "";

  if (
    !safeNumber.test(number) ||
    !PATIENT_STATUSES.includes(status as PatientStatus) ||
    !safeIdentifier.test(department) ||
    (room !== undefined && !safeIdentifier.test(room)) ||
    !Number.isFinite(Date.parse(arrivalTime))
  ) {
    return null;
  }

  return {
    number,
    status: status as PatientStatus,
    department,
    room,
    arrivalTime,
  };
};
