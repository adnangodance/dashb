import assert from "node:assert/strict";
import test from "node:test";
import { getDoseSpotStatus } from "../src/app/dosespot-status.ts";

test("backend ineligibility is visible even for an already synced record", () => {
  const status = getDoseSpotStatus({ epcsStatus: "synced", epcsEligible: false, epcsMissingFields: ["BMI"] });
  assert.equal(status.label, "Not eligible");
  assert.equal(status.syncLabel, "Synced");
  assert.deepEqual(status.missingFields, ["BMI"]);
});

test("eligible does not imply synced", () => {
  const status = getDoseSpotStatus({ epcsStatus: "not_registered", epcsEligible: true });
  assert.equal(status.label, "Not synced");
  assert.equal(status.notEligible, false);
});

test("missing fields never override the backend eligibility decision", () => {
  const status = getDoseSpotStatus({ epcsStatus: "not_registered", epcsEligible: true, epcsMissingFields: ["BMI"] });
  assert.equal(status.label, "Not synced");
  assert.equal(status.notEligible, false);
});

test("a backend rejection does not require a missing-fields list", () => {
  const status = getDoseSpotStatus({ epcsStatus: "not_registered", epcsEligible: false, epcsIneligibilityReason: "Profile review required." });
  assert.equal(status.label, "Not eligible");
  assert.deepEqual(status.missingFields, []);
});

test("unavailable status is never presented as synced or eligible", () => {
  const status = getDoseSpotStatus({});
  assert.equal(status.label, "Status unavailable");
  assert.equal(status.tone, "gray");
});

test("sync-needed records retain distinct status and readable missing fields", () => {
  const status = getDoseSpotStatus({ epcsStatus: "needs_sync", epcsMissingFields: [" NPI number ", "", "NPI number", "DEA number"] });
  assert.equal(status.label, "Sync needed");
  assert.deepEqual(status.missingFields, ["NPI number", "DEA number"]);
});
