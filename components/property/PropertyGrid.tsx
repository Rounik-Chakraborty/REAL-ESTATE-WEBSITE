"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";
import { PropertySkeleton } from "./PropertySkeleton";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Home,
  RotateCcw,
} from "lucide-react";
import { useNestora } from "@/context/NestoraContext";

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onOpenMobileFilter?: () => void;
  activeFilterCount?: number;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  isLoading = false,
  onOpenMobileFilter,
  activeFilterCount = 0,
}) => {
  const { filterState, setFilterState, resetFilters } = useNestora();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sorting
  const sortedProperties = [...properties].sort((a, b) => {
    if (filterState.sortBy === "price_asc") return a.price - b.price;
    if (filterState.sortBy === "price_desc") return b.price - a.price;
    if (filterState.sortBy === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (filterState.sortBy === "most_viewed") return b.viewsCount - a.viewsCount;
    if (filterState.sortBy === "area_desc") return b.carpetArea - a.carpetArea;
    // recommended
    return b.savesCount * 2 + b.viewsCount - (a.savesCount * 2 + a.viewsCount);
  });

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Controls Bar (Results count, Mobile filter button, Sorting, View mode) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div>
            <span className="text-sm font-bold text-slate-900 font-serif">
              {properties.length} {properties.length === 1 ? "Residence" : "Residences"} Found
            </span>
            <span className="text-xs text-slate-400 block sm:inline sm:ml-2">
              Showing {paginatedProperties.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
              {Math.min(currentPage * itemsPerPage, properties.length)}
            </span>
          </div>

          {/* Mobile Filter Trigger Button */}
          {onOpenMobileFilter && (
            <button
              onClick={onOpenMobileFilter}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C5A880] text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sortBy: e.target.value as typeof filterState.sortBy,
                }))
              }
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="area_desc">Largest Area</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <PropertySkeleton key={idx} />
          ))}
        </div>
      ) : paginatedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm my-8">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center mx-auto">
            <Home className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold font-serif text-slate-900">
              No matching residences found
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find properties matching all your criteria. Try adjusting your budget,
              location filter, or resetting search filters.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-slate-800 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              : "grid grid-cols-1 gap-6"
          }
        >
          {paginatedProperties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white shadow-xs"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? "bg-[#0B0F17] text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white shadow-xs"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
