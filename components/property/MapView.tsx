"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import {
  MapPin,
  ShieldCheck,
  BedDouble,
  Bath,
  Maximize2,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MapViewProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (property: Property) => void;
  className?: string;
}

// Kolkata bounding box mapping for coordinates to SVG percentage
// Lat: ~22.50 to 22.65, Lng: ~88.30 to 88.54
const LAT_MIN = 22.49;
const LAT_MAX = 22.65;
const LNG_MIN = 22.30;
const LNG_MAX = 22.54;

function latLngToPercent(lat: number, lng: number): { x: number; y: number } {
  // Normalize lng to X (88.30 -> 10%, 88.54 -> 90%)
  const x = Math.max(8, Math.min(92, ((lng - 88.30) / (88.54 - 88.30)) * 84 + 8));
  // Normalize lat to Y (inverted: higher lat is top)
  const y = Math.max(10, Math.min(90, 100 - (((lat - 22.49) / (22.65 - 22.49)) * 80 + 10)));
  return { x, y };
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = "",
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePin, setActivePin] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || properties[0] || null
  );

  const handleMarkerClick = (prop: Property) => {
    setActivePin(prop);
    if (onSelectProperty) onSelectProperty(prop);
  };

  return (
    <div className={`relative w-full h-full min-h-[500px] bg-[#0F172A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col ${className}`}>
      {/* Top Map Header & Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-[#0B0F17]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg pointer-events-auto flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C5A880]" />
          <span className="text-xs font-semibold text-white">
            Kolkata Metropolitan Grid ({properties.length} Pins)
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="bg-[#0B0F17]/90 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg pointer-events-auto flex flex-col gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setActivePin(properties[0] || null);
            }}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-[#C5A880] flex items-center justify-center transition-colors"
            title="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center select-none">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative w-full h-full min-h-[500px]"
        >
          {/* Stylized Vector Map Background (Streets, Rivers, Greens) */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 700"
          >
            <defs>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0369A1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="parkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#065F46" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Hooghly River winding through Western Kolkata */}
            <path
              d="M 120 0 Q 140 180 180 320 T 150 520 T 190 700"
              fill="none"
              stroke="url(#waterGrad)"
              strokeWidth="48"
              strokeLinecap="round"
            />
            <path
              d="M 120 0 Q 140 180 180 320 T 150 520 T 190 700"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="6,6"
            />

            {/* Eco Park & East Kolkata Wetlands */}
            <ellipse cx="780" cy="220" rx="90" ry="65" fill="url(#parkGrad)" />
            <text x="740" y="225" fill="#34D399" fontSize="12" fontWeight="600" opacity="0.8">
              Eco Park
            </text>

            <ellipse cx="720" cy="460" rx="110" ry="75" fill="url(#parkGrad)" />
            <text x="650" y="465" fill="#34D399" fontSize="12" fontWeight="600" opacity="0.8">
              East Wetlands
            </text>

            {/* Rabindra Sarobar Lake (South Kolkata) */}
            <ellipse cx="380" cy="540" rx="55" ry="25" fill="url(#waterGrad)" />
            <text x="330" y="545" fill="#38BDF8" fontSize="11" fontWeight="500" opacity="0.8">
              Rabindra Sarobar
            </text>

            {/* Major Arterial Expressways */}
            {/* EM Bypass */}
            <path
              d="M 520 120 L 560 300 L 520 540 L 480 690"
              fill="none"
              stroke="#334155"
              strokeWidth="10"
            />
            <path
              d="M 520 120 L 560 300 L 520 540 L 480 690"
              fill="none"
              stroke="#C5A880"
              strokeWidth="1.5"
              strokeDasharray="8,8"
              opacity="0.6"
            />

            {/* Major Arterial Road New Town */}
            <path
              d="M 560 300 L 850 180"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />

            {/* Rajarhat Expressway */}
            <path
              d="M 850 180 L 890 80"
              fill="none"
              stroke="#334155"
              strokeWidth="6"
            />

            {/* Area Labels */}
            <text x="730" y="160" fill="#94A3B8" fontSize="14" fontWeight="bold" letterSpacing="1">
              NEW TOWN
            </text>
            <text x="820" y="80" fill="#94A3B8" fontSize="13" fontWeight="bold" letterSpacing="1">
              RAJARHAT
            </text>
            <text x="580" y="280" fill="#94A3B8" fontSize="14" fontWeight="bold" letterSpacing="1">
              SALT LAKE SEC V
            </text>
            <text x="240" y="510" fill="#94A3B8" fontSize="14" fontWeight="bold" letterSpacing="1">
              ALIPORE
            </text>
            <text x="380" y="490" fill="#94A3B8" fontSize="14" fontWeight="bold" letterSpacing="1">
              BALLYGUNGE
            </text>
            <text x="320" y="320" fill="#94A3B8" fontSize="13" fontWeight="bold" letterSpacing="1">
              PARK STREET
            </text>
            <text x="140" y="270" fill="#94A3B8" fontSize="13" fontWeight="bold" letterSpacing="1">
              HOWRAH
            </text>
          </svg>

          {/* Interactive Property Markers */}
          {properties.map((prop) => {
            const pos = latLngToPercent(prop.location.coordinates.lat, prop.location.coordinates.lng);
            const isSelected = activePin?.id === prop.id;

            return (
              <div
                key={prop.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  type="button"
                  onClick={() => handleMarkerClick(prop)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-xl active:scale-95 ${
                    isSelected
                      ? "bg-[#C5A880] text-slate-950 scale-110 ring-4 ring-[#C5A880]/30 z-20"
                      : "bg-[#0B0F17] hover:bg-slate-900 text-white hover:text-[#C5A880] border border-white/20 hover:scale-105"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950" : "text-[#C5A880]"}`} />
                  <span>{prop.priceFormatted}</span>

                  {/* Pulsing indicator if verified */}
                  {prop.verified && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Floating Active Property Preview Card */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            key={activePin.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 z-20 max-w-md mx-auto bg-[#0B0F17]/95 backdrop-blur-xl border border-white/15 text-white p-3.5 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <Image
                  src={activePin.images[0]}
                  alt={activePin.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-[#C5A880] font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{activePin.propertyType} • {activePin.location.neighborhood}</span>
                </div>

                <h4 className="text-sm font-bold text-white truncate leading-snug">
                  {activePin.title}
                </h4>

                <div className="text-base font-bold font-serif text-[#C5A880] mt-0.5">
                  {activePin.priceFormatted}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3 text-slate-400" />
                    {activePin.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3 text-slate-400" />
                    {activePin.bathrooms} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-slate-400" />
                    {activePin.carpetArea} sq ft
                  </span>
                </div>
              </div>

              <Link
                href={`/properties/${activePin.id}`}
                className="w-10 h-10 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all"
                title="View Full Details"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
