export type EpcsStatus = "synced" | "not_registered" | "needs_sync";

// Supplied by the backend. Never infer eligibility from BMI, age, or credentials.
export type DoseSpotSyncData = {
  epcsStatus?: EpcsStatus;
  epcsEligible?: boolean;
  epcsMissingFields?: string[];
  epcsIneligibilityReason?: string;
};

export function getDoseSpotStatus(data: DoseSpotSyncData) {
  const syncLabel = data.epcsStatus === "synced" ? "Synced"
    : data.epcsStatus === "needs_sync" ? "Sync needed"
    : data.epcsStatus === "not_registered" ? "Not synced"
    : "Status unavailable";
  const missingFields = [...new Set((data.epcsMissingFields ?? []).map(field => field.trim()).filter(Boolean))];
  const notEligible = data.epcsEligible === false;
  return {
    label: notEligible ? "Not eligible" : syncLabel,
    syncLabel,
    notEligible,
    missingFields,
    tone: notEligible ? "red" : data.epcsStatus === "synced" ? "green" : data.epcsStatus ? "amber" : "gray",
  } as const;
}
