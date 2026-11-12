import type { Metadata } from "next";
import Script from "next/script";
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

// Runs before the page paints, so there is no flash of the wrong theme.
// A saved choice wins. Otherwise the system setting is used.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Header />
        {children}
        <Footer />
        <AssistantLauncher />
      </body>
    </html>
  );
}
