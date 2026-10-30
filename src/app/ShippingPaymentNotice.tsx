export function ShippingPaymentNotice({ paymentMethod, patientCount, onSwitchToClinic }: {
  paymentMethod: "patient" | "clinic";
  patientCount: number;
  onSwitchToClinic: () => void;
}) {
  if (patientCount < 2) return null;

  return paymentMethod === "patient" ? (
    <div className="flex w-full flex-col rounded-[18px] border border-white/70 bg-[radial-gradient(circle_at_90%_0%,rgba(255,214,178,0.95),transparent_48%),linear-gradient(145deg,#fffdf3_0%,#fbf0e5_100%)] p-3 shadow-[0_10px_28px_rgba(102,64,30,0.08)]" role="status">
      <h3 className="text-[15px] font-semibold leading-[19px] tracking-[-0.01em] text-[#211a15]">Share one shipping charge</h3>
      <p className="mb-3 mt-1.5 text-[11px] leading-4 text-[#7a7068]">Pay by Patient charges shipping per patient. Switch to Pay by Clinic to share one charge per pharmacy.</p>
      <button type="button" onClick={onSwitchToClinic} className="mt-auto min-h-11 w-full rounded-full bg-white px-4 py-2 text-center text-[12px] font-medium text-[#211a15] shadow-[0_3px_12px_rgba(102,64,30,0.06)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd6b2e]">
        Switch to Pay by Clinic
      </button>
    </div>
  ) : (
    <p className="text-[11px] leading-[18px] text-[#777]" role="status">All {patientCount} patients share one shipping charge per pharmacy with Pay by Clinic.</p>
  );
}
