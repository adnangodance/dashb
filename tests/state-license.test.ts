import assert from "node:assert/strict";
import test from "node:test";
import { createStateLicenseRecord, skipStateLicense, stateLicenseDaysRemaining, validateStateLicenseFile, STATE_LICENSE_MAX_BYTES } from "../src/app/state-license.ts";

const now = Date.parse("2026-09-24T12:00:00Z");
const day = 24 * 60 * 60 * 1000;

test("the state license grace period ends exactly 30 days after it starts", () => {
  const record = createStateLicenseRecord(now);
  assert.equal(record.dueAt, Date.parse("2026-10-24T12:00:00Z"));
  assert.equal(stateLicenseDaysRemaining(record, now), 30);
  assert.equal(stateLicenseDaysRemaining(record, now + 29 * day), 1);
  assert.equal(stateLicenseDaysRemaining(record, record.dueAt - 1), 1);
});

test("skipping again or restoring a saved record never extends the deadline", () => {
  const initial = createStateLicenseRecord(now);
  const firstSkip = skipStateLicense(initial, now + day);
  const restored = structuredClone(firstSkip);
  const secondSkip = skipStateLicense(restored, now + 12 * day);
  assert.equal(secondSkip.dueAt, initial.dueAt);
  assert.equal(secondSkip.skippedAt, firstSkip.skippedAt);
  assert.equal(stateLicenseDaysRemaining(secondSkip, now + 12 * day), 18);
  assert.equal(initial.skippedAt, undefined);
});

test("an overdue document has no new grace period or negative countdown", () => {
  const record = createStateLicenseRecord(now);
  assert.equal(stateLicenseDaysRemaining(record, record.dueAt), 0);
  assert.equal(stateLicenseDaysRemaining(skipStateLicense(record, now + 40 * day), now + 40 * day), 0);
});

test("PDF and image documents are accepted, including browsers without a MIME type", () => {
  for (const [name, type] of [["license.PDF", "application/pdf"], ["license.jpg", "image/jpeg"], ["license.jpeg", ""], ["license.png", "image/png"]]) {
    assert.equal(validateStateLicenseFile({ name, type, size: 1024 }), null);
  }
  assert.equal(validateStateLicenseFile({ name: "license.pdf", type: "application/pdf", size: STATE_LICENSE_MAX_BYTES }), null);
});

test("unsupported, mismatched, empty, and oversized files remain incomplete", () => {
  assert.match(validateStateLicenseFile({ name: "license.docx", type: "", size: 100 })!, /PDF, JPG, or PNG/);
  assert.match(validateStateLicenseFile({ name: "license.pdf", type: "text/html", size: 100 })!, /PDF, JPG, or PNG/);
  assert.match(validateStateLicenseFile({ name: "license.pdf", type: "application/pdf", size: 0 })!, /empty/);
  assert.match(validateStateLicenseFile({ name: "license.pdf", type: "application/pdf", size: STATE_LICENSE_MAX_BYTES + 1 })!, /10 MB/);
});
