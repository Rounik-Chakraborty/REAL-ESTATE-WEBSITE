"use client";

import React from "react";
import { useNestora } from "@/context/NestoraContext";
import {
  RotateCcw,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PropertyType, FurnishingStatus } from "@/types";

interface FilterPanelProps {
  onApplyMobile?: () => void;
}

const PROPERTY_TYPES: PropertyType[] = [
  "Apartment",
  "Penthouse",
  "Luxury Villa",
  "Duplex",
  "Studio",
];

const LOCATIONS = [
  "New Town",
  "Alipore",
  "Salt Lake",
  "Ballygunge",
  "Rajarhat",
  "Howrah",
  "Park Street",
  "EM Bypass",
];

const FURNISHING_OPTIONS: FurnishingStatus[] = [
  "Fully Furnished",
  "Semi Furnished",
  "Unfurnished",
];

const AMENITIES_LIST = [
  "Swimming Pool",
  "Gym",
  "24/7 Security",
  "Covered Parking",
  "100% Power Backup",
  "High-speed Elevator",
  "Clubhouse",
  "Landscaped Garden",
  "CCTV Surveillance",
  "EV Charging",
  "Spa & Sauna",
  "Children's Play Area",
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyMobile }) => {
  const { filterState, setFilterState, resetFilters } = useNestora();

  const handlePurposeChange = (purpose: "all" | "buy" | "rent") => {
    setFilterState((prev) => ({ ...prev, purpose }));
  };

  const handleLocationChange = (loc: string) => {
    setFilterState((prev) => ({ ...prev, location: loc }));
  };

  const togglePropertyType = (type: string) => {
    setFilterState((prev) => {
      const types = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: types };
    });
  };

  const toggleBedroom = (beds: number) => {
    setFilterState((prev) => {
      const list = prev.bedrooms.includes(beds)
        ? prev.bedrooms.filter((b) => b !== beds)
        : [...prev.bedrooms, beds];
      return { ...prev, bedrooms: list };
    });
  };

  const toggleFurnishing = (furn: string) => {
    setFilterState((prev) => {
      const list = prev.furnishing.includes(furn)
        ? prev.furnishing.filter((f) => f !== furn)
        : [...prev.furnishing, furn];
      return { ...prev, furnishing: list };
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFilterState((prev) => {
      const list = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: list };
    });
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          Refine Portfolio
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Purpose (Buy / Rent) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Transaction Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: "all", label: "All" },
            { id: "buy", label: "Buy" },
            { id: "rent", label: "Rent" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handlePurposeChange(item.id as "all" | "buy" | "rent")}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterState.purpose === item.id
                  ? "bg-[#0B0F17] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Prime Location
        </label>
        <select
          value={filterState.location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5A880]"
        >
          <option value="all">All Enclaves</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Bedrooms (BHK)
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = filterState.bedrooms.includes(num);
            return (
              <button
                key={num}
                onClick={() => toggleBedroom(num)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-[#C5A880] text-slate-950 border-[#C5A880] shadow-sm font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {num === 5 ? "5+" : `${num}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Types */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Property Type
        </label>
        <div className="space-y-1.5">
          {PROPERTY_TYPES.map((type) => {
            const isSelected = filterState.propertyTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => togglePropertyType(type)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48] font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{type}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Furnishing
        </label>
        <div className="space-y-1.5">
          {FURNISHING_OPTIONS.map((f) => {
            const isSelected = filterState.furnishing.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFurnishing(f)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48] font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{f}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-900">Verified Only</span>
          </div>
          <input
            type="checkbox"
            checked={filterState.verifiedOnly}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-[#C5A880] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Amenities Chips */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Luxury Amenities
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AMENITIES_LIST.map((amenity) => {
            const isSelected = filterState.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                  isSelected
                    ? "bg-[#0B0F17] text-[#C5A880] border-[#0B0F17] shadow-sm font-semibold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {isSelected ? "✓ " : ""}{amenity}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Apply Button */}
      {onApplyMobile && (
        <div className="pt-4 border-t border-slate-100 lg:hidden">
          <button
            onClick={onApplyMobile}
            className="w-full py-3 rounded-xl bg-[#C5A880] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
