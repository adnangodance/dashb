import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";

type Props = { pharmacy: string; onClose: () => void; onComplete: () => void };
const steps = ["Prescriber", "Practice", "Additional details", "Review & sign"];

export function EnrollmentModal({ pharmacy, onClose, onComplete }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ discipline: "No", collaborating: "No" });
  const [completed, setCompleted] = useState(false);
  const update = (name: string, value: string) => setValues(previous => ({ ...previous, [name]: value }));

  useEffect(() => {
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);
  useEffect(() => { heading.current?.focus(); }, [step, completed]);

  const inputClass = "mt-1.5 h-11 w-full rounded-[8px] border border-[#d1d5db] bg-white px-3 text-[12px] text-[#171717] outline-none placeholder:text-[#9ca3af] focus:border-[#2563eb]";
  const field = (name: string, label: string, required = false, type = "text", wide = false) => (
    <label key={name} className={`block text-[12px] font-medium text-[#171717] ${wide ? "sm:col-span-2" : ""}`}>
      {label}{required && <span className="ml-1 text-[#b4473d]">*</span>}
      <input name={name} placeholder={type === "date" ? undefined : `Enter ${label.toLowerCase()}`} type={type} min={type === "number" ? 0 : undefined} required={required} value={values[name] ?? ""} onChange={event => update(name, event.target.value)} className={inputClass} {...(name === "npi" || name === "collaboratorNpi" ? { inputMode: "numeric" as const, pattern: "[0-9]{10}", title: "Enter a 10-digit NPI number" } : {})} />
    </label>
  );
  const choice = (name: string, label: string, options: string[]) => (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 text-[12px] font-medium leading-5 text-[#171717]">{label}</legend>
      <div className="flex flex-wrap gap-2">{options.map(option => (
        <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-[12px] ${values[name] === option ? "border-[#3974d8] bg-[#eff6ff] text-[#1d4ed8]" : "border-[#d1d5db] text-[#6b7280]"}`}>
          <input type="radio" name={name} value={option} checked={values[name] === option} onChange={() => update(name, option)} className="accent-[#3974d8]" />{option}
        </label>
      ))}</div>
    </fieldset>
  );
  function submit(event: FormEvent) {
    event.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setCompleted(true);
  }

  return createPortal(
    <dialog ref={dialog} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="enrollment-title" className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[680px] overflow-hidden rounded-l-[16px] border-0 bg-white p-0 text-[#171717] shadow-[-18px_0_55px_rgba(0,0,0,0.16)] outline-none backdrop:bg-black/30 backdrop:backdrop-blur-[2px]">
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-l-[16px] border-l border-[#e4e1dd] bg-white">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#ece9e5] px-6 py-5">
          <div className="min-w-0">
            <h2 id="enrollment-title" ref={heading} tabIndex={-1} className="text-[20px] font-semibold outline-none">{completed ? "Enrollment Complete" : ["Prescriber Information", "Practice Information", "Additional Details", "Review & Sign"][step]}</h2>
            <p className="mt-1 text-[11px] leading-5 text-[#777]">503B enrollment for {pharmacy}</p>
            {!completed && <p aria-live="polite" className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3974d8]">Step {step + 1} of {steps.length}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close enrollment form" className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#777] hover:bg-[#f4f2ef]"><X size={18} /></button>
        </header>
        {completed ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-12 text-center">
              <CheckCircle2 size={44} strokeWidth={1.4} className="mx-auto text-[#3974d8]" />
              <h3 className="mt-5 text-xl font-semibold outline-none">Enrollment form completed</h3>
              <p className="mx-auto mt-3 max-w-sm text-[13px] leading-6 text-[#6b7280]">Your form is complete for {pharmacy} in this demo. No application has been sent to the pharmacy.</p>
            </div>
            <footer className="shrink-0 border-t border-[#ece9e5] bg-white px-6 py-4">
              <button type="button" onClick={onComplete} className="h-11 w-full rounded-full bg-[#111] px-7 text-[12px] font-semibold text-white transition-colors hover:bg-[#222]">Continue to product</button>
            </footer>
          </>
        ) : (
          <>
            <form noValidate onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                  {step === 0 && <>
                    {field("firstName", "First name", true)}{field("lastName", "Last name", true)}{field("middleInitial", "Middle initial")}
                    <label className="text-[12px] font-medium text-[#171717]">Credentials *<select required value={values.credentials ?? ""} onChange={event => update("credentials", event.target.value)} className={inputClass}><option value="">Select credentials</option>{["MD", "DO", "DMD", "DDS", "PA", "NP", "DVM", "Other"].map(item => <option key={item}>{item}</option>)}</select></label>
                    {values.credentials === "Other" && field("otherCredentials", "Other credentials", true)}
                    {field("licenses", "State license(s)", true)}{field("npi", "NPI number", true)}{field("dea", "DEA number (if applicable)")}{field("stateCs", "State CS / TDDD number (if applicable)")}
                    {choice("discipline", "Has a state license or DEA registration been suspended, revoked, or disciplined within the last 5 years?", ["No", "Yes"])}
                    {values.discipline === "Yes" && field("disciplineDetails", "Provide details, including when and why", true, "text", true)}
                  </>}
                  {step === 1 && <>
                    {field("practice", "Practice name", true, "text", true)}{field("hours", "Hours of operation")}{field("email", "Practice email", true, "email")}
                    {field("address", "Street address", true, "text", true)}{field("city", "City", true)}{field("state", "State", true)}{field("zip", "ZIP code", true)}{field("phone", "Phone", true, "tel")}{field("fax", "Fax", false, "tel")}{field("shipping", "Special shipping instructions", false, "text", true)}
                  </>}
                  {step === 2 && <>
                    {choice("frequency", "Typical ordering pattern for controlled substances (if applicable)", ["Weekly", "Monthly", "Quarterly", "Semi-annually"])}
                    {field("volume", "Estimated annual volume (units)", false, "number")}
                    {choice("collaborating", "Do you have a collaborating physician?", ["No", "Yes"])}
                    {values.collaborating === "Yes" && <>{field("collaborator", "Collaborating physician name", true)}{field("collaboratorCredentials", "Credentials", true)}{field("collaboratorNpi", "NPI number", true)}{field("collaboratorLicense", "License number", true)}{field("collaboratorLicenseExpiry", "License expiration", true, "date")}{field("collaboratorDea", "DEA number")}{field("collaboratorDeaExpiry", "DEA expiration", false, "date")}</>}
                    <h4 className="mt-2 border-t border-[#e5e7eb] pt-4 text-[13px] font-semibold sm:col-span-2">Office contact</h4>
                    {field("contactName", "Contact name", true)}{field("contactPosition", "Position in office", true)}{field("contactPhone", "Phone + extension", true, "tel")}{field("contactEmail", "Contact email", true, "email")}
                  </>}
                  {step === 3 && <>
                    <div className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-4 sm:col-span-2">
                      {[
                        { title: "Prescriber", summary: [[values.firstName, values.lastName].filter(Boolean).join(" "), values.credentials, values.npi && `NPI ${values.npi}`].filter(Boolean).join(" · "), index: 0 },
                        { title: "Practice", summary: [values.practice, [values.address, values.city, [values.state, values.zip].filter(Boolean).join(" ")].filter(Boolean).join(", ")].filter(Boolean).join(" · "), index: 1 },
                        { title: "Office contact", summary: [values.contactName, values.contactEmail].filter(Boolean).join(" · "), index: 2 },
                      ].map(item => <div key={item.title} className="flex items-start justify-between gap-4 py-2"><div><p className="text-[11px] text-[#6b7280]">{item.title}</p><p className="mt-1 break-words text-[12px] leading-5">{item.summary || "Not provided"}</p></div><button type="button" onClick={() => setStep(item.index)} className="text-[11px] font-medium text-[#2563eb] underline">Edit</button></div>)}
                    </div>
                    <label className="flex items-start gap-3 text-[12px] leading-5 text-[#4b5563] sm:col-span-2"><input type="checkbox" required checked={values.confirm === "yes"} onChange={event => update("confirm", event.target.checked ? "yes" : "")} className="mt-1 accent-[#3974d8]" />I confirm that the information entered is accurate and that I am authorized to complete this enrollment for the practice.</label>
                    {field("signature", "Prescriber signature (type full name)", true)}{field("signatureDate", "Date", true, "date")}
                    <p className="rounded-lg bg-[#fff9ec] p-3 text-[11px] leading-5 text-[#877246] sm:col-span-2">Demo only. Completing this form does not submit an application or execute a pharmacy agreement.</p>
                  </>}
                </div>
              </div>
              <footer className="shrink-0 space-y-1 border-t border-[#ece9e5] bg-white px-6 py-4">
                <button type="submit" className="flex h-11 w-full items-center justify-center rounded-full bg-[#111] text-[12px] font-semibold text-white transition-colors hover:bg-[#222]">{step === 3 ? "Complete enrollment" : "Continue"}</button>
                <button type="button" onClick={() => step === 0 ? onClose() : setStep(step - 1)} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4b5563] hover:bg-[#f3f4f6] hover:text-[#171717]">{step === 0 ? "Cancel" : "Back"}</button>
              </footer>
            </form>
          </>
        )}
      </div>
    </dialog>, document.body,
  );
}
