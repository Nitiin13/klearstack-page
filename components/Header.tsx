"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, ArrowRight, Sparkles } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

export const Header: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 right-0 z-50 bg-[#eef5ff]/90 backdrop-blur-md py-4 border-b border-blue-100/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Container */}
          <a
            href="#"
            className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm hover:shadow transition-shadow"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
              ✦
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Klear<span className="text-blue-600">Stack</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs text-slate-700">
            <button
              onClick={() => scrollToSection("lead-form")}
              className="px-3 py-1.5 rounded-full hover:text-blue-600 hover:bg-white/60 transition-colors flex items-center gap-1"
            >
              Product <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 ${
                  isMegaMenuOpen ? "text-blue-600 font-semibold bg-white" : "hover:text-blue-600 hover:bg-white/60"
                }`}
              >
                Solutions <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isMegaMenuOpen && (
                <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
              )}
            </div>

            <button
              onClick={() => scrollToSection("lead-form")}
              className="px-3 py-1.5 rounded-full hover:text-blue-600 hover:bg-white/60 transition-colors flex items-center gap-1"
            >
              Industries <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => scrollToSection("calculator")}
              className="px-3 py-1.5 rounded-full hover:text-blue-600 hover:bg-white/60 transition-colors"
            >
              Pricing
            </button>

            <button
              onClick={() => scrollToSection("lead-form")}
              className="px-3 py-1.5 rounded-full hover:text-blue-600 hover:bg-white/60 transition-colors flex items-center gap-1"
            >
              Resources <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => scrollToSection("footer")}
              className="px-3 py-1.5 rounded-full hover:text-blue-600 hover:bg-white/60 transition-colors flex items-center gap-1"
            >
              Company <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            <button
              onClick={() => scrollToSection("lead-form")}
              className="btn-pill-outline px-4 py-2 flex items-center gap-1.5"
            >
              <span>Try it for Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollToSection("lead-form")}
              className="btn-pill-blue px-5 py-2 flex items-center gap-1.5"
            >
              <span>Get Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => scrollToSection("lead-form")}
              className="btn-pill-blue px-3 py-1.5 text-xs"
            >
              Get Demo
            </button>
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onNavigate={scrollToSection}
      />
    </header>
  );
};
