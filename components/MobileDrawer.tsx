"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Calculator,
  Sparkles,
  PhoneCall,
  Layers,
  Building2,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex justify-end">
          {/* Dark Semi-Transparent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
          />

          {/* Slide-In Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-[85%] max-w-sm h-full bg-[#eef5ff] border-l border-blue-200 z-[9999] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-5 border-b border-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-md">
                    ✦
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-slate-900">
                    Klear<span className="text-blue-600">Stack</span>
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 space-y-2 text-xs font-semibold">
                <button
                  onClick={() => onNavigate("lead-form")}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Product Overview</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate("lead-form")}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span>Solutions & Capabilities</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate("lead-form")}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span>Industries (BFSI, Logistics)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate("calculator")}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <span>Interactive ROI Calculator</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate("footer")}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span>Resources & Company</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-blue-200 space-y-3">
              <button
                onClick={() => onNavigate("lead-form")}
                className="w-full btn-pill-outline py-3 px-4 text-xs flex items-center justify-center gap-2"
              >
                <span>Try it for Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate("lead-form")}
                className="w-full btn-pill-blue py-3 px-4 text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Get Free Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
};
