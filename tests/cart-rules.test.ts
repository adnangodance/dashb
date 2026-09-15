import assert from "node:assert/strict";
import test from "node:test";
import { addCartProduct, getCartCatalogType, getCartConflict, type CatalogType } from "../src/app/cart-rules.ts";

for (const catalogType of ["503A", "503B"] as CatalogType[]) {
  const oppositeType: CatalogType = catalogType === "503A" ? "503B" : "503A";

  test(`empty cart accepts ${catalogType} products`, () => {
    const result = addCartProduct([], { id: 1, catalogType, qty: 2 });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(getCartCatalogType(result.items), catalogType);
      assert.equal(result.items[0].qty, 2);
    }
  });

  test(`${catalogType} cart blocks ${oppositeType} without changing existing items or quantities`, () => {
    const items = [{ id: 1, catalogType, qty: 3 }];
    const result = addCartProduct(items, { id: 1, catalogType: oppositeType, qty: 1 });
    assert.deepEqual(result, { ok: false, conflict: { existingType: catalogType, incomingType: oppositeType } });
    assert.deepEqual(items, [{ id: 1, catalogType, qty: 3 }]);
  });

  test(`${catalogType} products can be added repeatedly and alongside other products of the same type`, () => {
    const items = [{ id: 1, catalogType, qty: 2 }, { id: 2, catalogType, qty: 1 }];
    const result = addCartProduct(items, { id: 1, catalogType, qty: 3 });
    assert.equal(result.ok, true);
    if (result.ok) assert.deepEqual(result.items.map(item => [item.id, item.qty]), [[1, 5], [2, 1]]);
  });

  test(`removing the last ${catalogType} product or clearing the cart allows ${oppositeType}`, () => {
    assert.equal(getCartCatalogType([]), null);
    assert.equal(getCartConflict([], oppositeType), null);
    const result = addCartProduct([{ id: 1, catalogType, qty: 0 }], { id: 2, catalogType: oppositeType, qty: 1 });
    assert.equal(result.ok, true);
    if (result.ok) assert.deepEqual(result.items, [{ id: 2, catalogType: oppositeType, qty: 1 }]);
  });
}

test("default catalog and favorite products count as 503A", () => {
  assert.deepEqual(getCartConflict([{ catalogType: "503B" }]), { existingType: "503B", incomingType: "503A" });
  assert.deepEqual(getCartConflict([{ qty: 1 }], "503B"), { existingType: "503A", incomingType: "503B" });
  assert.equal(getCartConflict([{ qty: 1 }], "503A"), null);
});
