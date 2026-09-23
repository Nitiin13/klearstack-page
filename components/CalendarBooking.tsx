"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, UserCheck, Sparkles, Video, ArrowLeft } from "lucide-react";

interface CalendarBookingProps {
  leadName?: string;
  leadEmail?: string;
  companyName?: string;
  onReset?: () => void;
}

const AVAILABLE_SLOTS = [
  { id: "slot-1", date: "Tomorrow", time: "10:30 AM EST", status: "available" },
  { id: "slot-2", date: "Tomorrow", time: "02:00 PM EST", status: "available" },
  { id: "slot-3", date: "Tomorrow", time: "04:30 PM EST", status: "available" },
  { id: "slot-4", date: "Friday", time: "11:00 AM EST", status: "available" },
  { id: "slot-5", date: "Friday", time: "03:00 PM EST", status: "available" },
];

export const CalendarBooking: React.FC<CalendarBookingProps> = ({
  leadName = "Valued Guest",
  leadEmail,
  companyName,
  onReset,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>("slot-1");
  const [isBooked, setIsBooked] = useState(false);

  const activeSlotObj = AVAILABLE_SLOTS.find((s) => s.id === selectedSlot);

  const handleConfirm = () => {
    setIsBooked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20"
    >
      {!isBooked ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Lead Received! Step 2 of 2: Pick Demo Time
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Schedule Your 1-on-1 AI Architecture Demo
            </h3>
            <p className="text-sm text-slate-300">
              Welcome <span className="font-semibold text-blue-400">{leadName}</span>
              {companyName ? ` from ${companyName}` : ""}. Select a slot for your live document extraction walk-through.
            </p>
          </div>

          {/* Cal.com style slot selector grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Slot List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Available Time Slots
              </span>
              <div className="space-y-2.5">
                {AVAILABLE_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                          : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{slot.date}</div>
                          <div className="text-xs text-slate-400">{slot.time}</div>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          isSelected
                            ? "bg-blue-500/30 text-blue-300 border border-blue-400/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Summary Card */}
            <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <Video className="w-4 h-4" />
                  <span>Interactive Live Session Details</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-y border-slate-800/80 py-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-white">30 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Format:</span>
                    <span className="font-semibold text-white">Google Meet / Zoom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host:</span>
                    <span className="font-semibold text-white">KlearStack AI Solutions Team</span>
                  </div>
                  {leadEmail && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Invite Sent To:</span>
                      <span className="font-semibold text-blue-300">{leadEmail}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/50">
                  <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    What you'll see in the demo:
                  </span>
                  <ul className="text-[11px] text-slate-400 mt-1.5 space-y-1 list-disc list-inside">
                    <li>Upload your custom sample document live</li>
                    <li>See straight-through processing accuracy</li>
                    <li>Tailored pricing breakdown for your volume</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={handleConfirm}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Confirm Demo Slot ({activeSlotObj?.date} @ {activeSlotObj?.time})
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmed State */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-5"
        >
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <UserCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-extrabold text-white">
              Demo Confirmed!
            </h3>
            <p className="text-sm text-slate-300">
              A calendar invitation for{" "}
              <span className="text-emerald-400 font-semibold">
                {activeSlotObj?.date} at {activeSlotObj?.time}
              </span>{" "}
              has been dispatched to <span className="text-white font-medium">{leadEmail || "your email"}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="font-semibold text-slate-200">Next Steps:</div>
            <div className="text-slate-400">
              1. Check your inbox for the calendar invite link.<br />
              2. Reply with sample documents if you want us to pre-load extraction models.<br />
              3. Try our live ROI calculator below in the meantime!
            </div>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Submit another request
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
