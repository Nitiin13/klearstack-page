"use client";

import React from "react";
import { DOC_TYPES } from "@/lib/roi-calculator";
import { CheckCircle2, ShieldAlert, Sparkles, Layers, FileText, Cpu, ShieldCheck } from "lucide-react";

export const DocTiersGrid: React.FC = () => {
  const tier1Docs = DOC_TYPES.filter((d) => d.tier === "tier1");
  const tier2Docs = DOC_TYPES.filter((d) => d.tier === "tier2");
  const tier3Docs = DOC_TYPES.filter((d) => d.tier === "tier3");

  return (
    <section id="solutions" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            Document Types & Model Pricing Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Supported Document Tiers
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            KlearStack AI categorizes document complexity into three pricing tiers with custom single and multi-document ML models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-6 hover:border-blue-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Tier 1 — Standard
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Standard Identity & Cheques</h3>
                <p className="text-xs text-slate-400 mt-1">
                  High-volume standard format documents with predictable field locations.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">Supported Types:</span>
                <div className="space-y-1.5">
                  {tier1Docs.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Allowed Models:</span>
                <span className="font-semibold text-emerald-400">Single & Multi</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fixed Annual Base:</span>
                <span className="font-semibold text-white">₹18,000 – ₹25,000</span>
              </div>
            </div>
          </div>

          {/* Tier 2 Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-6 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  Tier 2 — Commercial
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Trade & Invoices</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Multi-vendor invoice layouts, line-item tables, and shipping documents.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">Supported Types:</span>
                <div className="space-y-1.5">
                  {tier2Docs.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Allowed Models:</span>
                <span className="font-semibold text-emerald-400">Single & Multi</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fixed Annual Base:</span>
                <span className="font-semibold text-white">₹27,000 – ₹36,000</span>
              </div>
            </div>
          </div>

          {/* Tier 3 Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 space-y-6 hover:border-amber-500/60 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Tier 3 — High Complexity
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Contracts & Statements</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Dense multi-page legal contracts and unstructured balance sheets.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">Supported Types:</span>
                <div className="space-y-1.5">
                  {tier3Docs.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Allowed Models:</span>
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Single Model Only
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fixed Annual Base:</span>
                <span className="font-semibold text-white">₹54,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
