"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { useNestora } from "@/context/NestoraContext";
import {
  Heart,
  Scale,
  Eye,
  ShieldCheck,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { QuickViewModal } from "./QuickViewModal";
import { ScheduleVisitModal } from "./ScheduleVisitModal";
import { EnquiryModal } from "./EnquiryModal";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  priority = false,
}) => {
  const { isFavorite, toggleFavorite, isCompared, toggleCompare } = useNestora();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <>
      <div className="luxury-card group rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col bg-white border border-slate-200/80 transition-all duration-300">
        {/* Top Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
          <Link href={`/properties/${property.id}`} className="block w-full h-full">
            <Image
              src={property.images[currentImageIndex] || property.images[0]}
              alt={property.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </Link>

          {/* Badges Top-Left */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
            {property.verified && (
              <span className="px-2.5 py-1 rounded-full bg-[#0F5132]/90 backdrop-blur-md text-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-400/30 shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-slate-100 text-[10px] font-semibold uppercase tracking-wider border border-white/10">
              {property.propertyType}
            </span>
          </div>

          {/* Actions Top-Right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 sm:group-hover:opacity-100 shadow-md"
              title="Quick Preview"
              aria-label="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(property.id);
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                compared
                  ? "bg-[#C5A880] text-slate-950"
                  : "bg-slate-950/60 hover:bg-slate-950/90 text-white opacity-0 sm:group-hover:opacity-100"
              }`}
              title={compared ? "Remove from comparison" : "Add to comparison"}
              aria-label="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                favorited
                  ? "bg-rose-500 text-white"
                  : "bg-slate-950/60 hover:bg-slate-950/90 text-white hover:text-rose-300"
              }`}
              title={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
              aria-label="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Carousel Arrows (Desktop Hover) */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
              {property.images.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    currentImageIndex === idx ? "w-4 bg-[#C5A880]" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Price & Status */}
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-none">
                {property.priceFormatted}
              </span>
              <span className="text-[11px] text-slate-400 font-medium shrink-0">
                ₹{property.pricePerSqFt.toLocaleString("en-IN")}/sq ft
              </span>
            </div>

            {/* Title */}
            <Link href={`/properties/${property.id}`} className="block group-hover:text-[#9F7A48] transition-colors">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-1">
                {property.title}
              </h3>
            </Link>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span className="truncate">
                {property.location.neighborhood}, {property.location.city}
              </span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-4 gap-2 pt-4 mt-3 border-t border-slate-100 text-slate-700">
            <div className="flex flex-col items-center text-center">
              <BedDouble className="w-4 h-4 text-[#C5A880] mb-0.5" />
              <span className="text-xs font-semibold">{property.bedrooms}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Beds</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Bath className="w-4 h-4 text-[#C5A880] mb-0.5" />
              <span className="text-xs font-semibold">{property.bathrooms}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Baths</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Maximize2 className="w-4 h-4 text-[#C5A880] mb-0.5" />
              <span className="text-xs font-semibold">{property.carpetArea}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">sq ft</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Car className="w-4 h-4 text-[#C5A880] mb-0.5" />
              <span className="text-xs font-semibold">{property.parking}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Parking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        property={property}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onOpenScheduleVisit={() => setScheduleModalOpen(true)}
        onOpenEnquiry={() => setEnquiryModalOpen(true)}
      />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        property={property}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
};
