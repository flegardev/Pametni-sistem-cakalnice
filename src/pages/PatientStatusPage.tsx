import { ArrowLeft, Clock3, Info, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StatusBadge } from "../components/Badge";
import { StatusTimeline } from "../components/StatusTimeline";
import { LEGAL_NOTE } from "../data/constants";
import { useClock } from "../hooks/useClock";
import { useApp } from "../state/AppContext";
import { formatTime } from "../utils/format";
import {
  createPublicPatientStatusPath,
  parsePublicPatientSnapshot,
} from "../utils/publicStatus";
import {
  getDepartmentName,
  getPatientStatusMessage,
  getQueuePosition,
  getRoomName,
} from "../utils/queue";

export const PatientStatusPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { patients, settings } = useApp();
  const now = useClock();
  const patient = patients.find((item) => item.id === id);
  const snapshot = patient ? null : parsePublicPatientSnapshot(location.search);

  if (!patient && !snapshot) {
    return (
      <main className="status-page">
        <section className="status-card">
          <Info size={34} aria-hidden="true" />
          <h1>Pacient ni najden</h1>
          <p>Preverite povezavo na informativnem listku ali se obrnite na osebje.</p>
          <Link className="button button-secondary" to="/login">
            <ArrowLeft size={18} aria-hidden="true" />
            Nazaj
          </Link>
        </section>
      </main>
    );
  }

  const number = patient?.number ?? snapshot!.number;
  const status = patient?.status ?? snapshot!.status;
  const department = patient?.department ?? snapshot!.department;
  const assignedRoom = patient?.assignedRoom ?? snapshot!.room;
  const arrivalTime = patient?.arrivalTime ?? snapshot!.arrivalTime;
  const position = patient ? getQueuePosition(patients, patient) : null;
  const statusPath = patient ? createPublicPatientStatusPath(patient) : `${location.pathname}${location.search}`;
  const url = `${window.location.origin}${statusPath}`;
  const statusMessage = patient
    ? getPatientStatusMessage(settings, patients, patient)
    : `Posnetek ob izdaji listka: ${status}.`;

  return (
    <main className="status-page">
      <section className="status-card">
        <div className="status-top">
          <div className="brand">
            <div className="brand-mark">{settings.logoText}</div>
            <div>
              <strong>{settings.institutionName}</strong>
              <span>Status pacienta</span>
            </div>
          </div>
          <div className="time-pill">
            <Clock3 size={18} aria-hidden="true" />
            {formatTime(now)}
          </div>
        </div>
        <div className="status-summary">
          <div>
            <span>Vaša številka</span>
            <div className="patient-number">{number}</div>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="status-message" aria-live="polite">
          <span>Ocena stanja</span>
          <strong>{statusMessage}</strong>
        </div>
        <div className="status-grid">
          <div>
            <span>Usmeritev</span>
            <strong>{getDepartmentName(settings, department)}</strong>
          </div>
          <div>
            <span>Položaj v vrsti</span>
            <strong>
              {position
                ? `${position}. v vrsti`
                : status === "Poklican" || status === "V obravnavi"
                  ? "Poklican"
                  : patient
                    ? "Ni v vrsti"
                    : "Ni podatka v živo"}
            </strong>
          </div>
          <div>
            <span>Soba</span>
            <strong>{getRoomName(settings, assignedRoom) || "Bo določena"}</strong>
          </div>
          <div>
            <span>Prihod</span>
            <strong>{formatTime(arrivalTime)}</strong>
          </div>
        </div>
        <section className="timeline-panel" aria-label="Časovnica statusov">
          <div>
            <span>Časovnica</span>
            <strong>Vaš potek obravnave</strong>
          </div>
          {patient ? (
            <StatusTimeline patient={patient} />
          ) : (
            <p className="snapshot-notice">
              To je zasebnostno omejen posnetek iz QR kode, ne stanje v živo. Povezava ne vsebuje začetnic, leta rojstva, razloga obiska ali opomb.
            </p>
          )}
        </section>
        <div className="qr-panel">
          <QRCodeCanvas value={url} size={132} includeMargin />
          <div>
            <QrCode size={22} aria-hidden="true" />
            <strong>QR status povezava</strong>
            <p>
              {patient
                ? "V tem brskalniku se status osvežuje iz lokalnega demo stanja."
                : "Na drugi napravi je prikazan le posnetek ob izdaji listka."}
              {" "}Za uradne informacije se obrnite na osebje.
            </p>
          </div>
        </div>
        <p className="legal-note standalone">{LEGAL_NOTE}</p>
      </section>
    </main>
  );
};
