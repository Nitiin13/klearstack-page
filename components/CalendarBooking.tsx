"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Sparkles, ArrowLeft, RefreshCw, ExternalLink, HelpCircle } from "lucide-react";

interface CalendarBookingProps {
  leadName?: string;
  leadEmail?: string;
  companyName?: string;
  onReset?: () => void;
}

export const CalendarBooking: React.FC<CalendarBookingProps> = ({
  leadName = "Valued Guest",
  leadEmail = "",
  companyName,
  onReset,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Read environment variable or default fallback
  const calcomBaseUrl = process.env.BASE_CALCOM_LINK || "https://cal.com/demo";

  // Append lead metadata parameters to Cal.com API URL
  const queryParams = new URLSearchParams({
    name: leadName,
    email: leadEmail,
    notes: companyName ? `Company: ${companyName}` : "",
  });

  const embedUrl = `${calcomBaseUrl}?${queryParams.toString()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full white-card p-6 sm:p-8 space-y-6 shadow-xl"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Lead Received! Step 2 of 2: Cal.com Live Calendar
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Book Your 1-on-1 AI Architecture Demo
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Welcome <span className="font-bold text-blue-600">{leadName}</span>
            {companyName ? ` from ${companyName}` : ""}. Select a real-time slot below via Cal.com.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline px-3.5 py-1.5 flex items-center gap-1.5 text-xs"
          >
            <span>Open Cal.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Cal.com Live Iframe Embed Container */}
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 space-y-3 z-10">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xs font-bold text-slate-700">
              Loading Cal.com Scheduler...
            </span>
          </div>
        )}

        <iframe
          key={embedUrl}
          src={embedUrl}
          title="Cal.com Booking Calendar"
          className="w-full h-full border-0 rounded-2xl"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>



      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Cal.com integration auto-prefills your name & business email.</span>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Submit another lead</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
