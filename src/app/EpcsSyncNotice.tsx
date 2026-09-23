import { useEffect, useRef, useState, type FormEvent, type HTMLInputTypeAttribute } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Info, Loader2, RefreshCw, X } from "lucide-react";

const profileFields = [
  { key: "firstName", label: "First name", section: "Personal information" },
  { key: "lastName", label: "Last name", section: "Personal information" },
  { key: "credentials", label: "Credentials", section: "Personal information", placeholder: "e.g. NP, MD, DO" },
  { key: "dob", label: "Date of birth", section: "Personal information", type: "date" },
  { key: "npi", label: "NPI number", section: "Prescriber credentials", pattern: "[0-9]{10}", hint: "Enter a 10-digit NPI number." },
  { key: "dea", label: "DEA number", section: "Prescriber credentials", pattern: "[A-Za-z]{2}[0-9]{7}", hint: "Enter two letters followed by seven digits." },
  { key: "license", label: "State license number", section: "Prescriber credentials" },
  { key: "licenseState", label: "License state", section: "Prescriber credentials", pattern: "[A-Za-z]{2}", hint: "Enter a two-letter state code, e.g. NY." },
  { key: "email", label: "Email address", section: "Contact & address", type: "email" },
  { key: "phone", label: "Phone number", section: "Contact & address", type: "tel" },
  { key: "cell", label: "Mobile number", section: "Contact & address", type: "tel" },
  { key: "fax", label: "Fax number", section: "Contact & address", type: "tel", optional: true },
  { key: "address1", label: "Address line 1", section: "Contact & address" },
  { key: "address2", label: "Address line 2", section: "Contact & address", optional: true },
  { key: "city", label: "City", section: "Contact & address" },
  { key: "state", label: "State", section: "Contact & address", pattern: "[A-Za-z]{2}", hint: "Enter a two-letter state code, e.g. NY." },
  { key: "zip", label: "ZIP code", section: "Contact & address", pattern: "[0-9]{5}(-[0-9]{4})?", hint: "Enter a five-digit ZIP or ZIP+4 code." },
] as const;

type ProfileKey = typeof profileFields[number]["key"];
export type EpcsProfile = Record<ProfileKey, string>;
export type EpcsAccount = {
  id: string;
  role: "prescriber" | "manager" | "staff";
  doseSpotSyncRequired: boolean;
  profile: EpcsProfile;
};

// The app currently uses demo accounts. Replace this fixture with the signed-in
// prescriber's profile and DoseSpot status when an account service is connected.
export const DEMO_EPCS_ACCOUNT: EpcsAccount = {
  id: "demo-zee",
  role: "prescriber",
  doseSpotSyncRequired: true,
  profile: {
    firstName: "Zee", lastName: "Rabushaj", credentials: "NP", dob: "",
    npi: "1234523452", dea: "", license: "", licenseState: "NY",
    email: "demo2@scriptlinkrx.com", phone: "(646)-617-9881", cell: "", fax: "",
    address1: "2823 Middletown Road", address2: "", city: "Bronx", state: "NY", zip: "10461",
  },
};

type Props = {
  account: EpcsAccount;
  onSave: (profile: EpcsProfile) => void;
  onSynced: () => void;
  // Resolve only after DoseSpot confirms the sync; reject on validation/failure.
  syncProfile?: (profile: EpcsProfile) => Promise<void>;
};

function profileIssues(profile: EpcsProfile) {
  const issues: Partial<Record<ProfileKey, string>> = {};
  // These are client-side completeness/format checks, not credential verification.
  for (const field of profileFields) {
    const value = profile[field.key].trim();
    if (!value) {
      if (!("optional" in field && field.optional)) issues[field.key] = `${field.label} is required.`;
      continue;
    }
    if ("pattern" in field && !new RegExp(`^(?:${field.pattern})$`).test(value)) issues[field.key] = field.hint;
    if ("type" in field && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) issues[field.key] = "Enter a valid email address.";
    if ("type" in field && field.type === "tel" && !/^(?:1)?\d{10}$/.test(value.replace(/[\s()+.-]/g, ""))) issues[field.key] = "Enter a 10-digit phone number.";
    if (field.key === "dob") {
      const date = new Date(`${value}T00:00:00`);
      if (Number.isNaN(date.getTime()) || date >= new Date() || date.getFullYear() < 1900) issues.dob = "Enter a valid date of birth in the past.";
    }
  }
  return issues;
}

