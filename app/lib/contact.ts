// Shared by the contact form (browser) and the contact route (server),
// so both apply exactly the same rules.

export const TOPICS = [
  { value: "new-business", label: "A new project or enquiry" },
  { value: "partner", label: "Partnership or subcontracting" },
  { value: "careers", label: "Careers" },
  { value: "supplier", label: "Supplier enquiry" },
  { value: "media", label: "Media" },
  { value: "other", label: "Something else" },
] as const;

export type TopicValue = (typeof TOPICS)[number]["value"];

// [TO CONFIRM] Calendar account and tool (Cal.com or Calendly).
// Paste the booking link here once Methods Consultancy has created it.
export const BOOKING_URL: string | null = null;

// [TO CONFIRM] A mailbox for each topic, and a default inbox that a person monitors.
export const MAILBOXES: Record<TopicValue, string | null> = {
  "new-business": null,
  partner: null,
  careers: null,
  supplier: null,
  media: null,
  other: null,
};
export const DEFAULT_MAILBOX: string | null = null;

// Switch to true once enquiries are really sent by email.
export const DELIVERY_CONNECTED = false;

export const LIMITS = {
  name: 100,
  organisation: 150,
  role: 100,
  email: 254,
  messageMin: 10,
  messageMax: 2000,
} as const;

export type ContactValues = {
  name: string;
  organisation: string;
  role: string;
  email: string;
  topic: TopicValue;
  message: string;
  consent: true;
};

export type FieldName =
  | "name"
  | "organisation"
  | "role"
  | "email"
  | "topic"
  | "message"
  | "consent";

export type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: Record<string, unknown>): {
  values: ContactValues | null;
  errors: FieldErrors;
} {
  const name = text(input.name);
  const organisation = text(input.organisation);
  const role = text(input.role);
  const email = text(input.email);
  const topic = text(input.topic);
  const message = text(input.message);
  const errors: FieldErrors = {};

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Use ${LIMITS.name} characters or fewer.`;

  if (!organisation) errors.organisation = "Enter your organisation.";
  else if (organisation.length > LIMITS.organisation)
    errors.organisation = `Use ${LIMITS.organisation} characters or fewer.`;

  if (role.length > LIMITS.role)
    errors.role = `Use ${LIMITS.role} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = "Enter a valid email address.";

  const topicOption = TOPICS.find((option) => option.value === topic);
  if (!topicOption) errors.topic = "Choose a topic.";

  if (message.length < LIMITS.messageMin)
    errors.message = `Write at least ${LIMITS.messageMin} characters.`;
  else if (message.length > LIMITS.messageMax)
    errors.message = `Use ${LIMITS.messageMax} characters or fewer.`;

  if (input.consent !== true)
    errors.consent = "Please confirm that you agree to this.";

  if (Object.keys(errors).length > 0 || !topicOption) {
    return { values: null, errors };
  }

  return {
    values: {
      name,
      organisation,
      role,
      email,
      topic: topicOption.value,
      message,
      consent: true,
    },
    errors,
  };
}
