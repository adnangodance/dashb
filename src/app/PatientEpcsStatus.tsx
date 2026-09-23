import { ArrowUpRight, Info, TriangleAlert } from "lucide-react";
import { getDoseSpotStatus, type DoseSpotSyncData } from "./dosespot-status";

export type { EpcsStatus } from "./dosespot-status";

export function PatientEpcsStatus({ data, href = "#/patients", className = "" }: { data: DoseSpotSyncData; href?: string; className?: string }) {
  const status = getDoseSpotStatus(data);
  if (!status.notEligible && data.epcsStatus !== "not_registered" && data.epcsStatus !== "needs_sync") return null;

  const label = status.notEligible ? "Not eligible for DoseSpot" : data.epcsStatus === "not_registered" ? "Not registered in EPCS" : "EPCS sync needed";
  const destinationLabel = href === "#/patients" ? "Open Patients" : "Open patient details";

  return (
    <a
      href={href}
      onClick={event => event.stopPropagation()}
      title={`${destinationLabel} to review DoseSpot / EPCS status`}
      aria-label={`${label}. ${destinationLabel}.`}
      className={`relative z-10 inline-flex max-w-full items-center gap-2 rounded-[5px] px-1.5 py-1 text-left text-[10px] font-medium leading-3.5 transition-[filter] hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${status.notEligible ? "bg-[linear-gradient(110deg,#fff6f1_0%,#ffe6df_100%)] text-[#b44836]" : "bg-[linear-gradient(110deg,#fffaf0_0%,#ffead0_100%)] text-[#956015]"} ${className}`}
    >
      <Info size={12} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
      <span className="min-w-0">{label}</span>
      <ArrowUpRight size={13} strokeWidth={1.8} className="ml-auto shrink-0" aria-hidden="true" />
    </a>
  );
}

export function PatientEpcsNotice({ patients, className = "" }: { patients: DoseSpotSyncData[]; className?: string }) {
  if (!patients.some(patient => patient.epcsEligible === false || patient.epcsStatus === "not_registered" || patient.epcsStatus === "needs_sync")) return null;

  return (
    <p role="status" className={`flex items-center gap-2.5 rounded-[14px] bg-[#fffbea] px-2.5 py-2 text-[#34302a] ${className}`}>
      <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-[#fffdf4] p-[3px]">
        <span className="flex size-full items-center justify-center rounded-[8px] bg-[#ffedb7]">
          <TriangleAlert size={18} strokeWidth={1.8} fill="#332715" className="[&>path:first-child]:stroke-none [&>path:not(:first-child)]:stroke-[#ffedb7]" />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium leading-4">You can still place an order.</span>
        <span className="mt-0.5 block text-[10px] leading-[15px] text-[#5f5948]">Patients marked with an EPCS notice won’t be processed through EPCS.</span>
      </span>
    </p>
  );
}
