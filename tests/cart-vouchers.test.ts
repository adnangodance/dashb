import assert from "node:assert/strict";
import test from "node:test";
import { getPatientVoucherSummaries, getVoucherDiscount } from "../src/app/cart-vouchers.ts";

test("a voucher discounts only its patient, including all of their cart items", () => {
  const summary = getPatientVoucherSummaries([
    { patientId: 0, unitPrice: 35.88, qty: 1 },
    { patientId: 1, unitPrice: 35.88, qty: 3 },
    { patientId: 0, unitPrice: 20, qty: 2 },
  ], { "patient:0": "DAN10" });
  assert.deepEqual(summary.map(({ patientId, subtotal, discount }) => ({ patientId, subtotal, discount })), [
    { patientId: 0, subtotal: 75.88, discount: 7.59 },
    { patientId: 1, subtotal: 107.64, discount: 0 },
  ]);
});

test("discount caps apply once per patient, not once per item or across the whole cart", () => {
  const summary = getPatientVoucherSummaries([
    { patientId: 0, unitPrice: 300, qty: 2 },
    { patientId: 0, unitPrice: 300, qty: 1 },
    { patientId: 1, unitPrice: 600, qty: 1 },
  ], { "patient:0": "FIRST", "patient:1": "SECOND" });
  assert.deepEqual(summary.map(item => item.discount), [50, 50]);
});

test("removing one code preserves the other patient's discount", () => {
  const entries = [{ patientId: 0, unitPrice: 35.88, qty: 1 }, { patientId: 1, unitPrice: 35.88, qty: 1 }];
  const before = getPatientVoucherSummaries(entries, { "patient:0": "FIRST", "patient:1": "SECOND" });
  const after = getPatientVoucherSummaries(entries, { "patient:1": "SECOND" });
  assert.deepEqual(before.map(item => item.discount), [3.59, 3.59]);
  assert.deepEqual(after.map(item => item.discount), [0, 3.59]);
});

test("removed patients and clinic items do not receive patient discounts", () => {
  const summary = getPatientVoucherSummaries([
    { patientId: 0, unitPrice: 35.88, qty: 0 },
    { patientId: 1, unitPrice: 35.88, qty: 2 },
    { patientId: null, unitPrice: 100, qty: 1 },
  ], { "patient:0": "REMOVED", "patient:1": "ACTIVE", cart: "CLINIC" });
  assert.deepEqual(summary, [{ patientId: 1, key: "patient:1", code: "ACTIVE", subtotal: 71.76, discount: 7.18 }]);
  assert.equal(getVoucherDiscount(100), 10);
});
