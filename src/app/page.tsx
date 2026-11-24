"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import StoreFooter from "@/components/StoreFooter";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCTS } from "@/lib/catalog";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCat =
        selectedCategory === "all" ||
        product.category.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(selectedCategory) ||
        (selectedCategory === "wires-cables" && product.category.includes("Wires")) ||
        (selectedCategory === "mcbs-db" && product.category.includes("MCB")) ||
        (selectedCategory === "switches-sockets" && product.category.includes("Switches")) ||
        (selectedCategory === "lighting" && product.category.includes("Lights")) ||
        (selectedCategory === "tools-safety" && product.category.includes("Tools"));

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.spec.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#FFC400] selection:text-[#142036]">
      {/* Header matching image banner & search */}
      <Header
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero section with prompt cards & value pillars */}
      <HeroSection />

      {/* Main product catalog, category icons & promo banners */}
      <div className="flex-1">
        <ProductCatalog
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />
      </div>

      {/* Store footer with address, timings & map link */}
      <StoreFooter />

      {/* Fixed Chatbot Widget with Gemini integration */}
      <ChatWidget />

      {/* Slide-out cart drawer with WhatsApp enquiry link */}
      <CartDrawer />
    </main>
  );
}
