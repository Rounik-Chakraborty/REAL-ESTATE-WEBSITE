"use client";

import React from "react";
import Link from "next/link";
import { useNestora } from "@/context/NestoraContext";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  Heart,
  Scale,
  Trash2,
  Share2,
  ArrowRight,
  Sparkles,
  Compass,
} from "lucide-react";

export default function SavedPropertiesPage() {
  const {
    properties,
    favorites,
    clearFavorites,
    recentlyViewed,
    showToast,
  } = useNestora();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));
  const recentProperties = properties.filter((p) => recentlyViewed.includes(p.id));

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Wishlist Shared", "Portfolio wishlist link copied to clipboard.", "success");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>Personal Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Saved Residences ({savedProperties.length})
            </h1>
          </div>

          {savedProperties.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWishlist}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Collection</span>
              </button>

              <Link
                href="/compare"
                className="px-4 py-2 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Scale className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Compare Saved</span>
              </Link>

              <button
                onClick={clearFavorites}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Clear all saved"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Saved List or Empty State */}
        {savedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-5 max-w-xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Your future home could be here.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                You haven&apos;t bookmarked any residences yet. Click the heart icon on any property card or detail page to curate your personal collection.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#C5A880]" />
              <span>Explore Verified Residences</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}

        {/* Recently Viewed Carousel */}
        {recentProperties.length > 0 && (
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Browsing History
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                  Recently Viewed by You
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProperties.slice(0, 3).map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
