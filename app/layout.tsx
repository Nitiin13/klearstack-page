import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KlearStack AI — Autonomous Document Processing & Instant ROI Calculator",
  description:
    "Extract structured data from unstructured invoices, KYC, bank cheques, and legal contracts with 99.5% accuracy. Calculate your annual operational ROI in real-time with KlearStack AI.",
  keywords: [
    "KlearStack",
    "Document AI",
    "OCR Extraction",
    "Invoice Processing",
    "ROI Calculator",
    "Autonomous Document Extraction",
    "Hexanovate",
  ],
  authors: [{ name: "KlearStack AI Team" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080c14] text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
