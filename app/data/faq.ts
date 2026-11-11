import { services } from "./services";

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[]; // used by the temporary matcher below
  source: string; // where this comes from; not shown to visitors
  topic?: string; // service slug, for pre-seeding from service pages (later)
};

export const FALLBACK_ANSWER =
  "I don't have a confirmed answer to that. The best next step is a conversation with the team: use the Book a consultation button, or the contact option on this page.";

// Entries that handle handoffs and out-of-scope questions come first,
// so they win ties against the general entries.
const guardEntries: FaqEntry[] = [
  {
    id: "pricing",
    question: "How much does it cost, and how long does a project take?",
    answer:
      "I don't have confirmed information on fees or timelines, because they depend on the scope of each engagement. A discovery conversation is the best way to get a clear answer. You can arrange one with the Book a consultation button.",
    keywords: ["price", "pricing", "cost", "fee", "how much", "quote", "budget", "timeline", "how long does", "duration"],
    source: "Handoff entry: the brief gives no pricing or timelines",
  },
  {
    id: "advice",
    question: "Can you give me advice on my own organisation?",
    answer:
      "I can explain what Methods Consultancy does and how to start a conversation, but I can't give advice on your specific situation. A discovery conversation with the team is the right place for that.",
    keywords: ["advice", "advise", "recommend", "should we", "should i", "my organisation", "our organisation", "my bank", "our bank", "help me decide", "what should"],
    source: "Brief 8.8: advice-seeking is an out-of-scope refusal case",
  },
  {
    id: "assistant-nature",
    question: "Am I talking to a person?",
    answer:
      "No. I'm an automated assistant. I answer questions about Methods Consultancy using approved information. To speak to a person, use the contact option on this page.",
    keywords: ["are you a person", "are you human", "real person", "human", "bot", "robot", "chatbot", "automated", "talking to a person"],
    source: "Brief 8.1: disclosure and talk-to-a-person path",
  },
  {
    id: "personal-data",
    question: "Do I need to give personal details to ask a question?",
    answer:
      "No. You never need to share personal details to ask a question. If you choose to leave your details so the team can follow up, you will be asked for your consent first.",
    keywords: ["personal", "privacy", "consent", "gdpr", "my data", "personal data", "personal detail"],
    source: "Brief 8.1: never require personal data just to answer a question",
  },
  {
    id: "client-names",
    question: "Can you tell me who your clients are?",
    answer:
      "Client engagements are delivered under confidentiality obligations. We do not name clients, or share their logos, testimonials, or engagement details, without prior written consent from that client.",
    keywords: ["client name", "who are your client", "name your client", "which bank", "reference", "testimonial", "confidential", "logo"],
    source: "Brief 2.3",
  },
  {
    id: "booking",
    question: "How do I book a consultation?",
    answer:
      "Use the Book a consultation button to arrange a 30-minute discovery call, or send a message through the Contact page.",
    keywords: ["book", "booking", "consultation", "discovery call", "schedule", "appointment", "get in touch", "contact", "speak to", "talk to", "meet"],
    source: "Brief 7.2 (Contact page)",
  },
];

const serviceKeywords: Record<string, string[]> = {
  "ea-establishment": ["establishment", "establish", "enterprise architecture", "ea framework", "ea policy", "operating model", "roadmap", "togaf"],
  "architecture-governance": ["governance", "committee", "toll gate", "decision rights", "terms of reference", "architecture board", "waiver"],
  "baseline-discovery": ["baseline", "discovery", "current state", "assessment", "heatmap", "catalogue"],
  "artefacts-repository": ["artefact", "artifact", "repository", "content set", "architecture vision", "architecture definition", "single source of truth"],
  "cloud-infrastructure-strategy": ["cloud", "infrastructure", "hosting", "hybrid", "rfi", "readiness"],
  "procurement-specification": ["procurement", "specification", "tender", "requirement", "scoring", "tor"],
  "conformance-review": ["conformance", "vendor", "solution design", "remediation"],
  "digital-advisory": ["digital", "cbdc", "digital currency", "emerging", "conversational ai", "data platform", "advisory"],
  "regulatory-alignment": ["regulatory", "regulation", "compliance", "alignment", "prudential", "obligation"],
  "capability-building": ["capability", "training", "coaching", "handover", "playbook", "secretariat", "transfer"],
};

const serviceEntries: FaqEntry[] = services.map((service) => ({
  id: service.slug,
  question: `What is ${service.title}?`,
  answer: `${service.intro} Typical deliverables: ${service.deliverables.join(", ")}.`,
  keywords: serviceKeywords[service.slug] ?? [],
  source: "Brief Section 3 (via services data)",
  topic: service.slug,
}));

