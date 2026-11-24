"use client";

import React from "react";
import {
  ShieldCheck,
  Headphones,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function HeroSection() {
  const { openChatWithPrompt } = useShop();

  const QUICK_PROMPTS = [
    {
      title: "AC Wire Sizing",
      text: "Which wire gauge is safe for a 1.5 ton inverter AC?",
      badge: "Popular",
    },
    {
      title: "Main DB Breakers",
      text: "What rating MCB and RCCB do I need for a 3-BHK home?",
      badge: "Safety",
    },
    {
      title: "FR Cable Pricing",
      text: "What is the price for Finolex 2.5 mm² 90m coil?",
      badge: "Pricing",
    },
  ];

  return (
    <div className="w-full bg-[#F4F6F9] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Promo (Matching layout of reference image hero) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFC400]/20 text-[#142036] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-[#FFC400] text-[#142036]" />
              Direct Authorised Distributor • Chennai
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#142036] tracking-tight leading-tight">
              INDUSTRIAL & RESIDENTIAL{" "}
              <span className="text-[#1C3FAA] underline decoration-[#FFC400] decoration-4 underline-offset-8">
                ELECTRICAL SUPPLIES
              </span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Authentic wires, MCBs, distribution boards, LED lighting and switchgear.
            </p>

            {/* Quick Action Prompt Cards (Opens chatbot directly) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFC400]" />
                Ask Venus Assistant (One-click answers):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {QUICK_PROMPTS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => openChatWithPrompt(q.text)}
                    className="text-left bg-white hover:bg-amber-50 p-3 rounded-xl border border-gray-200 hover:border-[#FFC400] shadow-sm transition-all group hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#142036] group-hover:text-[#1C3FAA]">
                        {q.title}
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-semibold">
                        {q.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      &quot;{q.text}&quot;
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Banner Card (Industrial Visual like in reference image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#142036]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Electrician working with safe power equipment"
                className="w-full h-80 object-cover opacity-85 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142036] via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-[#FFC400] text-[#142036] text-[10px] uppercase font-black px-2 py-0.5 rounded w-max mb-2">
                  Trade Counter
                </span>
                <h3 className="font-extrabold text-xl text-white">
                  Venus Electrical Trading Co.
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  New No.305 / Old No.147, Thambu Chetty St, opp. Karnataka Bank, Chennai 600001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars (matching reference layout below hero) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-300/60">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#142036] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#1C3FAA]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#142036]">100% Genuine ISI / BIS</h4>
              <p className="text-xs text-gray-500">Only verified brands & certified cables</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#142036] shrink-0">
              <Headphones className="w-6 h-6 text-[#1C3FAA]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#142036]">24/7 AI Chat Assistant</h4>
              <p className="text-xs text-gray-500">Instant wire sizing and catalog guidance</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#142036] shrink-0">
              <RotateCcw className="w-6 h-6 text-[#1C3FAA]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#142036]">Direct Shop Pickup & Delivery</h4>
              <p className="text-xs text-gray-500">Same-day dispatch across Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
