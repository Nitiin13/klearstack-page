"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export const IntegrationBanner: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById("lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="blue-banner-card p-8 sm:p-12 text-center space-y-5 relative overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Already Using SAP, Tally Or QuickBooks?
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-500 tracking-tight">
            We Integrates With All!
          </h3>
        </div>

        <div className="pt-2">
          <button
            onClick={scrollToForm}
            className="btn-pill-blue px-7 py-3 text-sm inline-flex items-center gap-2 shadow-lg"
          >
            <span>Get A Free Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
