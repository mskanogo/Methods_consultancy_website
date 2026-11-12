import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy | Methods Consultancy",
  description:
    "The cookies and similar technologies used on the Methods Consultancy website.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      summary="The cookies and similar technologies this website uses."
      covers={[
        "Which cookies and similar technologies the website uses",
        "How to choose which categories to allow, and how to change your choice later",
      ]}
    />
  );
}
