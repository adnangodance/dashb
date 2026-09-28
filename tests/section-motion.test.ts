import assert from "node:assert/strict";
import test from "node:test";
import { sectionRevealFrame } from "../src/app/landing/section-motion.ts";

test("sections expand through the viewport and reverse when scrolling back", () => {
  const start = sectionRevealFrame(900, 900);
  const middle = sectionRevealFrame(300, 900);
  const end = sectionRevealFrame(-315, 900);
  assert.equal(start.scale, .84);
  assert.equal(start.radius, 52);
  assert.ok(middle.scale > start.scale && middle.scale < 1);
  assert.ok(middle.radius < start.radius && middle.radius > 0);
  assert.ok(middle.shadow < start.shadow && middle.shadow > 0);
  assert.equal(end.scale, 1);
  assert.equal(end.radius, 0);
  assert.equal(end.shadow, 0);
  assert.deepEqual(sectionRevealFrame(300, 900), middle);
  assert.deepEqual(sectionRevealFrame(1200, 900), start);
  assert.deepEqual(sectionRevealFrame(-2000, 900), end);
});

test("mobile panels keep text larger, and invalid viewport height stays finite", () => {
  const desktop = sectionRevealFrame(700, 700);
  const mobile = sectionRevealFrame(700, 700, true);
  assert.ok(mobile.scale > desktop.scale);
  assert.ok(mobile.radius < desktop.radius);
  assert.equal(sectionRevealFrame(-245, 700, true).scale, 1);
  for (const value of Object.values(sectionRevealFrame(0, 0))) assert.ok(Number.isFinite(value));
});
