"use client";

import React, { useState, useMemo } from "react";
import {
  calcRoi,
  DOC_TYPES,
  DocType,
  ModelType,
  TIER_MAP,
  RoiResult,
} from "@/lib/roi-calculator";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, HelpCircle, AlertTriangle } from "lucide-react";

export const RoiCalculator: React.FC = () => {
  const [docType, setDocType] = useState<DocType>("Bank Cheques");
  const [model, setModel] = useState<ModelType>("single");
  const [volume, setVolume] = useState<number>(36000);
  const [salary, setSalary] = useState<number>(30000);

  const result: RoiResult = useMemo(() => {
    return calcRoi(docType, model, volume, salary);
  }, [docType, model, volume, salary]);

  const currentTier = TIER_MAP[docType];
  const isTier3 = currentTier === "tier3";

  const scrollToForm = () => {
    const el = document.getElementById("lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="white-card p-6 sm:p-12 space-y-8">
        {/* Header & Model Toggle Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Calculate Your Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              See how much time and money you can save with KlearStack AI.
            </p>
          </div>

          {/* Model Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setModel("single")}
              className={`px-4 py-2 rounded-full transition-all ${
                model === "single"
                  ? "btn-pill-blue text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Single-Model Mode
            </button>
            <button
              onClick={() => setModel("multi")}
              disabled={isTier3}
              className={`px-4 py-2 rounded-full transition-all ${
                model === "multi"
                  ? "btn-pill-blue text-white shadow"
                  : isTier3
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Multi-Grid Model {isTier3 ? "(N/A)" : ""}
            </button>
          </div>
        </div>

        {/* Input Parameters Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-6">
          {/* Document Type Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              DOCUMENT TYPE
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as DocType)}
              className="w-full px-4 py-3 rounded-xl light-input text-sm font-semibold bg-white cursor-pointer"
            >
              {DOC_TYPES.map((dt) => (
                <option key={dt.name} value={dt.name}>
                  {dt.name} ({dt.tier.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Slider 1: Document Volume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <span>DOCUMENT VOLUME (PAGES)</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm">
                  {volume.toLocaleString()} pages
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Slider 2: Monthly Salary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  AVERAGE MONTHLY SALARY PER RESOURCE
                </label>
                <div className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm">
                  {formatCurrency(salary)}
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="2500"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Dynamic ROI Calculation Cards */}
        {result.state !== "Ready" ? (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
            <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
            <h4 className="font-bold text-amber-900 text-sm">{result.state}</h4>
            <p className="text-xs text-amber-700">
              {result.state === "Tier 3 supports Single only"
                ? "Tier 3 documents (Contract, P&L, Cashflow) require Single-Model Mode."
                : "Please enter valid volume and salary."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Net Monthly Savings */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                NET MONTHLY SAVINGS
              </span>
              <div className="text-3xl font-extrabold text-blue-600">
                {formatCurrency(result.netMonthlySavings)}
              </div>
              <span className="text-[11px] font-medium text-slate-400 block">
                COMPARED TO MANUAL LABOR
              </span>
            </div>

            {/* Annual Savings */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                ANNUAL SAVINGS
              </span>
              <div className="text-3xl font-extrabold text-blue-600">
                {formatCurrency(result.annualSavings)}
              </div>
              <span className="text-[11px] font-medium text-slate-400 block">
                TOTAL SAVED PER YEAR
              </span>
            </div>

            {/* Equivalent Resources */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                EQUIVALENT RESOURCES
              </span>
              <div className="text-3xl font-extrabold text-slate-900">
                {result.equivalentResources}
              </div>
              <span className="text-[11px] font-medium text-slate-400 block">
                PEOPLE REPLACED BY KLEARSTACK
              </span>
            </div>
          </div>
        )}

        {/* Disclaimer & Bottom CTA */}
        <div className="text-center space-y-4 pt-2">
          <p className="text-[11px] text-slate-400 font-medium">
            * 15% discount price in the Annual Plan.
          </p>

          <button
            onClick={scrollToForm}
            className="btn-pill-blue px-8 py-3.5 text-sm inline-flex items-center gap-2 shadow-lg"
          >
            <span>Automate your workflows with us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
