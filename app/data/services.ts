export type Service = {
  slug: string;
  title: string;
  summary: string;
};

export const services: Service[] = [
  {
    slug: "ea-establishment",
    title: "Enterprise Architecture Establishment",
    summary: "Stand up the discipline: framework, policy, operating model, roadmap.",
  },
  {
    slug: "architecture-governance",
    title: "Architecture Governance Design",
    summary: "Boards, toll-gates, and decision rights that make architecture stick.",
  },
  {
    slug: "baseline-discovery",
    title: "Baseline Discovery",
    summary: "An evidence-based current-state picture, directorate by directorate.",
  },
  {
    slug: "artefacts-repository",
    title: "Artefacts and Repository",
    summary: "The content set and single source of truth behind every decision.",
  },
  {
    slug: "cloud-infrastructure-strategy",
    title: "Cloud and Infrastructure Strategy",
    summary: "Evidence-grounded hosting strategy for regulated estates.",
  },
  {
    slug: "procurement-specification",
    title: "Procurement and Specification",
    summary: "TORs and requirement sets that make tenders evaluable.",
  },
  {
    slug: "conformance-review",
    title: "Conformance Review",
    summary: "Independent review of vendor architectures against your standards.",
  },
  {
    slug: "digital-advisory",
    title: "Digital Advisory",
    summary: "Architecture-led rigour for CBDC, AI, and data-platform initiatives.",
  },
  {
    slug: "regulatory-alignment",
    title: "Regulatory Alignment",
    summary: "Obligations mapped into architecture, not bolted on after.",
  },
  {
    slug: "capability-building",
    title: "Capability Building",
    summary: "We transfer the discipline, then get out of the way.",
  },
];
