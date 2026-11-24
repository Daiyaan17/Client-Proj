"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useShop();

  if (!isCartOpen) return null;

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919840000000";

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let text = `*New Order Enquiry - Venus Electrical Trading Co*\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}*\n`;
      text += `   Spec: ${item.product.spec}\n`;
      text += `   Brand: ${item.product.brand}\n`;
      text += `   Qty: ${item.quantity} × ₹${item.product.price} = ₹${item.quantity * item.product.price}\n\n`;
    });

    text += `*Estimated Total: ₹${cartTotal}*\n\n`;
    text += `Customer Note: Please confirm item availability and delivery/pickup schedule.`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${whatsappPhone}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#142036] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FFC400]" />
              <h2 className="font-bold text-lg">Your Order Enquiry</h2>
              <span className="bg-[#FFC400] text-[#142036] font-bold text-xs px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4 stroke-1" />
                <p className="font-semibold text-lg text-gray-700">Your cart is empty</p>
                <p className="text-sm mt-1 max-w-xs text-gray-400">
                  Explore our electrical catalog and add wires, switches or breakers to request a quote.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 border-b border-gray-100 pb-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.product.spec}</p>
                    <p className="text-xs font-semibold text-[#1C3FAA] mt-0.5">
                      ₹{item.product.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-sm text-gray-800">
                    ₹{item.quantity * item.product.price}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subtotal Estimated</span>
                <span className="font-bold text-lg text-[#142036]">₹{cartTotal}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Direct enquiry model: Send your items directly to our Chennai sales desk via WhatsApp for instant stock confirmation and wholesale bulk discounts.
              </p>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <span>Send Enquiry on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-1"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
