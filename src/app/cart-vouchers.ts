export const patientVoucherKey = (patientId: number) => `patient:${patientId}`;

// Keep the cart's existing demo offer: 10% off items, capped at $50 per payer.
export function getVoucherDiscount(subtotal: number) {
  return Math.round(Math.min(Math.max(subtotal, 0) * 0.1, 50) * 100) / 100;
}

export function getPatientVoucherSummaries(
  entries: { patientId: number | null; unitPrice: number; qty: number }[],
  vouchers: Record<string, string>,
) {
  const subtotals = new Map<number, number>();
  for (const entry of entries) {
    if (entry.patientId === null || entry.qty <= 0) continue;
    subtotals.set(entry.patientId, (subtotals.get(entry.patientId) ?? 0) + Math.round(entry.unitPrice * entry.qty * 100));
  }
  return [...subtotals].map(([patientId, cents]) => {
    const key = patientVoucherKey(patientId);
    const code = vouchers[key] ?? null;
    const subtotal = cents / 100;
    return { patientId, key, code, subtotal, discount: code ? getVoucherDiscount(subtotal) : 0 };
  });
}
