"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/lead-schema";
import { CalendarBooking } from "./CalendarBooking";
import { ArrowRight, CheckCircle2, Loader2, Star, ShieldCheck } from "lucide-react";

const SOLUTION_OPTIONS = [
  "Invoice Automation",
  "KYC & ID Verification",
  "Bank Cheque Processing",
  "Bill of Lading / Trade Docs",
  "Financial Statements (P&L/Cashflow)",
];

const DOCUMENT_COUNT_OPTIONS = [
  "1 - 100 docs / month",
  "100 - 1,000 docs / month",
  "1,000 - 10,000 docs / month",
  "10,000+ docs / month",
];

export const LeadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      businessEmail: "",
      companyName: "KlearStack Customer",
      countryCode: "+91",
      phoneNumber: "",
      jobTitle: "Operations Director",
      monthlyVolume: "10,000 - 50,000 pages / mo",
      docTypes: ["Invoices & Bills"],
      useCase: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      setSubmittedLead(data);
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Form submit error:", err);
      setServerError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmittedLead(null);
    reset();
  };

  return (
    <section id="lead-form" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {submitSuccess && submittedLead ? (
        <CalendarBooking
          leadName={submittedLead.fullName}
          leadEmail={submittedLead.businessEmail}
          companyName={submittedLead.companyName}
          onReset={handleResetForm}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Hero Value Prop */}
          <div className="lg:col-span-6 hero-left-card p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                  ✦
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Klear<span className="text-blue-600">Stack</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  The Only Document AI With Fraud, Compliance, & Audit Checks Built In
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No templates. No setup calls. See your documents, processed live, right now.
                </p>
              </div>

              {/* Checkmark Bullet Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    99.5%* World Class Accuracy
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Proprietary AI For Ultimate Security
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Pilot Ready In Less than 7 Hours*
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Client Logos Row */}
            <div className="pt-6 border-t border-blue-200/60 space-y-3">
              <span className="text-xs font-bold text-slate-500 block">
                Used by Many, Loved by All
              </span>
              <div className="flex flex-wrap items-center gap-6 text-xs font-extrabold text-slate-700">
                <span className="tracking-tight uppercase">Landmark Group</span>
                <span className="tracking-tight text-blue-700">Network &gt;</span>
                <span className="tracking-tight uppercase">Eli Research</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Lead Form */}
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Bring your messiest documents. We'll process them live.
              </h2>
            </div>

            {serverError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Anti-bot Honeypot */}
              <input type="text" tabIndex={-1} className="hidden" {...register("honeypot")} />

              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full px-4 py-3 rounded-xl light-input text-sm"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className="text-[11px] text-red-500 mt-1 block">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Contact No */}
              <div>
                <input
                  type="tel"
                  placeholder="Contact No*"
                  className="w-full px-4 py-3 rounded-xl light-input text-sm"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <span className="text-[11px] text-red-500 mt-1 block">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Email ID */}
              <div>
                <input
                  type="email"
                  placeholder="Email ID*"
                  className="w-full px-4 py-3 rounded-xl light-input text-sm"
                  {...register("businessEmail")}
                />
                {errors.businessEmail && (
                  <span className="text-[11px] text-red-500 mt-1 block">
                    {errors.businessEmail.message}
                  </span>
                )}
              </div>

              {/* 2-Column Selects: Solution Required & No. of Documents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    className="w-full px-4 py-3 rounded-xl light-input text-sm bg-white cursor-pointer"
                    {...register("jobTitle")}
                  >
                    <option value="">Solution Required*</option>
                    {SOLUTION_OPTIONS.map((sol) => (
                      <option key={sol} value={sol}>
                        {sol}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    className="w-full px-4 py-3 rounded-xl light-input text-sm bg-white cursor-pointer"
                    {...register("monthlyVolume")}
                  >
                    <option value="">No. of Documents*</option>
                    {DOCUMENT_COUNT_OPTIONS.map((cnt) => (
                      <option key={cnt} value={cnt}>
                        {cnt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pain Point & Expectations */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Pain Point and Expectations (optional)"
                  className="w-full px-4 py-3 rounded-xl light-input text-sm"
                  {...register("useCase")}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-pill-blue py-3.5 px-6 text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Fetch Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Ratings & Security Footer */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-center">
              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-slate-700">
                {/* Google rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="font-bold text-slate-900">4.9 / 5.0</span>
                  <span className="text-red-500 font-bold ml-0.5">G</span>
                </div>

                {/* Trustpilot rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="font-bold text-slate-900">4.7 / 5</span>
                  <span className="text-emerald-600 font-bold ml-0.5">Trustpilot</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-medium">
                All your data is safe and secure with us!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
