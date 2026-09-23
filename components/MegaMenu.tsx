"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("capabilities");

  const leftTabs = [
    { id: "capabilities", label: "Capabilities" },
    { id: "features", label: "Features" },
    { id: "integration", label: "Integration" },
    { id: "doctypes", label: "Document Types" },
  ];

  const rightItems: Record<string, { label: string; highlight?: boolean }[]> = {
    capabilities: [
      { label: "Data Processing", highlight: true },
      { label: "Data Extraction" },
      { label: "Data Interpretation" },
      { label: "Straight Through Processing (STP)" },
    ],
    features: [
      { label: "Zero-Shot AI Fine-Tuning" },
      { label: "Fraud & Audit Protection" },
      { label: "Sub-Second Latency API" },
      { label: "Automated Reconciliation" },
    ],
    integration: [
      { label: "SAP S/4HANA & ECC" },
      { label: "Tally Prime & ERP 9" },
      { label: "QuickBooks Online" },
      { label: "Oracle NetSuite" },
    ],
    doctypes: [
      { label: "Invoices & Receipts" },
      { label: "Bank Cheques & Passbooks" },
      { label: "KYC & Identity Documents" },
      { label: "Bill of Lading & Logistics" },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-50 p-4"
    >
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sub-Menu Column */}
        <div className="col-span-5 space-y-1 bg-slate-50/80 p-2 rounded-2xl border border-slate-100">
          {leftTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isActive
                    ? "bg-blue-100/80 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Column */}
        <div className="col-span-7 p-2 flex flex-col justify-center space-y-2">
          {rightItems[activeTab]?.map((item, idx) => (
            <a
              key={idx}
              href="#lead-form"
              onClick={onClose}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all group ${
                item.highlight
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
