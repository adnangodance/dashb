import assert from "node:assert/strict";
import test from "node:test";
import { footerRevealOffset } from "../src/app/landing/footer-motion.ts";

test("wordmark follows scroll in both directions and finishes at the bottom of the viewport", () => {
  assert.equal(footerRevealOffset(900, 300, 900), 200);
  const halfway = footerRevealOffset(750, 300, 900);
  assert.ok(halfway > 0 && halfway < 200);
  assert.equal(footerRevealOffset(600, 300, 900), 0);
  assert.equal(footerRevealOffset(750, 300, 900), halfway);
  assert.equal(footerRevealOffset(1000, 300, 900), 200);
  assert.equal(footerRevealOffset(-400, 300, 900), 0);
  assert.ok(Number.isFinite(footerRevealOffset(900, 0, 900)));
});
