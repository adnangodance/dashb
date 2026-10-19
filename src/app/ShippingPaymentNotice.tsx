export function ShippingPaymentNotice({ paymentMethod, patientCount, onSwitchToClinic }: {
  paymentMethod: "patient" | "clinic";
  patientCount: number;
  onSwitchToClinic: () => void;
}) {
  if (patientCount < 2) return null;

  return paymentMethod === "patient" ? (
    <div role="status">
      <p className="text-[11px] leading-[18px] text-[#777]">Shipping is charged per patient. Pay by Clinic shares one shipping charge per pharmacy.</p>
      <button type="button" onClick={onSwitchToClinic} className="mt-2 min-h-[36px] w-full rounded-full bg-[#f5f5f3] px-4 py-2 text-center text-[12px] font-medium text-[#4d4d4d] transition-colors hover:bg-[#ececea] hover:text-[#202020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]">
        Switch to Pay by Clinic
      </button>
    </div>
  ) : (
    <p className="text-[11px] leading-[18px] text-[#777]" role="status">All {patientCount} patients share one shipping charge per pharmacy with Pay by Clinic.</p>
  );
}
