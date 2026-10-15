export type Engagement = {
  slug: string;
  sector: string;
  anonymisedLabel: string; // shown until the client consents to being named
  client?: string;         // fill in only after written consent
  mandate: string;
  whatWeDid: string;
  whatChanged: string;
};

export const featuredEngagement: Engagement = {
  slug: "central-bank-east-africa",
  sector: "Central banking",
  anonymisedLabel: "A central bank in East Africa",
  mandate: "Establish enterprise architecture as a working discipline, as a multi-year engagement.",
  whatWeDid:
    "EA framework and policy authorship, architecture governance design, cross-directorate baseline discovery, cloud strategy, procurement specifications, and vendor conformance review.",
  whatChanged: "Outcome summary pending client consent and final copy.",
};
