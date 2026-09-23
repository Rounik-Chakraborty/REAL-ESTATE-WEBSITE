"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import { FilterPanel } from "@/components/property/FilterPanel";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { AiSearchBar } from "@/components/search/AiSearchBar";
import {
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties, filterState, setFilterState, resetFilters } = useNestora();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync URL search params on mount or when query params change
  useEffect(() => {
    const purpose = searchParams.get("purpose");
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const maxPrice = searchParams.get("maxPrice");
    const beds = searchParams.get("beds");
    const amenities = searchParams.get("amenities");

    setFilterState((prev) => {
      const updated = { ...prev };
      if (purpose === "buy" || purpose === "rent") updated.purpose = purpose;
      if (location) updated.location = location;
      if (type) updated.propertyTypes = [type];
      if (maxPrice) updated.priceRange = [0, Number(maxPrice)];
      if (beds) updated.bedrooms = [Number(beds)];
      if (amenities) updated.amenities = amenities.split(",");
      return updated;
    });

    // Simulate luxury fast query loading
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [searchParams, setFilterState]);

  // Filter properties based on current filterState
  const filteredProperties = properties.filter((p) => {
    // 1. Search Query & AI text
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.neighborhood.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q);
      if (!match) return false;
    }

    // 2. Purpose (Buy vs Rent)
    if (filterState.purpose !== "all" && p.purpose !== filterState.purpose) {
      return false;
    }

    // 3. Location
    if (
      filterState.location !== "all" &&
      p.location.neighborhood.toLowerCase() !== filterState.location.toLowerCase()
    ) {
      return false;
    }

    // 4. Property Type
    if (
      filterState.propertyTypes.length > 0 &&
      !filterState.propertyTypes.includes(p.propertyType)
    ) {
      return false;
    }

    // 5. Bedrooms
    if (filterState.bedrooms.length > 0 && !filterState.bedrooms.includes(p.bedrooms)) {
      if (!(filterState.bedrooms.includes(5) && p.bedrooms >= 5)) {
        return false;
      }
    }

    // 6. Max Budget
    if (filterState.priceRange[1] < 100000000) {
      if (p.price > filterState.priceRange[1]) return false;
    }

    // 7. Furnishing
    if (
      filterState.furnishing.length > 0 &&
      !filterState.furnishing.includes(p.furnishing)
    ) {
      return false;
    }

    // 8. Verified Only
    if (filterState.verifiedOnly && !p.verified) {
      return false;
    }

    // 9. Amenities
    if (filterState.amenities.length > 0) {
      const hasAll = filterState.amenities.every((a) => p.amenities.includes(a));
      if (!hasAll) return false;
    }

    return true;
  });

  // Calculate active filter count for badge
  let activeFilterCount = 0;
  if (filterState.purpose !== "all") activeFilterCount++;
  if (filterState.location !== "all") activeFilterCount++;
  if (filterState.propertyTypes.length > 0) activeFilterCount += filterState.propertyTypes.length;
  if (filterState.bedrooms.length > 0) activeFilterCount += filterState.bedrooms.length;
  if (filterState.priceRange[1] < 100000000) activeFilterCount++;
  if (filterState.furnishing.length > 0) activeFilterCount += filterState.furnishing.length;
  if (filterState.verifiedOnly) activeFilterCount++;
  if (filterState.amenities.length > 0) activeFilterCount += filterState.amenities.length;

  const aiQueryParam = searchParams.get("ai_query");

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prime Real Estate Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                Discover Verified Residences
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Explore luxury apartments, duplexes, and private garden villas across Eastern India.
              </p>
            </div>

            {/* AI Search Bar on Discovery */}
            <div className="w-full md:w-auto md:min-w-[420px]">
              <AiSearchBar initialQuery={aiQueryParam || ""} />
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center flex-wrap gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-500">Active Filters:</span>

              {filterState.purpose !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#9F7A48] text-xs font-medium border border-[#C5A880]/30">
                  {filterState.purpose === "rent" ? "For Rent" : "For Sale"}
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, purpose: "all" }))}
                    className="hover:text-slate-950"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filterState.location !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-medium">
                  📍 {filterState.location}
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, location: "all" }))}
                    className="hover:text-slate-950"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filterState.propertyTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-medium"
                >
                  🏢 {type}
                  <button
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        propertyTypes: prev.propertyTypes.filter((t) => t !== type),
                      }))
                    }
                    className="hover:text-slate-950"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filterState.bedrooms.map((bed) => (
                <span
                  key={bed}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-medium"
                >
                  🛏️ {bed} BHK
                  <button
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        bedrooms: prev.bedrooms.filter((b) => b !== bed),
                      }))
                    }
                    className="hover:text-slate-950"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filterState.verifiedOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                  ✓ Verified Only
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, verifiedOnly: false }))}
                    className="hover:text-emerald-950"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-2"
              >
                Clear all ({activeFilterCount})
              </button>
            </div>
          )}
        </div>

        {/* Main Split Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar: Filters (4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24">
            <FilterPanel />
          </aside>

          {/* Right Results Grid (8 cols) */}
          <main className="lg:col-span-8">
            <PropertyGrid
              properties={filteredProperties}
              isLoading={isLoading}
              onOpenMobileFilter={() => setMobileFilterOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet / Modal */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl p-4 overflow-y-auto z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                  Filters ({activeFilterCount})
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-full"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterPanel onApplyMobile={() => setMobileFilterOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-400 text-sm">Loading residences catalog...</div>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
