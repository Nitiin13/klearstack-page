"use client";

import React from "react";
import { Mail, Phone, Twitter, Linkedin, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gradient-to-b from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] text-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none opacity-10 font-black text-7xl sm:text-9xl text-slate-900 tracking-tighter uppercase select-none">
        KlearStack AI
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-blue-300/60">
          <div className="lg:col-span-6 space-y-4">
            {/* Logo */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
              <div className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-[10px]">
                ✦
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Klear<span className="text-blue-600">Stack</span>
              </span>
            </div>

            <p className="text-xs text-slate-700 max-w-md leading-relaxed font-medium">
              Shift supply chain and loan compliance from bottleneck to AI-enabled confidence and operational excellence.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Header Links */}
          <div className="lg:col-span-6 space-y-3 lg:text-right">
            <div className="flex flex-wrap lg:justify-end gap-4 text-xs font-bold text-slate-800">
              <a href="#lead-form" className="hover:text-blue-700">How it works?</a>
              <span>|</span>
              <a href="#calculator" className="hover:text-blue-700">Check All Document Types</a>
              <span>|</span>
              <a href="#calculator" className="hover:text-blue-700">Pricing</a>
              <span>|</span>
              <a href="#lead-form" className="hover:text-blue-700">Integrations</a>
            </div>

            <div className="flex flex-wrap lg:justify-end gap-4 text-[11px] text-slate-600 font-semibold pt-1">
              <span>Accounts Payable</span>
              <span>Supply Chain</span>
              <span>Consumer Loans</span>
              <span>ID Card</span>
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-xs pt-2">
          {/* Col 1: Industries */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Industries</h4>
            <ul className="space-y-2 font-medium text-slate-700">
              <li><span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] inline-block shadow-sm">BFSI</span></li>
              <li><a href="#" className="hover:text-blue-800">Healthcare</a></li>
              <li><a href="#" className="hover:text-blue-800">Telecom</a></li>
              <li><a href="#" className="hover:text-blue-800">Manufacturing</a></li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2 font-medium text-slate-700">
              <li><a href="#" className="hover:text-blue-800">Blog</a></li>
              <li><a href="#" className="hover:text-blue-800">Guides</a></li>
              <li><a href="#" className="hover:text-blue-800">Newsletters</a></li>
              <li><a href="#" className="hover:text-blue-800">API Documentation</a></li>
              <li><a href="#" className="hover:text-blue-800">Product Documentation</a></li>
            </ul>
          </div>

          {/* Col 3: Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Tools</h4>
            <ul className="space-y-2 font-medium text-slate-700">
              <li><a href="#" className="hover:text-blue-800">Compress PDF</a></li>
              <li><a href="#" className="hover:text-blue-800">Merge PDF</a></li>
              <li><a href="#" className="hover:text-blue-800">PDF to Image</a></li>
            </ul>
          </div>

          {/* Col 4: Capabilities */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Capabilities</h4>
            <ul className="space-y-2 font-medium text-slate-700">
              <li><a href="#" className="hover:text-blue-800">Document Processing</a></li>
              <li><a href="#" className="hover:text-blue-800">Document Interpretation</a></li>
              <li><a href="#" className="hover:text-blue-800">Document Extraction</a></li>
              <li><a href="#" className="hover:text-blue-800">Straight Through Protocol (STP)</a></li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 font-medium text-slate-700">
              <li><a href="#" className="hover:text-blue-800">About</a></li>
              <li><a href="#" className="hover:text-blue-800">Contact</a></li>
              <li><a href="#" className="hover:text-blue-800">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <span className="font-extrabold text-sm text-slate-900">
            Our Newsletter on Latest Trends
          </span>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="Enter your E-mail address"
              className="px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs w-full sm:w-72 focus:outline-none focus:border-blue-600"
            />
            <button className="btn-pill-blue px-5 py-2.5 text-xs flex items-center gap-1.5 shrink-0">
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Address Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
          <div className="space-y-1">
            <span className="font-extrabold text-slate-900 block">India | Lorem Ipsum</span>
            <p className="text-slate-700 text-[11px]">
              City Tower, Sixth Floor, 17, Boat Club Road, Pune, India
            </p>
            <div className="flex items-center gap-4 text-[11px] text-blue-800 pt-1 font-semibold">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 84228 84500</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> sales@loremipsum.com</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-extrabold text-slate-900 block">USA | Lorem Ipsum</span>
            <p className="text-slate-700 text-[11px]">
              Lorem Ipsum, Inc, 371 Hoes Lane, Suite 200, Piscataway, NJ 08854, USA
            </p>
            <div className="flex items-center gap-4 text-[11px] text-blue-800 pt-1 font-semibold">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +1 (732) 791-9875</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> sales@loremipsum.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-blue-300/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-semibold text-slate-700 gap-2">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-900">Privacy Policy</a>
            <a href="#" className="hover:text-blue-900">Terms & Conditions</a>
            <a href="#" className="hover:text-blue-900">Cookie Policy</a>
            <a href="#" className="hover:text-blue-900">DPA</a>
          </div>
          <span>© KlearStack 2026</span>
        </div>
      </div>
    </footer>
  );
};
