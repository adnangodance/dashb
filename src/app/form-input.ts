import type { InputHTMLAttributes } from "react";

/** Autofill tokens and keyboards shared by enrollment, settings and onboarding. */
export function inputMetadata(label: string): InputHTMLAttributes<HTMLInputElement> {
  const key = label.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const next = { enterKeyHint: "next" as const };
  if (/email/.test(key)) return { ...next, type: "email", autoComplete: "email", autoCapitalize: "none", spellCheck: false };
  if (/phone|fax|cell|^tel$/.test(key)) return { ...next, type: "tel", autoComplete: "tel" };
  if (/firstname/.test(key)) return { ...next, autoComplete: "given-name" };
  if (/lastname/.test(key)) return { ...next, autoComplete: "family-name" };
  if (/middleinitial/.test(key)) return { ...next, autoComplete: "additional-name" };
  if (/cardholder|nameoncard/.test(key)) return { ...next, autoComplete: "cc-name" };
  if (/cardnumber|cardinformation|12341234|41111111/.test(key)) return { ...next, autoComplete: "cc-number", inputMode: "numeric" };
  if (/expiration|mmyy/.test(key)) return { ...next, autoComplete: "cc-exp", inputMode: "numeric" };
  if (/securitycode|cvv|cvc/.test(key)) return { ...next, autoComplete: "cc-csc", inputMode: "numeric" };
  if (/postal|zip/.test(key)) return { ...next, autoComplete: "postal-code", inputMode: "numeric" };
  if (/addressline2|address2|aptfloor/.test(key)) return { ...next, autoComplete: "address-line2" };
  if (/addressline1|address1|streetaddress|businessaddress|^address$/.test(key)) return { ...next, autoComplete: "address-line1" };
  if (/^city$/.test(key)) return { ...next, autoComplete: "address-level2" };
  if (/^state$/.test(key)) return { ...next, autoComplete: "address-level1" };
  if (/businessname|organization|^practice$|practicename/.test(key)) return { ...next, autoComplete: "organization" };
  if (/npi|quantity|refills|dayssupply|volume/.test(key)) return { ...next, inputMode: "numeric" };
  if (/^dose$|weight|height/.test(key)) return { ...next, inputMode: "decimal" };
  if (/birthdate|dateofbirth|^dob$/.test(key)) return { ...next, autoComplete: "bday" };
  if (/currentpassword|^password$/.test(key)) return { ...next, autoComplete: "current-password" };
  if (/newpassword|confirm.*password/.test(key)) return { ...next, autoComplete: "new-password" };
  if (/^name$|fullname|contactname|signature|collaborator$/.test(key)) return { ...next, autoComplete: "name" };
  return next;
}