export function EpcsSyncNotice(props: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const incomplete = Object.keys(profileIssues(props.account.profile)).length > 0;
  if (props.account.role !== "prescriber" || (!props.account.doseSpotSyncRequired && !incomplete)) return null;

  return (
    <>
      <div className="mt-3 w-full shrink-0 rounded-[18px] border border-white/70 bg-[radial-gradient(circle_at_90%_0%,rgba(255,214,178,0.95),transparent_48%),linear-gradient(145deg,#fffdf3_0%,#fbf0e5_100%)] p-3 shadow-[0_10px_28px_rgba(102,64,30,0.08)]">
        <h3 className="text-[15px] font-semibold leading-[19px] tracking-[-0.01em] text-[#211a15]">EPCS sync required</h3>
        <p className="mt-1.5 text-[11px] leading-4 text-[#7a7068]">{incomplete ? "Complete and verify your profile before syncing to DoseSpot." : "Review your profile and sync your account to DoseSpot."}</p>
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Review your profile and sync to DoseSpot"
          className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-3 py-2.5 text-[11px] font-semibold text-[#211a15] shadow-[0_3px_12px_rgba(102,64,30,0.06)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd6b2e]"
        >
          Review profile
          <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {open && <EpcsProfileDrawer {...props} onClose={() => { setOpen(false); trigger.current?.focus(); }} />}
    </>
  );
}

function EpcsProfileDrawer({ account, onSave, onSynced, syncProfile, onClose }: Props & { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [profile, setProfile] = useState(account.profile);
  const [confirmed, setConfirmed] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ error: boolean; text: string } | null>(null);
  const issues = profileIssues(profile);
  const issueCount = Object.keys(issues).length;

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    heading.current?.focus();
    return () => element?.close();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    setAttempted(true);
    setNotice(null);
    if (issueCount) {
      form.current?.querySelector<HTMLInputElement>(`[name="${Object.keys(issues)[0]}"]`)?.focus();
      return;
    }
    if (!confirmed) {
      form.current?.querySelector<HTMLInputElement>("[name=confirm]")?.focus();
      return;
    }
    const cleanProfile = Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, value.trim()])) as EpcsProfile;
    onSave(cleanProfile);
    if (!syncProfile) {
      setNotice({ error: false, text: "Your profile is saved for this session. DoseSpot sync is not connected in this demo, so your account still needs to be synced." });
      return;
    }
    submitting.current = true;
    setBusy(true);
    try {
      await syncProfile(cleanProfile);
      onClose();
      onSynced();
    } catch {
      setNotice({ error: true, text: "We couldn’t sync your profile to DoseSpot. Your changes are saved. Review your details and try again." });
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="epcs-profile-title"
      aria-describedby="epcs-profile-description"
      onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}
      onClick={event => { if (event.target === event.currentTarget && !busy) onClose(); }}
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[680px] overflow-hidden rounded-l-[16px] border-0 bg-white p-0 font-['Inter',sans-serif] text-[#171717] shadow-[-18px_0_55px_rgba(0,0,0,0.16)] outline-none backdrop:bg-black/30 backdrop:backdrop-blur-[2px]"
    >
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-l-[16px] border-l border-[#e4e1dd] bg-white">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#ece9e5] px-6 py-5">
          <div className="min-w-0 flex-1">
            <h2 ref={heading} tabIndex={-1} id="epcs-profile-title" className="text-[20px] font-semibold outline-none">Sync your EPCS account</h2>
            <p id="epcs-profile-description" className="mt-1 text-[11px] leading-5 text-[#777]">Review your personal, prescriber, and contact information before syncing to DoseSpot.</p>
          </div>
          <button type="button" disabled={busy} onClick={onClose} aria-label="Close EPCS profile" className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#777] hover:bg-[#f4f2ef] disabled:opacity-40"><X size={18} /></button>
        </header>
        <form ref={form} noValidate onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
            <div className={`mb-6 flex items-start gap-2.5 rounded-[10px] px-3.5 py-3 ${issueCount ? "bg-[#fff8eb] text-[#8d5c1d]" : "bg-[#f0f6f2] text-[#376b47]"}`}>
              {issueCount ? <Info size={16} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
              <div>
                <p className="text-[12px] font-semibold">{issueCount ? `${issueCount} ${issueCount === 1 ? "detail needs" : "details need"} your attention` : "Your profile is ready for review"}</p>
                <p className="mt-1 text-[11px] leading-[17px]">{issueCount ? "Update the highlighted fields, then review the rest of your information." : "Confirm your information below, then sync your account."}</p>
              </div>
            </div>
            <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">
              {["Personal information", "Prescriber credentials", "Contact & address"].map((section, index) => (
                <section key={section} aria-labelledby={`epcs-section-${index}`} className={index > 0 ? "border-t border-[#ece9e5] pt-5" : ""}>
                  <h3 id={`epcs-section-${index}`} className="mb-3 text-[12px] font-semibold text-[#242424]">{section}</h3>
                  <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                    {profileFields.filter(field => field.section === section).map(field => {
                      const optional = "optional" in field && field.optional;
                      const issue = issues[field.key];
                      const showError = !!issue && (attempted || !profile[field.key].trim());
                      return (
                        <label key={field.key} className="block text-[11px] font-medium text-[#242424]">
                          <span>{field.label}{optional ? <span className="ml-1.5 text-[10px] font-normal text-[#999]">Optional</span> : <span className="ml-1 text-[#b44b42]" aria-hidden="true">*</span>}</span>
                          <input
                            name={field.key}
                            type={("type" in field ? field.type : "text") as HTMLInputTypeAttribute}
                            value={profile[field.key]}
                            required={!optional}
                            placeholder={"placeholder" in field ? field.placeholder : `Enter ${field.label.toLowerCase()}`}
                            aria-invalid={showError}
                            aria-describedby={showError ? `epcs-${field.key}-error` : undefined}
                            onChange={event => { setProfile(current => ({ ...current, [field.key]: event.target.value })); setConfirmed(false); setNotice(null); }}
                            className={`mt-1.5 h-10 w-full rounded-[10px] border px-3 text-[12px] font-normal text-[#242424] outline-none transition-colors placeholder:text-[#b8b8b5] focus:border-[#202020] ${showError ? "border-[#ebc581] bg-[#fffcf5]" : "border-[#dddcd8] bg-white"}`}
                          />
                          {showError && <span id={`epcs-${field.key}-error`} className="mt-1 block text-[10px] font-normal leading-[15px] text-[#a06413]">{issue}</span>}
                        </label>
                      );
                    })}
                  </div>
                </section>
              ))}
              <label className="flex cursor-pointer items-start gap-2.5 border-t border-[#eeece8] pt-4 text-[11px] leading-[18px] text-[#626262]">
                <input name="confirm" type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} aria-invalid={attempted && !confirmed} className="mt-0.5 size-4 shrink-0 accent-[#171717]" />
                <span>I have reviewed my profile and confirm that my personal, contact, and prescriber information is accurate and up to date.{attempted && !confirmed && <span className="mt-1 block text-[#a06413]">Please confirm your details before syncing.</span>}</span>
              </label>
            </fieldset>
          </div>
          <footer className="shrink-0 border-t border-[#ece9e5] bg-white px-6 py-4">
            {notice && <p role={notice.error ? "alert" : "status"} className={`mb-3 rounded-[9px] px-3 py-2.5 text-[11px] leading-[17px] ${notice.error ? "bg-[#fff0ee] text-[#b44836]" : "bg-[#eff4fa] text-[#526580]"}`}>{notice.text}</p>}
            <div className="flex flex-col gap-1">
              <button type="submit" disabled={busy} className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[12px] font-semibold text-white transition-colors hover:bg-[#222] disabled:cursor-wait disabled:opacity-60">
                {busy ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}{busy ? "Syncing to DoseSpot…" : "Save & sync to DoseSpot"}{!busy && <ArrowRight size={14} />}
              </button>
              <button type="button" disabled={busy} onClick={onClose} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4b5563] hover:bg-[#f3f4f6] hover:text-[#171717] disabled:opacity-50">Cancel</button>
            </div>
          </footer>
        </form>
      </div>
    </dialog>, document.body,
  );
}
