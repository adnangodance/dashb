const DAY_MS = 24 * 60 * 60 * 1000;
export const STATE_LICENSE_MAX_BYTES = 10 * 1024 * 1024;

export type StateLicenseRecord = {
  requestedAt: number;
  dueAt: number;
  skippedAt?: number;
  document?: { file: File; savedAt: number };
};

export function createStateLicenseRecord(now = Date.now()): StateLicenseRecord {
  return { requestedAt: now, dueAt: now + 30 * DAY_MS };
}

export function skipStateLicense(record: StateLicenseRecord, now = Date.now()): StateLicenseRecord {
  return { ...record, skippedAt: record.skippedAt ?? now };
}

export function stateLicenseDaysRemaining(record: StateLicenseRecord, now = Date.now()) {
  return Math.max(0, Math.ceil((record.dueAt - now) / DAY_MS));
}

export function validateStateLicenseFile(file: Pick<File, "name" | "type" | "size">): string | null {
  const allowedTypes: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg" };
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!allowedTypes[extension] || (file.type && file.type !== allowedTypes[extension])) return "Choose a PDF, JPG, or PNG file.";
  if (file.size === 0) return "This file is empty. Choose another document.";
  if (file.size > STATE_LICENSE_MAX_BYTES) return "Choose a file smaller than 10 MB.";
  return null;
}

// This frontend demo stores the actual file and its deadline together, scoped to
// the prescriber. Replace these adapters with authenticated account/upload APIs.
function openLicenseDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("scriptlinkrx-state-license", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("documents");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadStateLicense(accountId: string): Promise<StateLicenseRecord> {
  const database = await openLicenseDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("documents", "readwrite");
    const store = transaction.objectStore("documents");
    const request = store.get(accountId);
    let record: StateLicenseRecord;
    request.onsuccess = () => {
      record = request.result ?? createStateLicenseRecord();
      if (!request.result) store.put(record, accountId);
    };
    transaction.oncomplete = () => { database.close(); resolve(record); };
    transaction.onabort = () => { database.close(); reject(transaction.error); };
  });
}

export async function saveStateLicense(accountId: string, record: StateLicenseRecord): Promise<void> {
  const database = await openLicenseDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("documents", "readwrite");
    transaction.objectStore("documents").put(record, accountId);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onabort = () => { database.close(); reject(transaction.error); };
  });
}
