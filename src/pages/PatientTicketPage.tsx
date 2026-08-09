import { ArrowLeft, Printer } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LEGAL_NOTE } from "../data/constants";
import { useApp } from "../state/AppContext";
import { formatTime } from "../utils/format";
import { createPublicPatientStatusPath } from "../utils/publicStatus";
import { getDepartmentName, getRoomName } from "../utils/queue";

export const PatientTicketPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { patients, settings } = useApp();
  const patient = patients.find((item) => item.id === id);

  useEffect(() => {
    if (!patient || new URLSearchParams(location.search).get("print") !== "1") {
      return;
    }

    const frame = window.requestAnimationFrame(() => window.print());
    return () => window.cancelAnimationFrame(frame);
  }, [location.search, patient]);

  if (!patient) {
    return (
      <main className="ticket-page">
        <section className="print-ticket">
          <h1>Listek ni najden</h1>
          <p>Podatki listka so na voljo samo v brskalniku, kjer je bil pacient dodan.</p>
          <Link className="button button-secondary no-print" to="/patients">
            <ArrowLeft size={18} aria-hidden="true" />
            Nazaj na paciente
          </Link>
        </section>
      </main>
    );
  }

  const statusPath = createPublicPatientStatusPath(patient);
  const statusUrl = `${window.location.origin}${statusPath}`;
  const roomName = getRoomName(settings, patient.assignedRoom) || "Bo določena";

  return (
    <main className="ticket-page">
      <section className="print-ticket" aria-labelledby="ticket-title">
        <header>
          <div>
            <h1 id="ticket-title">{settings.institutionName}</h1>
            <p>Informativni listek za čakalnico</p>
          </div>
          <strong className="ticket-number">{patient.number}</strong>
        </header>
        <dl>
          <div><dt>Usmeritev</dt><dd>{getDepartmentName(settings, patient.department)}</dd></div>
          <div><dt>Status</dt><dd>{patient.status}</dd></div>
          <div><dt>Soba</dt><dd>{roomName}</dd></div>
          <div><dt>Prihod</dt><dd>{formatTime(patient.arrivalTime)}</dd></div>
        </dl>
        <div className="ticket-qr">
          <QRCodeCanvas value={statusUrl} size={144} includeMargin />
          <div>
            <strong>QR status povezava</strong>
            <p>Na drugi napravi odpre zasebnostno omejen posnetek stanja ob izdaji listka. Za stanje v živo je potreben strežniški sistem.</p>
          </div>
        </div>
        <p className="ticket-url">{statusUrl}</p>
        <p className="legal-note standalone">{LEGAL_NOTE}</p>
        <div className="ticket-actions no-print">
          <Link className="button button-secondary" to="/patients">
            <ArrowLeft size={18} aria-hidden="true" />
            Nazaj
          </Link>
          <button className="button button-primary" type="button" onClick={() => window.print()}>
            <Printer size={18} aria-hidden="true" />
            Natisni
          </button>
        </div>
      </section>
    </main>
  );
};
