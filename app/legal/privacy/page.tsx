import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy notice | Methods Consultancy",
  description:
    "How Methods Consultancy handles personal information on this website.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      summary="How Methods Consultancy handles personal information on this website."
      covers={[
        "Website analytics",
        "Contact and enquiry forms",
        "Discovery-call booking",
        "AI assistant conversations, and how long they are kept",
        "Your rights, including deletion requests",
        "The laws that apply: the Kenya Data Protection Act 2019, Rwanda Law No. 058/2021, and the GDPR for visitors in the European Economic Area",
      ]}
    />
  );
}
