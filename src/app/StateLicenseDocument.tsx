import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { loadStateLicense, saveStateLicense, skipStateLicense, stateLicenseDaysRemaining, validateStateLicenseFile, type StateLicenseRecord } from "./state-license";

export function useStateLicenseDocument(accountId: string) {
  const [record, setRecord] = useState<StateLicenseRecord | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [revision, setRevision] = useState(0);
  const [now, setNow] = useState(Date.now);
  const busy = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setRecord(null);
    setError("");
    loadStateLicense(accountId).then(value => { if (!cancelled) setRecord(value); }).catch(() => {
      if (!cancelled) setError("We couldn’t load your document details. Please try again.");
    });
    return () => { cancelled = true; };
  }, [accountId, revision]);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 60_000);
    window.addEventListener("focus", update);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);

  async function persist(next: StateLicenseRecord) {
    if (busy.current) return false;
    busy.current = true;
    setSaving(true);
    setError("");
    try {
      await saveStateLicense(accountId, next);
      setRecord(next);
      return true;
    } catch {
      setError("Your changes couldn’t be saved. Please try again.");
      return false;
    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  return {
    record, error, saving, now,
    retry: () => setRevision(value => value + 1),
    skip: () => record ? persist(skipStateLicense(record)) : Promise.resolve(false),
    upload: (file: File) => {
      const issue = validateStateLicenseFile(file);
      if (issue) { setError(issue); return Promise.resolve(false); }
      return record ? persist({ ...record, document: { file, savedAt: Date.now() } }) : Promise.resolve(false);
    },
  };
}

export type StateLicenseController = ReturnType<typeof useStateLicenseDocument>;

export function StateLicenseNotice({ license, onUpload }: { license: StateLicenseController; onUpload: () => void }) {
  const days = license.record ? stateLicenseDaysRemaining(license.record, license.now) : 30;
  const description = !license.record
    ? "Add your state license document to complete your account."
    : license.now >= license.record.dueAt
      ? "Your state license document is overdue. Upload it to complete your account."
      : `Upload your state license document within ${days} ${days === 1 ? "day" : "days"}.`;
  return (
    <div className="flex h-full w-full flex-col rounded-[18px] border border-white/70 bg-[radial-gradient(circle_at_90%_0%,rgba(255,214,178,0.95),transparent_48%),linear-gradient(145deg,#fffdf3_0%,#fbf0e5_100%)] p-3 shadow-[0_10px_28px_rgba(102,64,30,0.08)]">
      <h3 className="text-[15px] font-semibold leading-[19px] tracking-[-0.01em] text-[#211a15]">Account incomplete</h3>
      <p className="mb-3 mt-1.5 text-[11px] leading-4 text-[#7a7068]">{description}</p>
      <button type="button" onClick={onUpload} aria-haspopup="dialog" className="group mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-3 py-2.5 text-[11px] font-semibold text-[#211a15] shadow-[0_3px_12px_rgba(102,64,30,0.06)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd6b2e]">
        Upload document <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

export function StateLicenseUpload({ license, onContinue, onSkip, onBack }: {
  license: StateLicenseController;
  onContinue: () => void;
  onSkip?: () => void;
  onBack: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputId = useId();
  const record = license.record;
  const dueDate = record ? new Date(record.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  const overdue = record ? license.now >= record.dueAt : false;
  const saved = record?.document;
  function chooseFile(selected?: File) {
    if (!selected) return;
    const issue = validateStateLicenseFile(selected);
    setFileError(issue ?? "");
    setFile(issue ? null : selected);
  }

  return (
    <div className="space-y-4">
      {!saved && record && <div className="rounded-[12px] bg-[linear-gradient(135deg,#fffaf0_0%,#fff0df_100%)] p-3.5">
        <p className="text-[12px] font-semibold text-[#714b26]">{overdue ? "Your document is overdue" : "You have 30 days to upload"}</p>
        <p className="mt-1 text-[11px] leading-5 text-[#806b57]">{overdue ? `Your state license document was due ${dueDate}. Upload it to complete your account.` : `${onSkip ? "You can skip this step for now. " : ""}Upload your state license document by ${dueDate} to complete your account.`}</p>
      </div>}
      {saved ? <div className="rounded-[12px] bg-[#f1f8f3] p-4">
        <div className="flex items-start gap-3"><CheckCircle2 size={20} className="shrink-0 text-[#398356]" /><div className="min-w-0"><p className="text-[12px] font-semibold text-[#245737]">Document saved</p><p className="mt-1 break-all text-[11px] leading-5 text-[#617267]">{saved.file.name}</p></div></div>
      </div> : record ? <>
        <label htmlFor={inputId} onDragOver={event => { event.preventDefault(); if (!license.saving) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); if (!license.saving) chooseFile(event.dataTransfer.files[0]); }} className={`relative flex cursor-pointer flex-col items-center rounded-[12px] border border-dashed px-4 py-7 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#2563eb] ${dragging ? "border-[#3974d8] bg-[#eff6ff]" : "border-[#d7dcda] bg-white/80 hover:border-[#a2b9d7]"}`}>
          <input id={inputId} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" disabled={license.saving} onChange={event => { chooseFile(event.target.files?.[0]); event.target.value = ""; }} aria-describedby={`${inputId}-formats`} className="sr-only" />
          <span className="mb-3 flex size-10 items-center justify-center rounded-[10px] bg-[#eef4fd] text-[#3974d8]">{file ? <FileText size={20} /> : <Upload size={20} />}</span>
          <span className="max-w-full break-all text-[12px] font-semibold text-[#202823]">{file ? file.name : "Choose a file or drag it here"}</span>
          <span id={`${inputId}-formats`} className="mt-1.5 text-[10px] text-[#818985]">{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB · Choose another file` : "PDF, JPG, or PNG · Up to 10 MB"}</span>
        </label>
        <p className="text-[11px] leading-5 text-[#747c78]">Make sure your name, license number, state, and expiration date are clearly visible.</p>
      </> : !license.error ? <p role="status" className="py-4 text-center text-[12px] text-[#747c78]">Loading document details…</p> : null}

      {(fileError || license.error) && <p role="alert" className="text-[11px] leading-5 text-[#b4473d]">{fileError || license.error}</p>}
      {!record && license.error && <button type="button" onClick={license.retry} className="text-[12px] font-semibold text-[#2563eb] underline">Try again</button>}
      <p className="text-[10px] leading-4 text-[#818985]">Demo: documents are saved in this browser only.</p>

      <div className="space-y-1.5 pt-1">
        <button type="button" disabled={license.saving || (!saved && !file) || !record} onClick={async () => { if (saved || (file && await license.upload(file))) onContinue(); }} className="flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#111] px-4 text-[11px] font-semibold text-white hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:bg-[#d5d8d6] disabled:text-[#8b918e]">
          {license.saving && <Loader2 size={14} className="animate-spin" />}{license.saving ? "Saving…" : saved ? onSkip ? "Continue" : "Done" : onSkip ? "Upload & continue" : "Upload document"}
        </button>
        {onSkip && !saved && <button type="button" disabled={license.saving || !record} onClick={async () => { if (await license.skip()) onSkip(); }} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#3974d8] hover:bg-[#eff6ff] disabled:opacity-50">Skip for now</button>}
        <button type="button" disabled={license.saving} onClick={onBack} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-[#f6f7f6] disabled:opacity-50">{onSkip ? "Back" : "Cancel"}</button>
      </div>
    </div>
  );
}

export function StateLicenseDrawer({ license, onClose }: { license: StateLicenseController; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    heading.current?.focus();
    return () => element?.close();
  }, []);
  return createPortal(
    <dialog ref={dialog} aria-labelledby="state-license-title" onCancel={event => { event.preventDefault(); if (!license.saving) onClose(); }} onClick={event => { if (event.target === event.currentTarget && !license.saving) onClose(); }} className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[560px] overflow-hidden rounded-l-[16px] border-0 bg-white p-0 font-['Inter',sans-serif] text-[#171717] shadow-[-18px_0_55px_rgba(0,0,0,0.16)] outline-none backdrop:bg-black/30 backdrop:backdrop-blur-[2px]">
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#ece9e5] px-6 py-5">
          <div><h2 id="state-license-title" ref={heading} tabIndex={-1} className="text-[20px] font-semibold outline-none">State license document</h2><p className="mt-1 text-[11px] leading-5 text-[#777]">Add a clear copy of your current state license.</p></div>
          <button type="button" onClick={onClose} disabled={license.saving} aria-label="Close document upload" className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#777] hover:bg-[#f4f2ef] disabled:opacity-50"><X size={18} /></button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6"><StateLicenseUpload license={license} onContinue={onClose} onBack={onClose} /></div>
      </div>
    </dialog>, document.body,
  );
}
