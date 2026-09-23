"use client";

import React, { useState } from "react";
import { useNestora } from "@/context/NestoraContext";
import { MapView } from "@/components/property/MapView";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Property } from "@/types";
import {
  Compass,
  Map as MapIcon,
  List,
  SlidersHorizontal,
  Search,
  Sparkles,
} from "lucide-react";

export default function ExplorePage() {
  const { properties } = useNestora();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0] || null);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [filterPurpose, setFilterPurpose] = useState<"all" | "buy" | "rent">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter((p) => {
    if (filterPurpose !== "all" && p.purpose !== filterPurpose) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.neighborhood.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* Top Search & Filter Strip */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kolkata neighborhoods, penthouses..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Purpose filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: "all", label: "All" },
            { id: "buy", label: "Buy" },
            { id: "rent", label: "Rent" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterPurpose(item.id as "all" | "buy" | "rent")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterPurpose === item.id
                  ? "bg-[#0B0F17] text-[#C5A880] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile View Toggle Pill */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F17] text-[#C5A880] text-xs font-semibold shadow-md"
          >
            {mobileView === "map" ? (
              <>
                <List className="w-3.5 h-3.5" />
                <span>Show List ({filteredProperties.length})</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3.5 h-3.5" />
                <span>Show Map</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
        {/* Left: Scrollable Property List (5 cols) */}
        <div
          className={`lg:col-span-5 h-full overflow-y-auto p-4 sm:p-6 space-y-4 bg-white border-r border-slate-200/80 ${
            mobileView === "list" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-900 font-serif">
              {filteredProperties.length} Properties in Kolkata
            </span>
            <span className="text-[11px] text-[#9F7A48] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Hover or click marker to sync
            </span>
          </div>

          <div className="space-y-4">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                onMouseEnter={() => setSelectedProperty(prop)}
                className={`transition-all rounded-3xl ${
                  selectedProperty?.id === prop.id
                    ? "ring-2 ring-[#C5A880] shadow-md"
                    : ""
                }`}
              >
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Map Canvas (7 cols) */}
        <div
          className={`lg:col-span-7 h-full w-full relative p-2 sm:p-4 bg-slate-950 ${
            mobileView === "map" ? "block" : "hidden lg:block"
          }`}
        >
          <MapView
            properties={filteredProperties}
            selectedPropertyId={selectedProperty?.id}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        </div>
      </div>
    </div>
  );
}
