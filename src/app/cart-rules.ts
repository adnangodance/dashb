export type CatalogType = "503A" | "503B";
export type CartConflict = { existingType: CatalogType; incomingType: CatalogType };
type CatalogItem = { catalogType?: CatalogType; qty?: number };

export const productCatalogType = (item: CatalogItem): CatalogType => item.catalogType ?? "503A";

export function getCartCatalogType(items: CatalogItem[]): CatalogType | null {
  const item = items.find(item => (item.qty ?? 1) > 0);
  return item ? productCatalogType(item) : null;
}

export function getCartConflict(items: CatalogItem[], incomingType: CatalogType = "503A"): CartConflict | null {
  const conflictingItem = items.find(item => (item.qty ?? 1) > 0 && productCatalogType(item) !== incomingType);
  return conflictingItem ? { existingType: productCatalogType(conflictingItem), incomingType } : null;
}

export function addCartProduct<T extends CatalogItem & { id: number }>(items: T[], product: T, count = 1):
  | { ok: true; items: T[] }
  | { ok: false; conflict: CartConflict } {
  const catalogType = productCatalogType(product);
  const conflict = getCartConflict(items, catalogType);
  if (conflict) return { ok: false, conflict };
  const activeItems = items.filter(item => (item.qty ?? 1) > 0);
  const existing = activeItems.find(item => item.id === product.id && productCatalogType(item) === catalogType);
  const nextProduct = { ...existing, ...product, catalogType, qty: (existing ? existing.qty ?? 1 : 0) + (product.qty ?? count) };
  return { ok: true, items: [nextProduct, ...activeItems.filter(item => item !== existing)] };
}
