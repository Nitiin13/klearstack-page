import React from "react";
import { Header } from "@/components/Header";
import { IntegrationBanner } from "@/components/IntegrationBanner";
import { RoiCalculator } from "@/components/RoiCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef5ff] text-slate-900 flex flex-col relative overflow-x-hidden">
      {/* 1. Navigation Header with MegaMenu */}
      <Header />

      {/* 2. Integration Banner Card */}
      <IntegrationBanner />

      {/* 3. Interactive ROI Calculator */}
      <RoiCalculator />

      {/* 4. Lead Capture & Live Demo Form */}
      <LeadForm />

      {/* 5. Comprehensive Light Blue Footer */}
      <Footer />
    </main>
  );
}
