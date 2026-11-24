"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { useShop } from "@/context/ShopContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I am the Venus Assistant for Venus Electrical Trading Co in Chennai. How can I help you with wires, MCBs, switches, or electrical fittings today?",
    timestamp: "Just now",
  },
];

const SUGGESTIONS = [
  "Which wire for a 1.5 ton AC?",
  "What is the price of 2.5 mm² wire?",
  "Do you have 32A MCB double pole?",
  "Where is your shop located?",
];

export default function ChatWidget() {
  const { isChatOpen, setIsChatOpen, chatPrefilledPrompt, clearChatPrefill } = useShop();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle prefilled prompts from page buttons
  useEffect(() => {
    if (chatPrefilledPrompt) {
      handleSendMessage(chatPrefilledPrompt);
      clearChatPrefill();
    }
  }, [chatPrefilledPrompt]);

  // Desktop auto-open once
  useEffect(() => {
    if (typeof window !== "undefined" && !hasAutoOpened && window.innerWidth >= 1024) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        setHasAutoOpened(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened, setIsChatOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const payload = {
        messages: newHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I couldn't reach the assistant. You can call us or visit the shop.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I couldn't reach the assistant. You can call us directly or visit our shop at Thambu Chetty St, Chennai.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating launcher button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-3 bg-[#FFC400] text-[#142036] hover:bg-[#ffcf24] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#142036]/10"
          aria-label="Open Venus Assistant Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="font-bold text-sm tracking-wide hidden sm:inline-block pr-1">
            Ask Venus Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-label="Chat with Venus Assistant"
          className="fixed inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] h-[580px] max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#142036] text-white p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFC400] flex items-center justify-center text-[#142036]">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base leading-tight">Venus Assistant</h3>
                  <span className="bg-[#FFC400]/20 text-[#FFC400] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                    AI
                  </span>
                </div>
                <p className="text-xs text-gray-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Venus Electrical • Chennai
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]"
            aria-live="polite"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Electrician Safety Note:</strong> Wire sizing rules of thumb are advisory. A licensed electrician must verify all electrical loads.
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#142036] text-[#FFC400] flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#1C3FAA] text-white rounded-br-none"
                      : "bg-white text-gray-900 border border-gray-100 rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1C3FAA] flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-gray-500 text-xs py-1">
                <div className="w-7 h-7 rounded-full bg-[#142036] text-[#FFC400] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-3.5 py-2 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item)}
                className="whitespace-nowrap bg-gray-100 hover:bg-[#FFC400]/20 hover:text-[#142036] text-gray-700 text-xs px-2.5 py-1 rounded-full border border-gray-200 transition-colors flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3 h-3 text-[#FFC400]" />
                {item}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 focus-within:border-[#1C3FAA] focus-within:ring-2 focus-within:ring-[#1C3FAA]/20 transition-all">
              <input
                type="text"
                placeholder="Ask about wire sizes, MCBs, prices..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-[#FFC400] hover:bg-[#ffcf24] text-[#142036] p-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-gray-400 text-center mt-1.5">
              Powered by Google Gemini • Grounded on Venus Catalog
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
