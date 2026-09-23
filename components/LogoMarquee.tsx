"use client";

import React from "react";
import { ShieldCheck, FileCheck, Award, Lock, Zap, Cpu, CheckCircle2 } from "lucide-react";

const TRUST_LOGOS = [
  { name: "Global Financial Corp", icon: ShieldCheck, label: "Banking & Finance" },
  { name: "LogiTrans International", icon: FileCheck, label: "Supply Chain & Logistics" },
  { name: "Apex Health System", icon: Award, label: "Healthcare Claims" },
  { name: "Enterprise Insurance Co", icon: Lock, label: "Insurance Underwriting" },
  { name: "Nexus Manufacturing", icon: Cpu, label: "Automotive & Manufacturing" },
  { name: "Quantum Retail Ops", icon: Zap, label: "E-Commerce & Trade" },
  { name: "Fortress BPO Services", icon: CheckCircle2, label: "Shared Services BPO" },
];

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full py-6 bg-slate-950/40 border-y border-slate-800/60 overflow-hidden relative marquee-container">
      {/* Gradient Fades for Smooth Edge Transitions */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080c14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080c14] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee marquee-content gap-8 items-center">
        {/* Double the list for seamless continuous loop */}
        {[...TRUST_LOGOS, ...TRUST_LOGOS].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-colors group cursor-default"
            >
              <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-900/60 transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
