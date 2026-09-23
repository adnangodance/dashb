import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, CheckCircle2, CircleHelp, Info, RefreshCw } from "lucide-react";
import { getDoseSpotStatus, type DoseSpotSyncData } from "./dosespot-status";

export function DoseSpotStatusIndicator({ data, name, kind, href }: { data: DoseSpotSyncData; name: string; kind: "patient" | "prescriber"; href?: string }) {
  const status = getDoseSpotStatus(data);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const colors = {
    green: "text-[#34744b]",
    amber: "text-[#956015]",
    red: "text-[#b44836]",
    gray: "text-[#68717d]",
  };
  const Icon = status.notEligible ? Info : data.epcsStatus === "synced" ? CheckCircle2 : data.epcsStatus === "needs_sync" ? RefreshCw : data.epcsStatus ? Info : CircleHelp;

  function show() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function leave() {
    closeTimer.current = setTimeout(() => {
      if (document.activeElement !== trigger.current) setOpen(false);
    }, 120);
  }

  useLayoutEffect(() => {
    if (!open || !trigger.current || !tooltip.current) return;
    const rect = trigger.current.getBoundingClientRect();
    const tip = tooltip.current.getBoundingClientRect();
    setPosition({
      left: Math.max(12, Math.min(rect.left, window.innerWidth - tip.width - 12)),
      top: rect.bottom + tip.height + 20 > window.innerHeight ? Math.max(12, rect.top - tip.height - 8) : rect.bottom + 8,
    });
  }, [open, data]);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !tooltip.current?.contains(target)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    const close = () => setOpen(false);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <>
      <span className={`inline-flex max-w-full items-center rounded-[6px] ${colors[status.tone]}`}>
        <button
          ref={trigger}
          type="button"
          aria-label={`${name}: DoseSpot / EPCS — ${status.label}. Show sync details.`}
          aria-describedby={open ? id : undefined}
          onMouseEnter={show}
          onMouseLeave={leave}
          onFocus={show}
          onBlur={() => setOpen(false)}
          onClick={event => { event.stopPropagation(); show(); }}
          className="inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-[6px] px-0 py-1 text-[10px] font-medium transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
        >
          <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
          {status.label}
        </button>
        {(status.notEligible || data.epcsStatus === "needs_sync" || data.epcsStatus === "not_registered") && (
          <a
            href={href ?? (kind === "prescriber" ? "#/settings/prescribers" : "#/patients")}
            aria-label={kind === "prescriber" ? `Open prescriber settings for ${name}` : `Open patient details for ${name}`}
            title={kind === "prescriber" ? "Open prescriber settings" : "Open patient details"}
            onClick={event => { event.stopPropagation(); setOpen(false); }}
            className="inline-flex min-h-7 shrink-0 items-center justify-center rounded-r-[6px] px-1.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          >
            <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
          </a>
        )}
      </span>
      {open && createPortal(
        <div
          ref={tooltip}
          id={id}
          role="tooltip"
          onMouseEnter={() => clearTimeout(closeTimer.current)}
          onMouseLeave={leave}
          onClick={event => event.stopPropagation()}
          style={position}
          className="fixed z-[1100] w-[300px] max-w-[calc(100vw-24px)] rounded-[12px] border border-[#e7e5e1] bg-white p-4 text-left font-['Inter',sans-serif] shadow-[0_12px_36px_rgba(0,0,0,0.14)]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b8b86]">DoseSpot / EPCS</p>
          <p className="mt-1.5 text-[13px] font-semibold text-[#222]">{name}</p>
          <div className="mt-3 flex items-center justify-between gap-3 text-[11px]"><span className="text-[#777]">Sync status</span><span className="font-medium text-[#333]">{status.syncLabel}</span></div>
          {data.epcsEligible !== undefined && <div className="mt-1.5 flex items-center justify-between gap-3 text-[11px]"><span className="text-[#777]">Registration eligibility</span><span className={`font-medium ${status.notEligible ? "text-[#b44836]" : "text-[#34744b]"}`}>{status.notEligible ? "Not eligible" : "Eligible"}</span></div>}
          <p className="mt-3 border-t border-[#eeece8] pt-3 text-[11px] leading-[17px] text-[#666]">
            {status.notEligible ? data.epcsIneligibilityReason || `This ${kind} is not eligible for DoseSpot registration.`
              : data.epcsStatus === "synced" ? `This ${kind} is synced to DoseSpot / EPCS.`
              : data.epcsStatus === "needs_sync" ? `This ${kind} needs to be synced with DoseSpot / EPCS.`
              : data.epcsStatus === "not_registered" ? `This ${kind} has not been registered in DoseSpot / EPCS.`
              : `Sync status is currently unavailable for this ${kind}.`}
          </p>
          {status.missingFields.length > 0 && (
            <div className="mt-3 rounded-[8px] bg-[#fff7f4] px-3 py-2.5">
              <p className="text-[10px] font-semibold text-[#a45643]">Missing fields</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-3.5 text-[11px] leading-4 text-[#81594f]">{status.missingFields.map(field => <li key={field}>{field}</li>)}</ul>
            </div>
          )}
        </div>, document.body,
      )}
    </>
  );
}