const generalEntries: FaqEntry[] = [
  {
    id: "what-we-do",
    question: "What does Methods Consultancy do?",
    answer:
      "Methods Consultancy is an independent consulting firm specialising in enterprise architecture, architecture governance, and technology strategy for financial institutions, regulators, and public-sector organisations in Africa. We establish enterprise architecture as a working discipline: we design the governance bodies, write the frameworks and policies, run the baseline discovery, produce the architecture artefacts, specify procurements, and review vendor solutions for conformance.",
    keywords: ["what do you do", "what does methods", "who are you", "about you", "about the firm", "about methods", "tell me about"],
    source: "Brief 2.1, 2.2",
  },
  {
    id: "services-overview",
    question: "What services do you offer?",
    answer:
      "We offer ten services: Enterprise Architecture Establishment, Architecture Governance Design, Baseline Discovery, Architecture Artefacts and Repository, Cloud and Infrastructure Strategy, ICT Procurement and Specification, Vendor and Solution Conformance Review, Digital and Emerging Technology Advisory, Regulatory and Standards Alignment, and Capability Building. Each has its own page under Services.",
    keywords: ["service", "offer", "provide", "what can you", "help with"],
    source: "Brief Section 3",
  },
  {
    id: "where-based",
    question: "Where are you based?",
    answer: "Our head office is in Nairobi, Kenya. We work with organisations across Africa.",
    keywords: ["where", "based", "located", "location", "office", "nairobi", "kenya", "headquarter"],
    source: "Brief 2.1",
  },
  {
    id: "established",
    question: "When was the firm established?",
    answer: "Methods Consultancy was established in 2009.",
    keywords: ["when", "established", "founded", "since", "how old", "2009", "history"],
    source: "Brief 2.1",
  },
  {
    id: "leadership",
    question: "Who leads the firm?",
    answer: "Stanley Kibe Njonjo is the Lead Consultant and Director.",
    keywords: ["leads", "leader", "leadership", "director", "lead consultant", "stanley", "njonjo", "who runs", "management"],
    source: "Brief 2.1",
  },
  {
    id: "who-we-work-with",
    question: "Who do you work with?",
    answer:
      "We work with central banks and financial regulators, commercial banks and other financial institutions, and government and public-sector organisations. We also support development partners and prime contractors who need specialist enterprise architecture subconsultants.",
    keywords: ["who do you work", "client", "sector", "central bank", "regulator", "bank", "public sector", "government", "insurer", "development partner", "industry"],
    source: "Brief Section 4",
  },
  {
    id: "experience",
    question: "Have you worked with a central bank?",
    answer:
      "Yes. We currently deliver a multi-year engagement to establish enterprise architecture at a central bank in East Africa. The work spans EA framework and policy authorship, architecture governance design, cross-directorate baseline discovery, cloud strategy and market engagement, procurement specifications, and vendor architecture conformance review. Client engagements are confidential, so we do not name clients without their written consent.",
    keywords: ["experience", "track record", "case study", "previous", "worked with", "past work", "project", "portfolio"],
    source: "Brief 2.3",
  },
  {
    id: "standards",
    question: "What standards and frameworks do you work to?",
    answer:
      "Our methods are anchored in TOGAF 10 for architecture method and content. For financial-sector clients we also work to domain standards such as BCBS 239, ISO 20022, and CPMI-PFMI, alongside national data-protection and cybersecurity frameworks.",
    keywords: ["standard", "framework", "togaf", "bcbs", "iso 20022", "cpmi", "pfmi"],
    source: "Brief 2.2",
  },
  {
    id: "more-than-strategy",
    question: "Do you only write strategy papers?",
    answer:
      "No. We do not stop at strategy papers. We design the governance bodies, write the frameworks and policies, run the baseline discovery, produce the artefacts, specify the procurements, and review vendor solutions, so the client is left with a functioning, standards-aligned architecture practice, not a binder.",
    keywords: ["strategy paper", "only strategy", "binder", "implementation", "practical", "outcome", "result"],
    source: "Brief 2.2",
  },
  {
    id: "languages",
    question: "What languages do you support?",
    answer: "English at the moment. More languages are planned.",
    keywords: ["language", "french", "swahili", "kinyarwanda", "english", "translate"],
    source: "Brief 8.1 (priority of other languages is to be confirmed)",
  },
];

export const faq: FaqEntry[] = [...guardEntries, ...serviceEntries, ...generalEntries];

// TEMPORARY matcher so the page works before the AI connection exists.
// It only ever returns approved FAQ text. Sprint 5 card 6 replaces it
// with a call to the server-side proxy route.
const stem = (word: string) =>
  word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;

const normalise = (text: string) =>
  ` ${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map(stem)
    .join(" ")} `;

export function findAnswer(message: string): string {
  const text = normalise(message);
  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faq) {
    const score = entry.keywords.filter((k) => text.includes(normalise(k))).length;
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return best ? best.answer : FALLBACK_ANSWER;
}
