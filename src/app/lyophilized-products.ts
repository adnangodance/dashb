export type LyophilizedProductSeed = {
  catalogNumber: number;
  name: string;
  strength: string;
  ordered?: number;
};

export const LYOPHILIZED_PRODUCT_SEEDS: LyophilizedProductSeed[] = [
  { catalogNumber: 1, name: "BPC-157", strength: "15mg", ordered: 1 },
  { catalogNumber: 2, name: "Gonadorelin Acetate (Lyophilized)", strength: "2000mcg" },
  { catalogNumber: 3, name: "Hexarelin (Lyophilized)", strength: "6mg" },
  { catalogNumber: 4, name: "Omnitrope", strength: "5.8mg/vial" },
  { catalogNumber: 5, name: "Pregnyl HCG (Commercial)", strength: "10000IU/vial", ordered: 1 },
  { catalogNumber: 6, name: "PT-141 (Bremelanotide)", strength: "20mg", ordered: 1 },
  { catalogNumber: 7, name: "Thymosin Beta 4 (TB-500)", strength: "15mg" },
  { catalogNumber: 8, name: "Vitamin B-12 (Methylcobalamin) Lyophilized", strength: "12000mcg" },
];
