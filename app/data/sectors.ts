export type Sector = {
  slug: string;
  title: string;
  summary: string;
};

export const sectors: Sector[] = [
  {
    slug: "central-banks-regulators",
    title: "Central Banks and Regulators",
    summary: "Regulator-grade rigour and discretion, with a low-friction way to start a conversation.",
  },
  {
    slug: "banks-financial-institutions",
    title: "Banks and Financial Institutions",
    summary: "Clear service definitions and evidence that we understand supervised-entity obligations.",
  },
  {
    slug: "public-sector",
    title: "Government and Public Sector",
    summary: "Governance and procurement discipline for ICT directors and programme leads.",
  },
];
