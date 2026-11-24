"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/catalog";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChatWithPrompt: (promptText: string) => void;
  chatPrefilledPrompt: string | null;
  clearChatPrefill: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrefilledPrompt, setChatPrefilledPrompt] = useState<string | null>(null);

  // Load cart from session/local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("venus_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("venus_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const openChatWithPrompt = (promptText: string) => {
    setChatPrefilledPrompt(promptText);
    setIsChatOpen(true);
  };

  const clearChatPrefill = () => setChatPrefilledPrompt(null);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isChatOpen,
        setIsChatOpen,
        openChatWithPrompt,
        chatPrefilledPrompt,
        clearChatPrefill,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
