"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import { Property, NearbyPlace } from "@/types";
import { EMICalculator } from "@/components/property/EMICalculator";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ScheduleVisitModal } from "@/components/property/ScheduleVisitModal";
import { EnquiryModal } from "@/components/property/EnquiryModal";
import {
  ShieldCheck,
  Heart,
  Scale,
  Calendar,
  Phone,
  MessageSquare,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  Compass,
  Layers,
  Sparkles,
  CheckCircle2,
  Train,
  Building2,
  GraduationCap,
  Utensils,
  ShoppingBag,
  Plane,
  Briefcase,
  Hospital,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PropertyDetailsClient({ id }: { id: string }) {
  const {
    properties,
    isFavorite,
    toggleFavorite,
    isCompared,
    toggleCompare,
    recordView,
    showToast,
  } = useNestora();

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "neighborhood" | "society">("overview");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);

  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    if (property) {
      recordView(property.id);
    }
  }, [property, recordView]);

  if (!property) {
    return notFound();
  }

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.location.neighborhood === property.location.neighborhood || p.propertyType === property.propertyType))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.priceFormatted} in ${property.location.neighborhood}, Kolkata`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied", "Property page URL copied to clipboard.", "success");
    }
  };

  const getNearbyIcon = (type: NearbyPlace["type"]) => {
    switch (type) {
      case "Metro":
        return <Train className="w-4 h-4 text-sky-500" />;
      case "Hospital":
        return <Hospital className="w-4 h-4 text-rose-500" />;
      case "School":
        return <GraduationCap className="w-4 h-4 text-amber-500" />;
      case "Restaurant":
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case "Shopping":
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case "Airport":
        return <Plane className="w-4 h-4 text-indigo-500" />;
      case "Tech Park":
        return <Briefcase className="w-4 h-4 text-emerald-500" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 md:pb-16">
      {/* Top Breadcrumbs & Page Action Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 md:top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 truncate">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-slate-900 transition-colors">
              Properties
            </Link>
            <span>/</span>
            <Link
              href={`/properties?location=${encodeURIComponent(property.location.neighborhood)}`}
              className="hover:text-slate-900 transition-colors"
            >
              {property.location.neighborhood}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate">{property.title}</span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => toggleCompare(property.id)}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                compared
                  ? "bg-[#C5A880]/15 text-[#9F7A48] border border-[#C5A880]/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{compared ? "Compared" : "Compare"}</span>
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                favorited
                  ? "bg-rose-50 text-rose-500 border border-rose-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{favorited ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {property.verified && (
                <span className="px-3 py-1 rounded-full bg-[#0F5132]/10 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Property & Sanctioned Plan
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                {property.propertyType}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#9F7A48] text-xs font-bold uppercase tracking-wider">
                {property.purpose === "rent" ? "For Rent" : "For Sale"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>
                {property.location.address}, {property.location.neighborhood}, {property.location.city} - {property.location.pincode}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-none">
              {property.priceFormatted}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              ₹{property.pricePerSqFt.toLocaleString("en-IN")}/sq ft • {property.possessionDate}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              RERA ID: {property.reraId}
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900">
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[520px]">
            <div
              onClick={() => setLightboxIndex(0)}
              className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1200px) 50vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {property.images.slice(1, 5).map((img, idx) => {
              const isLast = idx === 3;
              return (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="relative cursor-pointer group overflow-hidden"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />

                  {isLast && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-serif font-bold text-lg">
                      +{property.images.length - 5} More Photos
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="md:hidden relative aspect-[4/3] w-full">
            <Image
              src={property.images[mobileGalleryIndex] || property.images[0]}
              alt={property.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              onClick={() => setLightboxIndex(mobileGalleryIndex)}
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setMobileGalleryIndex(
                      (prev) => (prev - 1 + property.images.length) % property.images.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setMobileGalleryIndex((prev) => (prev + 1) % property.images.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-md">
                  {mobileGalleryIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all shadow-lg hidden md:flex"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View Gallery ({property.images.length} Photos)</span>
          </button>
        </div>

        {/* SPECIFICATIONS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <BedDouble className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">{property.bedrooms} BHK</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Bath className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">{property.bathrooms} Baths</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Bathrooms</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Maximize2 className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">{property.carpetArea} sq ft</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Carpet Area</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Layers className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">
              Floor {property.floor} of {property.totalFloors}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Elevation</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Car className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">{property.parking} Covered</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Parking</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Compass className="w-5 h-5 text-[#C5A880] mx-auto mb-1.5" />
            <div className="text-sm font-bold text-slate-900">{property.facing}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Facing</div>
          </div>
        </div>

        {/* DETAILS & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-100 pb-3">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "features", label: "Key Features" },
                  { id: "society", label: "Society & Architecture" },
                  { id: "neighborhood", label: "Neighborhood" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-[#0B0F17] text-[#C5A880] shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-slate-700 leading-relaxed text-sm">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Architectural Vision & Living Experience
                    </h3>
                    <p>{property.description.overview}</p>
                    <p className="text-xs text-slate-500 italic">
                      Furnishing Status: <strong className="text-slate-800">{property.furnishing}</strong> • Property Age: <strong className="text-slate-800">{property.propertyAge}</strong>
                    </p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Bespoke Specifications & Finishes
                    </h3>
                    <ul className="space-y-2.5">
                      {property.description.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "society" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Security, Hospitality & Management
                    </h3>
                    <p>{property.description.society}</p>
                  </div>
                )}

                {activeTab === "neighborhood" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Surroundings & Connectivity
                    </h3>
                    <p>{property.description.neighborhood}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Curated Luxury Amenities
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <div className="w-7 h-7 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#C5A880] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmarks */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Neighborhood & Landmark Distances
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Calculated via road grid</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearbyPlaces.map((poi, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
                        {getNearbyIcon(poi.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{poi.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase">{poi.type}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#9F7A48] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs shrink-0">
                      {poi.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator initialPrice={property.price} />
          </div>

          {/* Right Advisor Card */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Acquisition Pricing
                </span>
                <div className="text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {property.priceFormatted}
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                  ✓ Verified Clean Title Deed & Possession
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Schedule Private Viewing</span>
                </button>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Enquiry</span>
                </button>

                <a
                  href={`https://wa.me/${property.agent.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${property.agent.name}, I am interested in ${property.title} (${property.priceFormatted}) on Nestora.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-2xl border border-emerald-500/30 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-[#C5A880]">
                    <Image
                      src={property.agent.photo}
                      alt={property.agent.name}
                      fill
                      sizes="70px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {property.agent.name}
                      </h4>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-[#9F7A48] font-medium">{property.agent.title}</p>
                    <p className="text-[10px] text-slate-400">{property.agent.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-900 block">★ {property.agent.rating}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Rating ({property.agent.reviewsCount})</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{property.agent.responseTime}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Avg Response</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {property.agent.bio}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* SIMILAR PROPERTIES */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-slate-200/80 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
                Recommendations
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Similar Signature Residences
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 select-none">
            <div className="flex items-center justify-between text-white z-10">
              <span className="text-xs font-mono text-slate-400">
                {lightboxIndex + 1} / {property.images.length} • {property.title}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center">
              <Image
                src={property.images[lightboxIndex]}
                alt=""
                fill
                sizes="90vw"
                className="object-contain"
              />

              <button
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev! - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev! + 1) % property.images.length)
                }
                className="absolute right-2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    lightboxIndex === idx ? "border-[#C5A880] scale-110" : "border-white/20 opacity-50"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="70px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-lg font-serif font-bold text-slate-900 leading-none">
            {property.priceFormatted}
          </div>
          <div className="text-[10px] text-slate-500">
            {property.bedrooms} BHK • {property.carpetArea} sq ft
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs"
          >
            Enquire
          </button>
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0B0F17] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Tour</span>
          </button>
        </div>
      </div>

      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />

      <EnquiryModal
        property={property}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
}
