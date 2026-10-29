export type Service = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "ea-establishment",
    title: "Enterprise Architecture Establishment",
    summary: "Stand up the discipline: framework, policy, operating model, roadmap.",
    intro:
      "Stand up enterprise architecture as a discipline: EA frameworks, EA policies, operating models, ADM-aligned ways of working, and the roadmap to institutionalise them.",
    deliverables: ["EA Framework", "EA Policy", "EA operating model", "Adoption roadmap"],
  },
  {
    slug: "architecture-governance",
    title: "Architecture Governance Design",
    summary: "Boards, toll-gates, and decision rights that make architecture stick.",
    intro:
      "Design and charter the bodies that make architecture decisions stick: architecture review committees, technical review committees, terms of reference, service orders, decision rights, and toll-gate frameworks mapped to the delivery lifecycle.",
    deliverables: [
      "Governance charters and TORs",
      "Toll-gate framework",
      "Review forms and registers",
      "Escalation and waiver mechanisms",
    ],
  },
  {
    slug: "baseline-discovery",
    title: "Baseline Discovery",
    summary: "An evidence-based current-state picture, directorate by directorate.",
    intro:
      "Structured, evidence-based discovery across business, application, data, and technology domains, directorate by directorate, producing a defensible current-state picture.",
    deliverables: [
      "Discovery templates and workbooks",
      "Consolidated baseline catalogues",
      "Findings and heatmaps",
    ],
  },
  {
    slug: "artefacts-repository",
    title: "Artefacts and Repository",
    summary: "The content set and single source of truth behind every decision.",
    intro:
      "Author the core content set and stand up the Architecture Content Repository, so the practice has a single source of truth.",
    deliverables: [
      "Architecture Vision",
      "Architecture Definition",
      "Requirements Specification",
      "Roadmap",
      "Standards and technology catalogues",
    ],
  },
  {
    slug: "cloud-infrastructure-strategy",
    title: "Cloud and Infrastructure Strategy",
    summary: "Evidence-grounded hosting strategy for regulated estates.",
    intro:
      "Evidence-grounded cloud readiness and hosting strategy for regulated estates, including hybrid positioning, market engagement, and structured RFIs to test the supplier landscape.",
    deliverables: [
      "Infrastructure assessments",
      "Hybrid and cloud strategy",
      "Multi-domain RFI packs",
      "Evaluation frameworks",
    ],
  },
  {
    slug: "procurement-specification",
    title: "Procurement and Specification",
    summary: "TORs and requirement sets that make tenders evaluable.",
    intro:
      "Rigorous, vendor-neutral specifications that make procurements evaluable: terms of reference, functional and non-functional requirement sets, and scoring models.",
    deliverables: [
      "Terms of reference",
      "Functional and non-functional specifications",
      "Internal and public document versions",
      "Evaluation criteria",
    ],
  },
  {
    slug: "conformance-review",
    title: "Conformance Review",
    summary: "Independent review of vendor architectures against your standards.",
    intro:
      "Independent review of vendor-authored architectures and solution designs against the client's EA standards, with clear conformance findings and remediation paths.",
    deliverables: [
      "Conformance assessments",
      "Exception and waiver analysis",
      "Remediation roadmaps",
    ],
  },
  {
    slug: "digital-advisory",
    title: "Digital Advisory",
    summary: "Architecture-led rigour for CBDC, AI, and data-platform initiatives.",
    intro:
      "Architecture-led advisory for high-stakes digital initiatives, such as digital currency pilots, conversational AI deployments, and data platforms, including requirement specification and policy positions such as cross-border AI processing.",
    deliverables: [
      "Pilot NFR specifications",
      "Policy position papers",
      "Hosting and deployment options analysis",
    ],
  },
  {
    slug: "regulatory-alignment",
    title: "Regulatory Alignment",
    summary: "Obligations mapped into architecture, not bolted on after.",
    intro:
      "Map architecture and technology decisions to the obligations that bind the client (prudential, market-infrastructure, data-protection, and cybersecurity) and embed them in governance.",
    deliverables: [
      "Regulatory obligations registers",
      "Standards catalogues",
      "Alignment assessments",
    ],
  },
  {
    slug: "capability-building",
    title: "Capability Building",
    summary: "We transfer the discipline, then get out of the way.",
    intro:
      "Transfer the discipline: coaching for architecture boards, secretariat enablement, template walkthroughs, and structured handover, so the practice survives our exit.",
    deliverables: [
      "Training and coaching sessions",
      "Playbooks",
      "Handover packs",
    ],
  },
];
