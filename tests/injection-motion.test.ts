import assert from "node:assert/strict";
import test from "node:test";
import { injectionFrame, injectionProgress } from "../src/app/landing/injection-motion.ts";

test("card scroll follows viewport entry and exit without a pinned section", () => {
  assert.equal(injectionProgress(1100, 400, 1000), 0);
  assert.equal(injectionProgress(1000, 400, 1000), 0);
  assert.equal(injectionProgress(300, 400, 1000), 0.5);
  assert.equal(injectionProgress(-400, 400, 1000), 1);
  assert.equal(injectionProgress(-500, 400, 1000), 1);
  assert.equal(injectionProgress(300, 400, 1000), 0.5);
  assert.ok(Number.isFinite(injectionProgress(-1, 0, 0)));
});

test("fill increases without jumps and the vial label stays facing forward", () => {
  let previous = 0;
  for (let i = 0; i <= 1000; i++) {
    const frame = injectionFrame(i / 1000);
    assert.ok(frame.fill >= previous);
    assert.ok(frame.fill >= 0.08 && frame.fill <= 0.921);
    assert.ok(Math.abs(frame.rotation) < 0.4);
    assert.ok(Math.abs(frame.tilt) < 0.08);
    previous = frame.fill;
  }
});

test("fast scroll, reverse scroll, and invalid input cannot corrupt the timeline", () => {
  const midway = injectionFrame(0.37);
  injectionFrame(1);
  injectionFrame(0);
  assert.deepEqual(injectionFrame(0.37), midway);
  assert.deepEqual(injectionFrame(-10), injectionFrame(0));
  assert.deepEqual(injectionFrame(10), injectionFrame(1));
  assert.deepEqual(injectionFrame(NaN), injectionFrame(0));
  assert.deepEqual(injectionFrame(Infinity), injectionFrame(0));
});
