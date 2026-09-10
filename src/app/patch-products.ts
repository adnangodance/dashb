export type PatchProductSeed = {
  catalogNumber: number;
  name: string;
  strength: string;
};

export const PATCH_PRODUCT_SEEDS: PatchProductSeed[] = [
  { catalogNumber: 1, name: "Estradiol", strength: "4 Patches" },
];
