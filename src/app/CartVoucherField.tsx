import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Tag, X } from "lucide-react";

export function CartVoucherField({ patientName, appliedCode, discount, itemCount = 1, onApply, onRemove }: {
  patientName?: string;
  appliedCode: string | null;
  discount: number;
  itemCount?: number;
  onApply: (code: string) => void;
  onRemove: () => void;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState(appliedCode ?? "");
  const [editing, setEditing] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const [focusEdit, setFocusEdit] = useState(false);
  const target = patientName ? ` for ${patientName}` : "";

  useEffect(() => {
    setDraft(appliedCode ?? "");
    setEditing(false);
  }, [appliedCode]);

  useEffect(() => {
    if (focusInput) { inputRef.current?.focus(); setFocusInput(false); }
    if (focusEdit) { editRef.current?.focus(); setFocusEdit(false); }
  }, [focusInput, focusEdit]);

  function apply() {
    const code = draft.trim().toUpperCase();
    if (!code) return;
    onApply(code);
    setDraft(code);
    setEditing(false);
    setFocusEdit(true);
  }

  return (
    <div className={patientName ? "flex flex-wrap items-center justify-between gap-x-5 gap-y-3" : ""}>
      <div className="min-w-0">
        <p id={`${id}-label`} className="flex items-center gap-1.5 text-[12px] font-medium text-[#292929]">
          {patientName && <Tag size={14} strokeWidth={1.7} className="shrink-0 text-[#777]" />}
          {patientName ? `Voucher for ${patientName}` : "Do you have a Voucher Code?"}
        </p>
        {patientName && <p id={`${id}-hint`} className="mt-1 text-[11px] text-[#858585]">{itemCount > 1 ? `Applies to all ${itemCount} items for this patient.` : "Applies only to this patient’s items."}</p>}
      </div>
      <div className={patientName ? "w-full min-w-0 sm:w-[300px]" : "mt-3"}>
        {appliedCode && !editing ? (
          <div>
            <div className="flex items-center justify-between gap-3 rounded-[7px] bg-[#f0f8f2] px-3 py-2 text-[12px] text-[#287343]" role="status">
              <span className="flex min-w-0 items-center gap-1.5"><CheckCircle2 size={14} className="shrink-0" /><span className="break-all font-medium">{appliedCode}</span><span className="shrink-0 text-[11px]">Applied</span></span>
              <span className="shrink-0 font-medium tabular-nums">−${discount.toFixed(2)}</span>
            </div>
            <div className="mt-1.5 flex justify-end gap-4">
              <button ref={editRef} type="button" aria-label={`Edit voucher${target}`} onClick={() => { setDraft(appliedCode); setEditing(true); setFocusInput(true); }} className="text-[11px] font-medium text-[#666] hover:text-black hover:underline">Edit</button>
              <button type="button" aria-label={`Remove voucher${target}`} onClick={() => { onRemove(); setDraft(""); setEditing(false); setFocusInput(true); }} className="text-[11px] font-medium text-[#777] hover:text-black hover:underline">Remove</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <input ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); apply(); } }} aria-label={`Voucher code${target}`} aria-describedby={patientName ? `${id}-hint` : undefined} placeholder="Enter voucher code" maxLength={40} autoComplete="off" spellCheck={false} className="h-[34px] w-full min-w-0 rounded-[8px] border border-[#d9d9d9] bg-white px-3 text-[12px] uppercase text-[#202020] outline-none placeholder:normal-case placeholder:text-[#999] focus:border-[#555] focus:ring-1 focus:ring-[#555]" />
              <button type="button" onClick={apply} disabled={!draft.trim()} aria-label={`${editing ? "Save" : "Apply"} voucher${target}`} className="h-[34px] shrink-0 rounded-full bg-[#171717] px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#f1f1f1] disabled:text-[#aaa]">{editing ? "Save" : "Apply"}</button>
            </div>
            {editing && <div className="mt-1.5 text-right"><button type="button" aria-label={`Cancel voucher edit${target}`} onClick={() => { setDraft(appliedCode ?? ""); setEditing(false); setFocusEdit(true); }} className="text-[11px] font-medium text-[#777] hover:text-black hover:underline">Cancel</button></div>}
          </div>
        )}
      </div>
    </div>
  );
}

