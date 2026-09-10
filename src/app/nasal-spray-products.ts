export type NasalSprayProductSeed = {
  catalogNumber: number;
  name: string;
  strength: string;
  ordered?: number;
};

export const NASAL_SPRAY_PRODUCT_SEEDS: NasalSprayProductSeed[] = [
  { catalogNumber: 1, name: "BEG (Mupirocin/EDTA/Gentamicin)", strength: "0.2%/1%/0.5%" },
  { catalogNumber: 2, name: "Bremelanotide (PT-141)", strength: "10mg/mL", ordered: 9 },
  { catalogNumber: 3, name: "DSIP", strength: "1000mcg/mL", ordered: 2 },
  { catalogNumber: 4, name: "Glutathione Nasal Spray", strength: "200mg/mL", ordered: 2 },
  { catalogNumber: 5, name: "Ketamine", strength: "150mg/mL" },
  { catalogNumber: 6, name: "Methylcobalamin/Synapsin", strength: "2mg/mL / 10%" },
  { catalogNumber: 7, name: "NAD+", strength: "150mg/mL" },
  { catalogNumber: 8, name: "Nicotinamide Adenine Dinucleotide (NAD+)", strength: "300mg/mL", ordered: 15 },
  { catalogNumber: 9, name: "Oxytocin", strength: "50IU", ordered: 33 },
  { catalogNumber: 10, name: "Semax", strength: "7500mcg/mL", ordered: 2 },
  { catalogNumber: 11, name: "Semax/Selank", strength: "2.5mg/2.5mg/mL", ordered: 3 },
  { catalogNumber: 12, name: "Sermorelin", strength: "500mcg" },
  { catalogNumber: 13, name: "Tranexamic Acid (TXA)", strength: "0.1" },
];
