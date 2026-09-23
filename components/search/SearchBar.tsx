"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, IndianRupee, BedDouble } from "lucide-react";
import { Purpose, PropertyType } from "@/types";

interface SearchBarProps {
  initialPurpose?: Purpose;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialPurpose = "buy",
  className = "",
}) => {
  const router = useRouter();
  const [purpose, setPurpose] = useState<Purpose>(initialPurpose);
  const [location, setLocation] = useState<string>("all");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (location !== "all") params.set("location", location);
    if (propertyType !== "all") params.set("type", propertyType);
    if (maxPrice !== "all") params.set("maxPrice", maxPrice);
    if (bedrooms !== "all") params.set("beds", bedrooms);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-5 text-slate-900 ${className}`}>
      {/* Purpose Tabs (Buy / Rent) */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setPurpose("buy")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            purpose === "buy"
              ? "bg-[#0B0F17] text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Buy Residences
        </button>
        <button
          type="button"
          onClick={() => setPurpose("rent")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            purpose === "rent"
              ? "bg-[#0B0F17] text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Luxury Rentals
        </button>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
        {/* Location */}
        <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Prime Areas</option>
            <option value="New Town">New Town</option>
            <option value="Alipore">Alipore</option>
            <option value="Salt Lake">Salt Lake (Sec V)</option>
            <option value="Ballygunge">Ballygunge</option>
            <option value="Rajarhat">Rajarhat</option>
            <option value="Howrah">Howrah Riverfront</option>
            <option value="Park Street">Park Street</option>
            <option value="EM Bypass">EM Bypass</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Home className="w-3 h-3 text-[#C5A880]" />
            Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Sky Penthouse</option>
            <option value="Luxury Villa">Private Villa</option>
            <option value="Duplex">Duplex</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-[#C5A880]" />
            Max Budget
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            {purpose === "buy" ? (
              <>
                <option value="all">Any Price</option>
                <option value="10000000">Under ₹1.0 Cr</option>
                <option value="20000000">Under ₹2.0 Cr</option>
                <option value="35000000">Under ₹3.5 Cr</option>
                <option value="50000000">Under ₹5.0 Cr</option>
                <option value="100000000">₹5.0 Cr+</option>
              </>
            ) : (
              <>
                <option value="all">Any Rent</option>
                <option value="50000">Under ₹50,000/mo</option>
                <option value="100000">Under ₹1.0 L/mo</option>
                <option value="200000">Under ₹2.0 L/mo</option>
                <option value="300000">₹2.0 L+/mo</option>
              </>
            )}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <BedDouble className="w-3 h-3 text-[#C5A880]" />
            Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5+ BHK</option>
          </select>
        </div>

        {/* Search Submit Button */}
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="w-full h-full min-h-[46px] bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
