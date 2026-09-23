"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { parseNaturalLanguageQuery, SAMPLE_AI_PROMPTS } from "@/lib/aiSearch";
import { formatPrice } from "@/lib/utils";

interface AiSearchBarProps {
  className?: string;
  initialQuery?: string;
}

export const AiSearchBar: React.FC<AiSearchBarProps> = ({
  className = "",
  initialQuery = "",
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const parsed = query.trim() ? parseNaturalLanguageQuery(query) : null;

  const handleExecuteSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const parsedData = parseNaturalLanguageQuery(searchQuery);
    const params = new URLSearchParams();
    params.set("ai_query", searchQuery);

    if (parsedData.purpose) params.set("purpose", parsedData.purpose);
    if (parsedData.location) params.set("location", parsedData.location);
    if (parsedData.propertyType) params.set("type", parsedData.propertyType);
    if (parsedData.bedrooms) params.set("beds", parsedData.bedrooms.toString());
    if (parsedData.maxPrice) params.set("maxPrice", parsedData.maxPrice.toString());
    if (parsedData.amenities.length > 0) params.set("amenities", parsedData.amenities.join(","));

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(query);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className={`relative bg-[#0B0F17]/90 backdrop-blur-xl border rounded-2xl p-2 sm:p-2.5 transition-all shadow-2xl ${
          isFocused
            ? "border-[#C5A880] ring-2 ring-[#C5A880]/20 shadow-[#C5A880]/10"
            : "border-white/15 hover:border-white/25"
        }`}
      >
        <div className="flex items-center gap-3 px-3 py-1.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C5A880] to-[#8C6228] flex items-center justify-center text-slate-950 shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask AI: e.g. 3 BHK under ₹1.5 crore near New Town with parking & pool..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none min-w-0"
          />

          <button
            type="submit"
            disabled={!query.trim()}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#C5A880] hover:bg-[#b5966c] disabled:opacity-40 disabled:hover:bg-[#C5A880] text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Search</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Search button */}
        <div className="sm:hidden pt-2 border-t border-white/5 px-2">
          <button
            type="submit"
            disabled={!query.trim()}
            className="w-full bg-[#C5A880] hover:bg-[#b5966c] disabled:opacity-40 text-slate-950 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search AI Results</span>
          </button>
        </div>

        {/* Real-Time Parsed Intelligence Chips */}
        {parsed && (parsed.location || parsed.bedrooms || parsed.maxPrice || parsed.propertyType || parsed.amenities.length > 0) && (
          <div className="mt-2 pt-2.5 border-t border-white/10 px-3 flex flex-wrap items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              Parsed Intent:
            </span>

            {parsed.purpose && (
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[#C5A880] text-[11px] font-medium border border-[#C5A880]/30">
                {parsed.purpose === "rent" ? "For Rent" : "For Sale"}
              </span>
            )}

            {parsed.location && (
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium border border-white/10">
                📍 {parsed.location}
              </span>
            )}

            {parsed.bedrooms && (
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium border border-white/10">
                🛏️ {parsed.bedrooms} BHK
              </span>
            )}

            {parsed.propertyType && (
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium border border-white/10">
                🏢 {parsed.propertyType}
              </span>
            )}

            {parsed.maxPrice && (
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[#C5A880] text-[11px] font-medium border border-[#C5A880]/30">
                💰 Max {formatPrice(parsed.maxPrice, parsed.purpose || "buy")}
              </span>
            )}

            {parsed.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-[11px] font-medium border border-white/10"
              >
                ✨ {amenity}
              </span>
            ))}
          </div>
        )}
      </form>

      {/* Suggested Prompts */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C5A880]" />
          Try asking:
        </span>
        {SAMPLE_AI_PROMPTS.slice(0, 3).map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(prompt);
              handleExecuteSearch(prompt);
            }}
            className="shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white transition-all flex items-center gap-1 group"
          >
            <span>&ldquo;{prompt}&rdquo;</span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#C5A880] transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
