"use client";

import React from "react";
import { MapPin, Phone, Clock, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function StoreFooter() {
  const { openChatWithPrompt } = useShop();

  return (
    <footer className="w-full bg-[#142036] text-gray-300 pt-12 pb-6 border-t-4 border-[#FFC400]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Shop Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Col 1: Shop details */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white tracking-tight">
              Venus Electrical Trading Co. Chennai.
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Wholesale & retail supplier for all industrial and residential electrical installations. Serving electricians, builders and homeowners across Tamil Nadu since 1995.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Authorised Dealer for Top Brands</span>
            </div>
          </div>

          {/* Col 2: Store Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase text-white tracking-wider">
              Visit Our Shop
            </h4>
            <div className="text-xs space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span>
                  New No.305 / Old No.147, Thambu Chetty St,
                  <br />
                  opposite Karnataka Bank,
                  <br />
                  Chennai, Tamil Nadu 600001
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Thambu+Chetty+St+Chennai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#FFC400] hover:underline text-xs font-semibold pt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase text-white tracking-wider">
              Contact & Hours
            </h4>
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFC400]" />
                <a href="tel:+919840000000" className="hover:text-white">
                  +91 98400 00000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFC400]" />
                <span>sales@venuselectrical.example</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 9:30 AM – 8:00 PM</p>
                  <p className="text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Gemini AI Assistant Widget */}
          <div className="space-y-3 bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            <h4 className="font-bold text-sm uppercase text-[#FFC400] tracking-wider">
              Venus AI Assistant
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Need immediate wire load estimation or stock availability? Ask our Gemini assistant.
            </p>
            <button
              onClick={() => openChatWithPrompt("What brands of wire and MCB do you sell?")}
              className="w-full bg-[#FFC400] hover:bg-[#ffcf24] text-[#142036] text-xs font-extrabold py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ask a Question Now</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Venus Electrical Trading Co. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Vercel Deployment Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
