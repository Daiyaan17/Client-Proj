"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Menu,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { CATEGORIES } from "@/lib/catalog";

interface HeaderProps {
  onSearch: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export default function Header({
  onSearch,
  selectedCategory,
  onSelectCategory,
}: HeaderProps) {
  const { cartCount, cartTotal, setIsCartOpen, openChatWithPrompt } = useShop();
  const [searchValue, setSearchValue] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="bg-[#142036] text-gray-300 text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome to Venus Electrical Trading Co!</span>
            <span className="hidden sm:inline-block text-gray-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#FFC400]">
              <MapPin className="w-3.5 h-3.5" />
              Thambu Chetty St, Chennai
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919840000000"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>+91 98400 00000</span>
            </a>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => openChatWithPrompt("Where is the shop and what are your opening hours?")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Store Location & Hours
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Brand / Search / Cart */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center">
          <span className="font-bold text-xl sm:text-2xl text-[#142036] tracking-tight">
            Venus Electrical Trading Co. Chennai.
          </span>
        </div>

        {/* Central Search Bar (Mockup exact layout with dropdown + search input + yellow button) */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl mx-2 order-last md:order-none w-full md:w-auto"
        >
          <div className="flex items-center border-2 border-[#142036] rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Category Select Inside Search */}
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="bg-gray-50 text-xs font-semibold text-gray-700 px-3 py-3 border-r border-gray-300 focus:outline-none hidden sm:block max-w-[140px] truncate"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search wires, MCBs, switches, lights..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-[#FFC400] hover:bg-[#ffcf24] text-[#142036] font-bold px-6 py-2.5 text-sm flex items-center gap-1.5 transition-colors border-l border-[#142036]"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        {/* Support & Cart Badge */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:block text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Enquiry Helpline
            </span>
            <p className="text-sm font-bold text-[#142036]">+91 98400 00000</p>
          </div>

          {/* Cart Icon & Total */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors group relative"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#FFC400]/20 flex items-center justify-center text-[#142036] transition-colors">
                <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1C3FAA] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                My Order
              </span>
              <p className="text-xs font-bold text-[#142036]">₹{cartTotal}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Ribbon (Yellow All Departments Bar like reference image) */}
      <div className="bg-[#142036] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Yellow All Departments Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="bg-[#FFC400] text-[#142036] font-extrabold text-sm px-6 py-3.5 flex items-center gap-3 tracking-wide hover:bg-[#ffcf24] transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span>ALL DEPARTMENTS</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {/* Departments Mega Menu Dropdown */}
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-200 z-40 py-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-amber-50 hover:text-[#1C3FAA] transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-amber-50 text-[#1C3FAA] font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">({cat.count})</span>
                    </button>
                  ))}
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => {
                      onSelectCategory("all");
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-bold text-gray-200">
              <button
                onClick={() => onSelectCategory("all")}
                className="hover:text-[#FFC400] transition-colors py-3.5 border-b-2 border-transparent hover:border-[#FFC400]"
              >
                Home
              </button>
              <button
                onClick={() => onSelectCategory("wires-cables")}
                className="hover:text-[#FFC400] transition-colors py-3.5"
              >
                Wires & Cables
              </button>
              <button
                onClick={() => onSelectCategory("mcbs-db")}
                className="hover:text-[#FFC400] transition-colors py-3.5"
              >
                MCBs & Switchgear
              </button>
              <button
                onClick={() => onSelectCategory("switches-sockets")}
                className="hover:text-[#FFC400] transition-colors py-3.5"
              >
                Modular Switches
              </button>
              <button
                onClick={() => onSelectCategory("lighting")}
                className="hover:text-[#FFC400] transition-colors py-3.5"
              >
                Industrial Lights
              </button>
              <button
                onClick={() => openChatWithPrompt("Tell me about Venus Electrical shop location and contact info")}
                className="hover:text-[#FFC400] transition-colors py-3.5 text-[#FFC400] flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Assistant
              </button>
            </nav>
          </div>

          {/* Right side promo badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-300 font-semibold">
            <span>⚡ Wholesale Rates Available for Contractors & Electricians</span>
          </div>
        </div>
      </div>
    </header>
  );
}