export function OrderTotalVouchers({ patients, onChange }: {
  patients: { key: string; name: string; code: string | null; discount: number }[];
  onChange: (key: string, code: string | null) => void;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set());
  const [announcement, setAnnouncement] = useState("");
  const selectedPatients = patients.filter(patient => selectedKeys.has(patient.key));
  const normalizedCode = draft.trim().toUpperCase();
  const appliedPatients = patients.filter(patient => patient.code);
  const changedPatients = selectedPatients.filter(patient => patient.code !== normalizedCode);
  const canApply = Boolean(normalizedCode && changedPatients.length > 0);

  function togglePatient(key: string) {
    setSelectedKeys(current => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function apply() {
    if (!canApply) return;
    changedPatients.forEach(patient => onChange(patient.key, normalizedCode));
    setAnnouncement(`${normalizedCode} applied to ${selectedPatients.map(patient => patient.name).join(", ")}.`);
    setDraft("");
    setSelectedKeys(new Set());
    inputRef.current?.focus();
  }

  if (patients.length === 0) return null;

  return (
    <section className="mt-5" aria-label="Order Total vouchers">
      <button type="button" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-controls={`${id}-fields`} className="flex w-full items-center justify-between gap-3 text-left text-[13px] font-semibold text-[#202020]">
        Do you have a Voucher Code?
        <ChevronDown size={17} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={`${id}-fields`} hidden={!open} className="mt-3 space-y-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={draft}
            onChange={event => { setDraft(event.target.value); if (!event.target.value.trim()) setSelectedKeys(new Set()); }}
            onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); apply(); } }}
            aria-label="Voucher code in Order Total"
            aria-describedby={normalizedCode ? `${id}-choose` : undefined}
            placeholder="Enter voucher code"
            maxLength={40}
            autoComplete="off"
            spellCheck={false}
            className="h-[34px] w-full min-w-0 rounded-[8px] border border-[#d9d9d9] bg-white px-3 text-[12px] uppercase text-[#202020] outline-none placeholder:normal-case placeholder:text-[#999] focus:border-[#555] focus:ring-1 focus:ring-[#555]"
          />
          <button type="button" onClick={apply} disabled={!canApply} aria-label="Apply voucher in Order Total" className="h-[34px] shrink-0 rounded-full bg-[#171717] px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#f1f1f1] disabled:text-[#aaa]">Apply</button>
        </div>
        {normalizedCode && (
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#777]">
              <p id={`${id}-choose`} className="font-medium">Apply to one or more patients</p>
              {selectedPatients.length > 0 && <span aria-live="polite">{selectedPatients.length} selected</span>}
            </div>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Choose patients for voucher">
              {patients.map(patient => (
                <button key={patient.key} type="button" onClick={() => togglePatient(patient.key)} aria-pressed={selectedKeys.has(patient.key)} className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-[11px] font-medium transition-colors ${selectedKeys.has(patient.key) ? "border-[#171717] bg-[#171717] text-white" : "border-[#e3e3e3] bg-white text-[#666] hover:border-[#aaa] hover:text-[#171717]"}`}>
                  {selectedKeys.has(patient.key) && <CheckCircle2 size={12} className="shrink-0" aria-hidden="true" />}
                  {patient.name}
                </button>
              ))}
            </div>
            {changedPatients.filter(patient => patient.code).map(patient => <p key={patient.key} className="mt-2 break-words text-[11px] leading-[16px] text-[#858585]">Replaces {patient.code} for {patient.name}.</p>)}
            {selectedPatients.length > 0 && changedPatients.length === 0 && <p className="mt-2 text-[11px] leading-[16px] text-[#858585]">This code is already applied to {selectedPatients.length === 1 ? selectedPatients[0].name : "these patients"}.</p>}
          </div>
        )}
        {appliedPatients.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Applied patient vouchers">
            {appliedPatients.map(patient => (
              <div key={patient.key} className="inline-flex max-w-full items-center rounded-full bg-[#f0f8f2] text-[#287343]">
                <button type="button" aria-label={`Edit voucher for ${patient.name} in Order Total`} onClick={() => { setDraft(patient.code ?? ""); setSelectedKeys(new Set([patient.key])); inputRef.current?.focus(); }} className="flex min-w-0 items-center gap-1.5 rounded-l-full py-1.5 pl-2.5 pr-1 text-left text-[10px] hover:underline">
                  <CheckCircle2 size={12} className="shrink-0" />
                  <span className="break-words">{patient.name} · <span className="break-all font-medium">{patient.code}</span></span>
                </button>
                <button type="button" aria-label={`Remove voucher for ${patient.name} in Order Total`} onClick={() => { onChange(patient.key, null); if (selectedKeys.has(patient.key)) { if (selectedPatients.length === 1) setDraft(""); setSelectedKeys(current => { const next = new Set(current); next.delete(patient.key); return next; }); } setAnnouncement(`Voucher removed from ${patient.name}.`); inputRef.current?.focus(); }} className="flex size-7 shrink-0 items-center justify-center rounded-full hover:bg-[#e0f0e5]"><X size={12} /></button>
              </div>
            ))}
          </div>
        )}
        <p className="sr-only" role="status">{announcement}</p>
      </div>
    </section>
  );
}
