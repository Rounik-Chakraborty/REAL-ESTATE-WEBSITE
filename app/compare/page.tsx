"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNestora } from "@/context/NestoraContext";
import { calculateMortgageEMI, formatPrice, formatNumber } from "@/lib/utils";
import {
  Scale,
  X,
  Plus,
  ArrowRight,
  Check,
  Minus,
  Sparkles,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  Compass,
  Home,
} from "lucide-react";

export default function ComparePage() {
  const { properties, comparedIds, removeFromCompare, toggleCompare, clearCompare } = useNestora();
  const [pickerModalOpen, setPickerModalOpen] = useState(false);

  const comparedProperties = properties.filter((p) => comparedIds.includes(p.id));

  const allAmenities = Array.from(
    new Set(comparedProperties.flatMap((p) => p.amenities))
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
              <Scale className="w-4 h-4" />
              <span>Side-by-Side Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Compare Residences ({comparedProperties.length}/4)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {comparedProperties.length < 4 && (
              <button
                onClick={() => setPickerModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            )}

            {comparedProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-xs"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {comparedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-5 max-w-xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center mx-auto shadow-inner">
              <Scale className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                No properties in comparison table
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                Add up to 4 residences to analyze pricing per square foot, carpet dimensions, floor elevation, mortgage outlay, and luxury amenities side-by-side.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setPickerModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md"
              >
                Choose from Catalog
              </button>
              <Link
                href="/properties"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Table with Horizontal Scroll for Mobile */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75">
                    <th className="p-4 sm:p-6 w-1/4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/95 backdrop-blur-md z-10 border-r border-slate-100">
                      Property Overview
                    </th>
                    {comparedProperties.map((p) => (
                      <th key={p.id} className="p-4 sm:p-6 w-1/4 align-top relative">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="space-y-3 pr-6">
                          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                            <Image
                              src={p.images[0]}
                              alt={p.title}
                              fill
                              sizes="200px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <div className="text-xl font-bold font-serif text-slate-900 leading-tight">
                              {p.priceFormatted}
                            </div>
                            <h4 className="font-bold text-xs text-slate-800 mt-1 line-clamp-1">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              {p.location.neighborhood}, {p.location.city}
                            </p>
                          </div>

                          <Link
                            href={`/properties/${p.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9F7A48] hover:underline"
                          >
                            <span>View Full Listing</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </th>
                    ))}
                    {Array.from({ length: Math.max(0, 4 - comparedProperties.length) }).map(
                      (_, idx) => (
                        <th key={idx} className="p-6 w-1/4 align-middle text-center bg-slate-50/40 border-l border-slate-100">
                          <button
                            onClick={() => setPickerModalOpen(true)}
                            className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#C5A880] text-slate-400 hover:text-[#9F7A48] flex items-center justify-center mx-auto transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-2">
                            Add Residence
                          </span>
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Property Type
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-slate-800">
                        {p.propertyType}
                      </td>
                    ))}
                  </tr>

                  {/* Price per Sq Ft */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Price / Sq.Ft
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-[#9F7A48]">
                        ₹{p.pricePerSqFt.toLocaleString("en-IN")} / sq ft
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Bedrooms (BHK)
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold">
                        {p.bedrooms} BHK
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Bathrooms
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold">
                        {p.bathrooms} Baths
                      </td>
                    ))}
                  </tr>

                  {/* Carpet Area */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Carpet Area
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold">
                        {p.carpetArea} sq ft (Super: {p.superArea} sq ft)
                      </td>
                    ))}
                  </tr>

                  {/* Elevation & Floor */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Floor Elevation
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        Floor {p.floor} of {p.totalFloors}
                      </td>
                    ))}
                  </tr>

                  {/* Covered Parking */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Parking Slots
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        {p.parking} Covered Slots
                      </td>
                    ))}
                  </tr>

                  {/* Furnishing */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Furnishing
                    </td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        {p.furnishing}
                      </td>
                    ))}
                  </tr>

                  {/* Estimated EMI */}
                  <tr>
                    <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                      Est. Monthly EMI (8.5%)
                    </td>
                    {comparedProperties.map((p) => {
                      const emi = calculateMortgageEMI(p.price, 20, 8.5, 20);
                      return (
                        <td key={p.id} className="p-4 font-bold text-slate-900">
                          ₹{formatNumber(emi.monthlyEMI)} / mo
                        </td>
                      );
                    })}
                  </tr>

                  {/* Amenities Checklist Matrix */}
                  <tr className="bg-slate-100/60 font-bold text-slate-900">
                    <td
                      colSpan={comparedProperties.length + 1}
                      className="p-3 text-xs uppercase tracking-wider text-[#9F7A48]"
                    >
                      Luxury Amenities Matrix
                    </td>
                  </tr>

                  {allAmenities.map((amenity) => (
                    <tr key={amenity}>
                      <td className="p-4 font-medium text-slate-700 bg-slate-50 sticky left-0 z-10 border-r border-slate-100">
                        {amenity}
                      </td>
                      {comparedProperties.map((p) => {
                        const hasAmenity = p.amenities.includes(amenity);
                        return (
                          <td key={p.id} className="p-4">
                            {hasAmenity ? (
                              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                                <Check className="w-4 h-4" />
                                <span>Included</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Minus className="w-4 h-4" />
                                <span>—</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Property Picker Modal */}
      {pickerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Select Property to Compare
              </h3>
              <button
                onClick={() => setPickerModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {properties.map((p) => {
                const isSelected = comparedIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image src={p.images[0]} alt="" fill sizes="70px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{p.title}</h4>
                        <div className="text-[11px] text-[#9F7A48] font-bold">{p.priceFormatted}</div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {p.location.neighborhood} • {p.bedrooms} BHK • {p.carpetArea} sq ft
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        toggleCompare(p.id);
                        if (!isSelected && comparedIds.length >= 3) {
                          setPickerModalOpen(false);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                        isSelected
                          ? "bg-rose-50 text-rose-600 border border-rose-200"
                          : "bg-[#0B0F17] text-white hover:bg-slate-800 shadow-xs"
                      }`}
                    >
                      {isSelected ? "Remove" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
