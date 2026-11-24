"use client";

import React, { useState } from "react";
import {
  Cable,
  ToggleLeft,
  ShieldAlert,
  Lightbulb,
  Fan,
  Cpu,
  Wrench,
  Layers,
  ChevronRight,
  ShoppingCart,
  Check,
  Star,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Product, CATEGORIES } from "@/lib/catalog";
import { useShop } from "@/context/ShopContext";

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
}

export default function ProductCatalog({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
}: ProductCatalogProps) {
  const { addToCart, openChatWithPrompt } = useShop();
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (p: Product) => {
    addToCart(p, 1);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cable":
        return <Cable className="w-6 h-6" />;
      case "ToggleLeft":
        return <ToggleLeft className="w-6 h-6" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6" />;
      case "Lightbulb":
        return <Lightbulb className="w-6 h-6" />;
      case "Fan":
        return <Fan className="w-6 h-6" />;
      case "Cpu":
        return <Cpu className="w-6 h-6" />;
      case "Wrench":
        return <Wrench className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* 1. Shop By Categories (Styled identically to the rounded icons grid in reference image) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#142036] tracking-tight">
              SHOP BY CATEGORIES
            </h2>
            <p className="text-xs text-gray-500">
              Browse standard residential and commercial electrical supplies
            </p>
          </div>
          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-bold text-[#1C3FAA] hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-[#FFC400] text-[#142036] border-[#FFC400] shadow-md font-bold scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#FFC400] hover:bg-amber-50/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isSelected ? "bg-white text-[#142036]" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-semibold leading-tight">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Middle Promo Banner (Manufacturers and Exporters banner in reference image) */}
      <section className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-md border border-amber-300">
        <div className="space-y-2 max-w-xl">
          <span className="bg-[#142036] text-[#FFC400] text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wider">
            Contractor & Bulk Orders
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#142036]">
            ELECTRICAL CONTRACTORS & BUILDERS
          </h3>
          <p className="text-xs sm:text-sm text-[#142036]/80 font-medium">
            Supplying turnkey projects, apartments, factories, and commercial installations with factory-sealed coils and certified switchgears.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              openChatWithPrompt(
                "I am a contractor and need a bulk quotation for wires and distribution boards."
              )
            }
            className="bg-[#142036] hover:bg-[#1f2d4d] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Get Project Quote</span>
            <ChevronRight className="w-4 h-4 text-[#FFC400]" />
          </button>
        </div>
      </section>

      {/* 3. Featured Products Grid (Identical card layout from reference image) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#142036] tracking-tight">
              FEATURED PRODUCTS
            </h2>
            <p className="text-xs text-gray-500">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Check our weekly featured high-demand items"}
            </p>
          </div>
          <span className="text-xs font-bold text-gray-400">
            {products.length} Items Available
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-semibold">No products found matching your search.</p>
            <button
              onClick={() => onSelectCategory("all")}
              className="mt-3 text-xs font-bold text-[#1C3FAA] underline"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isAdded = addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded shadow-sm ${
                          product.badge === "New"
                            ? "bg-amber-400 text-[#142036]"
                            : product.badge === "-50%"
                            ? "bg-red-500 text-white"
                            : "bg-[#1C3FAA] text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center relative p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                        <span className="font-semibold text-gray-500">{product.brand}</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {product.rating}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#142036] line-clamp-2 group-hover:text-[#1C3FAA] transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.spec}</p>
                    </div>

                    <div>
                      {/* Price row */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-black text-[#142036]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isAdded
                              ? "bg-green-600 text-white"
                              : "bg-[#FFC400] hover:bg-[#ffcf24] text-[#142036]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            openChatWithPrompt(
                              `Tell me more about ${product.name} (${product.spec}) and how to install it.`
                            )
                          }
                          className="w-full py-2 px-2 rounded-lg text-xs font-semibold border border-gray-300 hover:border-[#142036] text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1 transition-colors"
                          title="Ask Assistant about this product"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#1C3FAA]" />
                          <span>Ask AI</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Bottom Double Promo Banner (matching reference bottom layout) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-[#142036] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold text-[#FFC400] uppercase tracking-wider">
              Heavy Duty
            </span>
            <h3 className="text-2xl font-black">POWER CABLES & WIRES</h3>
            <p className="text-xs text-gray-300 max-w-xs">
              Flame retardant multi-strand cables certified up to 1100V. Available in 90m and 180m rolls.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory("wires-cables")}
            className="mt-6 w-max bg-[#FFC400] hover:bg-[#ffcf24] text-[#142036] font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors z-10"
          >
            <span>Explore Cables</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-6 sm:p-8 border border-amber-200 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1C3FAA] uppercase tracking-wider">
              Switchgear Protection
            </span>
            <h3 className="text-2xl font-black text-[#142036]">SAFETY MCBs & RCCBs</h3>
            <p className="text-xs text-gray-600 max-w-xs">
              Ensure human shock and overload protection with Schneider, Legrand & L&T switchgear.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory("mcbs-db")}
            className="mt-6 w-max bg-[#142036] hover:bg-[#1f2d4d] text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>Explore Switchgears</span>
            <ChevronRight className="w-4 h-4 text-[#FFC400]" />
          </button>
        </div>
      </section>
    </div>
  );
}
