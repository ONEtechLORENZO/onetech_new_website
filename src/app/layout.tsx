import type { Metadata } from "next";
import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const serifItalic = Instrument_Serif({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Tech",
  description:
    "ONE Tech è una SaaS company che sviluppa software verticali per settori specifici.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serifItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
