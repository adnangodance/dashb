import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Eye, Info } from "lucide-react";
import scriptlinkrxLogo from "@/assets/scriptlinkrx-logo.svg";
import { inputMetadata } from "./form-input";
import { SignaturePad } from "./SignaturePad";

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type TaxClassification = "individual" | "c-corporation" | "s-corporation" | "partnership" | "trust-estate" | "llc" | "other";
type TinType = "ssn" | "ein";

const TOTAL_STEPS = 6;

const stepContent: Record<Step, { title: string; subtitle: string }> = {
  1: { title: "Taxpayer Name", subtitle: "Enter the name that matches your tax return." },
  2: { title: "Federal Tax Classification", subtitle: "Choose one classification for the name you entered." },
  3: { title: "Exemptions", subtitle: "These apply only to certain entities, not individuals. Leave blank if unsure." },
  4: { title: "Your Address", subtitle: "Enter the address for your tax information." },
  5: { title: "Taxpayer Identification Number", subtitle: "Your number must match the name you entered in step 1." },
  6: { title: "Certification", subtitle: "Review each statement, then sign under penalties of perjury." },
};

const classifications: { id: TaxClassification; label: string }[] = [
  { id: "individual", label: "Individual/sole proprietor" },
  { id: "c-corporation", label: "C corporation" },
  { id: "s-corporation", label: "S corporation" },
  { id: "partnership", label: "Partnership" },
  { id: "trust-estate", label: "Trust/estate" },
  { id: "llc", label: "LLC" },
  { id: "other", label: "Other" },
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const inputClass = "h-10 w-full rounded-[8px] border border-[#d7dcda] bg-white px-3 text-[11px] outline-none placeholder:text-[#a3aaa6] focus:border-[1.5px] focus:border-[#183229]";

function W9Label({ label, required = false, hint, children }: { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[11px] font-medium">{label} {required && <span className="text-[#b4473d]">*</span>}</span>
      {children}
      {hint && <span className="mt-1 block text-[9px] leading-[14px] text-[#818985]">{hint}</span>}
    </label>
  );
}

function formatTin(digits: string, type: TinType) {
  const groups = type === "ssn" ? [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5)] : [digits.slice(0, 2), digits.slice(2)];
  return groups.filter(Boolean).join("-");
}

export function W9OnboardingPage({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [classification, setClassification] = useState<TaxClassification | null>(null);
  const [llcCode, setLlcCode] = useState("");
  const [otherClassification, setOtherClassification] = useState("");
  const [foreignPartners, setForeignPartners] = useState(false);
  const [exemptPayeeCode, setExemptPayeeCode] = useState("");
  const [fatcaCode, setFatcaCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [accountNumbers, setAccountNumbers] = useState("");
  const [tinType, setTinType] = useState<TinType>("ssn");
  // The SSN/EIN stays in memory only. Never write it to storage, the URL or logs.
  const [tin, setTin] = useState("");
  const [tinVisible, setTinVisible] = useState(false);
  const [subjectToBackupWithholding, setSubjectToBackupWithholding] = useState(false);
  const [certified, setCertified] = useState(false);
  const [signed, setSigned] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Form W-9 | ScriptLinkRx";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const showForeignPartners = classification === "partnership" || classification === "trust-estate" || (classification === "llc" && llcCode === "P");
  const canContinue: Record<Step, boolean> = {
    1: name.trim().length > 0,
    2: classification !== null && (classification !== "llc" || llcCode !== "") && (classification !== "other" || otherClassification.trim().length > 0),
    3: true,
    4: address.trim().length > 0 && city.trim().length > 0 && state !== "" && /^\d{5}(-?\d{4})?$/.test(zip.trim()),
    5: tin.length === 9,
    6: certified && signed,
  };

  function goBack() {
    setNotice(null);
    // The signature canvas clears when it unmounts, so it must be signed again.
    setSigned(false);
    if (step === 1) onCancel();
    else setStep(step - 1 as Step);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue[step]) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1 as Step);
      return;
    }
    // This preview has no W-9 service. Never report the form as received.
    setNotice("W-9 submission is unavailable right now. Nothing you entered has been saved or sent.");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-10 font-['Inter',sans-serif] text-[#171717]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-8%,rgba(205,221,255,0.75),rgba(205,221,255,0)_100%),radial-gradient(ellipse_60%_50%_at_92%_104%,rgba(198,230,223,0.6),rgba(198,230,223,0)_100%),linear-gradient(155deg,#fbfcff_0%,#f4f6fc_52%,#edf3f5_100%)]" />
      <section className="relative w-full max-w-[470px] px-0 py-8 sm:px-5">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <img decoding="async" src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[27px] w-8 object-contain" />
          <span className="font-['Poppins',sans-serif] text-[15px] font-semibold uppercase tracking-wide text-[#183229]">
            S<span className="lowercase">CRIPTLINKrx</span>
          </span>
        </div>

        <div className="rounded-[14px] border border-white/80 bg-white/65 px-5 py-8 shadow-[0_14px_40px_rgba(24,50,41,0.08)] backdrop-blur-[18px] sm:px-9">
          <div className="text-center">
            <h1 className="text-[21px] font-semibold tracking-[-0.025em]">{stepContent[step].title}</h1>
            <p className="mt-1.5 text-[11px] text-[#747c78]">{stepContent[step].subtitle}</p>
            <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3974d8]">Step {step} of {TOTAL_STEPS} · Form W-9</p>
          </div>

          <div className="my-6 h-px bg-[#eceeec]" />

          <form noValidate autoComplete="off" onSubmit={submit} className="space-y-3.5">
            {step === 1 && <>
              <W9Label label="Name of entity/individual" required hint="Sole proprietors and disregarded entities: enter the owner's name here and the business name below.">
                <input {...inputMetadata("Full Name")} autoFocus value={name} onChange={event => setName(event.target.value)} placeholder="Enter the name on your tax return" className={inputClass} />
              </W9Label>
              <W9Label label="Business name/disregarded entity name" hint="Only if different from the name above.">
                <input {...inputMetadata("Business Name")} value={businessName} onChange={event => setBusinessName(event.target.value)} placeholder="Enter business name (optional)" className={inputClass} />
              </W9Label>
            </>}

            {step === 2 && <>
              <fieldset className="space-y-2">
                <legend className="mb-1.5 text-[11px] font-medium">Tax classification <span className="text-[#b4473d]">*</span></legend>
                {classifications.map(option => (
                  <label key={option.id} className={`flex h-10 cursor-pointer items-center gap-2.5 rounded-[8px] border bg-white px-3 text-[11px] ${classification === option.id ? "border-[1.5px] border-[#183229]" : "border-[#d7dcda]"}`}>
                    <input type="radio" name="w9-classification" checked={classification === option.id} onChange={() => setClassification(option.id)} className="accent-[#183229]" />
                    {option.label}
                  </label>
                ))}
              </fieldset>
              {classification === "llc" && (
                <W9Label label="LLC tax classification" required hint="A disregarded entity should choose the classification of its owner instead of LLC.">
                  <select value={llcCode} onChange={event => setLlcCode(event.target.value)} className={`${inputClass} pl-3 pr-9`}>
                    <option value="" disabled>Select classification</option>
                    <option value="C">C - C corporation</option>
                    <option value="S">S - S corporation</option>
                    <option value="P">P - Partnership</option>
                  </select>
                </W9Label>
              )}
              {classification === "other" && (
                <W9Label label="Describe your classification" required>
                  <input value={otherClassification} onChange={event => setOtherClassification(event.target.value)} placeholder="Enter your tax classification" className={inputClass} />
                </W9Label>
              )}
              {showForeignPartners && (
                <label className="flex cursor-pointer items-start gap-2.5 rounded-[8px] border border-[#d7dcda] bg-white p-3 text-[11px] leading-[17px]">
                  <input type="checkbox" checked={foreignPartners} onChange={event => setForeignPartners(event.target.checked)} className="mt-0.5 accent-[#183229]" />
                  I am providing this form to a partnership, trust or estate in which I have an ownership interest, and I have foreign partners, owners or beneficiaries.
                </label>
              )}
            </>}

            {step === 3 && <>
              <W9Label label="Exempt payee code (if any)">
                <input value={exemptPayeeCode} onChange={event => setExemptPayeeCode(event.target.value)} placeholder="Enter code (optional)" className={inputClass} />
              </W9Label>
              <W9Label label="Exemption from FATCA reporting code (if any)" hint="Applies to accounts maintained outside the United States.">
                <input value={fatcaCode} onChange={event => setFatcaCode(event.target.value)} placeholder="Enter code (optional)" className={inputClass} />
              </W9Label>
            </>}

            {step === 4 && <>
              <W9Label label="Address" required hint="Number, street, and apt. or suite no.">
                <input {...inputMetadata("Address")} value={address} onChange={event => setAddress(event.target.value)} placeholder="Enter your street address" className={inputClass} />
              </W9Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_.8fr]">
                <W9Label label="City" required>
                  <input {...inputMetadata("City")} value={city} onChange={event => setCity(event.target.value)} placeholder="City" className={inputClass} />
                </W9Label>
                <W9Label label="State" required>
                  <select value={state} onChange={event => setState(event.target.value)} className={`${inputClass} pl-3 pr-9`}>
                    <option value="" disabled>State</option>
                    {states.map(option => <option key={option}>{option}</option>)}
                  </select>
                </W9Label>
                <W9Label label="ZIP code" required>
                  <input {...inputMetadata("Zipcode")} value={zip} onChange={event => setZip(event.target.value)} placeholder="ZIP" className={inputClass} />
                </W9Label>
              </div>
              <W9Label label="Account number(s)">
                <input value={accountNumbers} onChange={event => setAccountNumbers(event.target.value)} placeholder="List account numbers (optional)" className={inputClass} />
              </W9Label>
            </>}

            {step === 5 && <>
              <fieldset>
                <legend className="mb-1.5 text-[11px] font-medium">Number type <span className="text-[#b4473d]">*</span></legend>
                <div className="grid grid-cols-2 gap-1 rounded-[8px] bg-[#f1f3f2] p-1">
                  {([["ssn", "Social security number"], ["ein", "Employer ID number"]] as const).map(([id, label]) => (
                    <button key={id} type="button" aria-pressed={tinType === id} onClick={() => { setTinType(id); setTin(""); }} className={`h-9 rounded-[6px] text-[11px] font-medium ${tinType === id ? "bg-white text-[#183229] shadow-[0_1px_3px_rgba(24,50,41,0.12)]" : "text-[#67706c]"}`}>{label}</button>
                  ))}
                </div>
              </fieldset>
              <W9Label label={tinType === "ssn" ? "Social security number" : "Employer identification number"} required hint={tinType === "ssn" ? "Individuals generally use an SSN. Sole proprietors may use either." : "Most entities use an EIN."}>
                <span className="flex h-10 items-center rounded-[8px] border border-[#d7dcda] bg-white px-3 focus-within:border-[1.5px] focus-within:border-[#183229]">
                  <input type={tinVisible ? "text" : "password"} inputMode="numeric" autoComplete="off" spellCheck={false} value={formatTin(tin, tinType)} onChange={event => setTin(event.target.value.replace(/\D/g, "").slice(0, 9))} placeholder={tinType === "ssn" ? "XXX-XX-XXXX" : "XX-XXXXXXX"} className="min-w-0 flex-1 bg-transparent text-[12px] tabular-nums outline-none placeholder:text-[#a3aaa6]" />
                  <button type="button" onClick={() => setTinVisible(current => !current)} className="text-[#7d8581]" aria-label={tinVisible ? "Hide number" : "Show number"} aria-pressed={tinVisible}><Eye size={14} /></button>
                </span>
              </W9Label>
            </>}

            {step === 6 && <>
              <div className="rounded-[8px] border border-[#d7dcda] bg-white p-3 text-[11px] leading-[17px]">
                <p className="font-medium">Under penalties of perjury, I certify that:</p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[#4f5753]">
                  <li>The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me).</li>
                  <li className={subjectToBackupWithholding ? "line-through" : undefined}>I am not subject to backup withholding because (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding.</li>
                  <li>I am a U.S. citizen or other U.S. person.</li>
                  <li>The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</li>
                </ol>
              </div>
              <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-[17px]">
                <input type="checkbox" checked={subjectToBackupWithholding} onChange={event => setSubjectToBackupWithholding(event.target.checked)} className="mt-0.5 accent-[#183229]" />
                The IRS has notified me that I am currently subject to backup withholding. This crosses out item 2.
              </label>
              <label className="flex cursor-pointer items-start gap-2.5 text-[11px] font-medium leading-[17px]">
                <input type="checkbox" checked={certified} onChange={event => setCertified(event.target.checked)} className="mt-0.5 accent-[#183229]" />
                <span>I certify the statements above <span className="text-[#b4473d]">*</span></span>
              </label>
              <SignaturePad label="Signature of U.S. person:" onSignatureChange={setSigned} />
              <W9Label label="Date">
                <input readOnly value={new Date().toLocaleDateString("en-US")} className={`${inputClass} text-[#67706c]`} />
              </W9Label>
            </>}

            {notice && <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-[#fff7ed] px-3 py-2.5 text-[11px] leading-[17px] text-[#97601e]"><Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />{notice}</p>}

            <div className="space-y-2 pt-1">
              <button type="submit" disabled={!canContinue[step]} className="flex h-10 w-full items-center justify-center rounded-[8px] bg-[#111] text-[12px] font-semibold text-white transition-colors hover:bg-[#183229] disabled:cursor-not-allowed disabled:bg-[#d5d8d6] disabled:text-[#8b918e]">{step === TOTAL_STEPS ? "Submit W-9" : "Continue"}</button>
              <button type="button" onClick={goBack} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-white/70 hover:text-[#183229]">Back</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
