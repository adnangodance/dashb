import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, Info, LockKeyhole } from "lucide-react";
import scriptlinkrxLogo from "@/assets/scriptlinkrx-logo.svg";

const CODE_LENGTH = 6;

export function SalesCatalogAccessPage({ onCancel }: { onCancel: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [notice, setNotice] = useState<string | null>(null);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const complete = digits.every(digit => /^\d$/.test(digit));

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Sales catalog access | ScriptLinkRx";
    inputs.current[0]?.focus();
    return () => { document.title = previousTitle; };
  }, []);

  function updateDigits(index: number, value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (value && !numbers) return;
    setNotice(null);
    if (!numbers) {
      setDigits(current => current.map((digit, position) => position === index ? "" : digit));
      return;
    }
    // A full pasted/autofilled code replaces all six digits from any field.
    const start = numbers.length === CODE_LENGTH ? 0 : index;
    setDigits(current => {
      const next = [...current];
      [...numbers].forEach((digit, offset) => {
        if (start + offset < CODE_LENGTH) next[start + offset] = digit;
      });
      return next;
    });
    inputs.current[Math.min(start + numbers.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const target = digits[index] || index === 0 ? index : index - 1;
      setDigits(current => current.map((digit, position) => position === target ? "" : digit));
      setNotice(null);
      inputs.current[target]?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      inputs.current[Math.max(0, Math.min(CODE_LENGTH - 1, index + (event.key === "ArrowLeft" ? -1 : 1)))]?.focus();
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!complete) {
      inputs.current[digits.findIndex(digit => !digit)]?.focus();
      return;
    }
    // This preview has no access-code service. Never unlock a catalog locally.
    setNotice("Access verification is unavailable right now. Please try again later.");
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#fbfcfe] px-5 py-10 font-['Inter',sans-serif] text-[#171717]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_0%,#dbe8ff_0%,#edf4ff_45%,transparent_100%)]" />
      <div className="relative w-full max-w-[470px]">
        <button type="button" onClick={onCancel} aria-label="Return to order history" className="mx-auto mb-5 flex min-h-[38px] items-center gap-2.5 rounded-[8px] px-2 py-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]">
          <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[27px] w-8 object-contain" />
          <span aria-hidden="true" className="font-['Poppins',sans-serif] text-[15px] font-semibold uppercase tracking-wide text-[#183229]">S<span className="lowercase">CRIPTLINKrx</span></span>
        </button>

        <section aria-labelledby="sales-access-title" className="rounded-[14px] border border-white/80 bg-white/75 px-6 py-7 text-center shadow-[0_14px_40px_rgba(35,63,106,0.09)] backdrop-blur-[18px] sm:px-9 sm:py-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3974d8]">
              <LockKeyhole size={12} strokeWidth={1.8} aria-hidden="true" /> Invite-only access
            </span>
            <h1 id="sales-access-title" className="mt-3 text-[22px] font-semibold leading-7 tracking-[-0.025em]">Enter access code</h1>
            <p id="sales-access-description" className="mt-2 text-[12px] leading-[19px] text-[#747d89]">Enter the 6-digit code shared with your invitation to access the sales catalog.</p>
            <div className="my-6 h-px bg-[#e9edf3]" />

            <form noValidate onSubmit={submit} className="text-left">
              <fieldset aria-describedby="sales-access-description">
                <legend className="mb-2.5 text-[11px] font-medium text-[#292929]">6-digit access code</legend>
                <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={element => { inputs.current[index] = element; }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={CODE_LENGTH}
                      pattern="[0-9]*"
                      required
                      value={digit}
                      aria-label={`Access code digit ${index + 1} of ${CODE_LENGTH}`}
                      onFocus={event => event.currentTarget.select()}
                      onChange={event => updateDigits(index, event.target.value)}
                      onKeyDown={event => handleKeyDown(event, index)}
                      onPaste={event => { event.preventDefault(); updateDigits(index, event.clipboardData.getData("text")); }}
                      className="h-[52px] w-full min-w-0 rounded-[9px] border border-[#d8dfe8] bg-white/90 text-center text-[22px] font-medium tabular-nums outline-none transition-[border-color,box-shadow] hover:border-[#aebed5] focus:border-[#3974d8] focus:ring-[3px] focus:ring-[#e5eeff] sm:h-[56px]"
                    />
                  ))}
                </div>
              </fieldset>
              {notice && <p role="alert" className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#fff7ed] px-3 py-2.5 text-[11px] leading-[17px] text-[#97601e]"><Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />{notice}</p>}
              <button type="submit" disabled={!complete} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#292929] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:bg-[#e8edf5] disabled:text-[#919dad]">
                Continue <ArrowRight size={14} aria-hidden="true" />
              </button>
              <button type="button" onClick={onCancel} className="mt-2 h-9 w-full rounded-full text-[11px] font-medium text-[#737d8c] transition-colors hover:bg-[#f2f6fc] hover:text-[#242b35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]">Cancel</button>
            </form>
        </section>
      </div>
    </main>
  );
}
