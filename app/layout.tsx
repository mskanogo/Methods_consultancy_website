import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AssistantLauncher from "./components/AssistantLauncher";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-brand",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Methods Consultancy",
  description: "Enterprise architecture and technology governance consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <Header />
        {children}
        <Footer />
        <AssistantLauncher />
      </body>
    </html>
  );
}
