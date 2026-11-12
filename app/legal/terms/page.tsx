import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use | Methods Consultancy",
  description: "The terms for using the Methods Consultancy website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      summary="The terms for using this website."
    />
  );
}
