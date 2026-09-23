"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { useNestora } from "@/context/NestoraContext";
import {
  X,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  MapPin,
  ShieldCheck,
  Heart,
  Scale,
  Calendar,
  Phone,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenScheduleVisit: (property: Property) => void;
  onOpenEnquiry: (property: Property) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  property,
  isOpen,
  onClose,
  onOpenScheduleVisit,
  onOpenEnquiry,
}) => {
  const { isFavorite, toggleFavorite, isCompared, toggleCompare } = useNestora();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="md:w-1/2 relative bg-slate-950 flex flex-col justify-between min-h-[280px] md:min-h-[460px]">
            <div className="relative flex-1 w-full min-h-[220px]">
              <Image
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {property.verified && (
                  <span className="px-2.5 py-1 rounded-full bg-[#0F5132]/90 backdrop-blur-md text-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                  {property.propertyType}
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="p-3 bg-black/40 backdrop-blur-md flex items-center gap-2 overflow-x-auto no-scrollbar">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? "border-[#C5A880] scale-105" : "border-white/20 opacity-60"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="50px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Property Details & Actions */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 leading-tight">
                    {property.priceFormatted}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    ₹{property.pricePerSqFt.toLocaleString("en-IN")} / sq ft • {property.possessionDate}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`p-2.5 rounded-full border transition-all ${
                      favorited
                        ? "bg-rose-50 border-rose-200 text-rose-500"
                        : "border-slate-200 text-slate-500 hover:text-slate-900"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={() => toggleCompare(property.id)}
                    className={`p-2.5 rounded-full border transition-all ${
                      compared
                        ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48]"
                        : "border-slate-200 text-slate-500 hover:text-slate-900"
                    }`}
                    aria-label="Compare"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{property.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>
                    {property.location.neighborhood}, {property.location.city}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100">
                <div className="text-center p-2 rounded-xl bg-slate-50">
                  <BedDouble className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">{property.bedrooms}</div>
                  <div className="text-[10px] text-slate-400">Beds</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-slate-50">
                  <Bath className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">{property.bathrooms}</div>
                  <div className="text-[10px] text-slate-400">Baths</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-slate-50">
                  <Maximize2 className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">{property.carpetArea}</div>
                  <div className="text-[10px] text-slate-400">sq ft</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-slate-50">
                  <Car className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">{property.parking}</div>
                  <div className="text-[10px] text-slate-400">Parking</div>
                </div>
              </div>

              {/* Short Overview */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {property.description.overview}
              </p>

              {/* Amenities snippet */}
              <div className="flex flex-wrap gap-1.5">
                {property.amenities.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium"
                  >
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenScheduleVisit(property);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Schedule Visit</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquiry(property);
                  }}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Contact Agent</span>
                </button>
              </div>

              <Link
                href={`/properties/${property.id}`}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>View Full Property Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
