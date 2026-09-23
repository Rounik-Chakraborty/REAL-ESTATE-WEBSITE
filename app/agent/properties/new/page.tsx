"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import { MOCK_AGENTS } from "@/data/agents";
import {
  Property,
  Purpose,
  PropertyType,
  FurnishingStatus,
  FacingDirection,
  PropertyAge,
} from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Sparkles,
  Building,
  MapPin,
  Layers,
  Sparkle,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const LUXURY_PHOTO_PRESETS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
];

const ALL_AMENITIES = [
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
  "Tennis Court",
  "Private Cinema Lounge",
  "Concierge Desk",
];

export default function NewPropertyWizardPage() {
  const router = useRouter();
  const { addProperty, currentUser, showToast } = useNestora();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState("The Elysium Sky Suite");
  const [tagline, setTagline] = useState("Architectural masterwork in the heart of Kolkata");
  const [purpose, setPurpose] = useState<Purpose>("buy");
  const [propertyType, setPropertyType] = useState<PropertyType>("Apartment");
  const [price, setPrice] = useState<number>(14500000);
  const [reraId, setReraId] = useState("WBRERA/P/KOL/2026/009124");

  // Step 2: Location
  const [neighborhood, setNeighborhood] = useState("New Town");
  const [city, setCity] = useState("Kolkata");
  const [address, setAddress] = useState("Action Area II, Near Eco Space Hub");
  const [pincode, setPincode] = useState("700156");

  // Step 3: Specs
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [balconies, setBalconies] = useState(2);
  const [carpetArea, setCarpetArea] = useState(1650);
  const [superArea, setSuperArea] = useState(1950);
  const [floor, setFloor] = useState(18);
  const [totalFloors, setTotalFloors] = useState(26);
  const [parking, setParking] = useState(2);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>("Fully Furnished");
  const [facing, setFacing] = useState<FacingDirection>("North-East");
  const [propertyAge, setPropertyAge] = useState<PropertyAge>("New (0-1 yr)");
  const [possessionDate, setPossessionDate] = useState("Ready to Move");

  // Step 4: Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Swimming Pool",
    "Gym",
    "24/7 Security",
    "Covered Parking",
    "100% Power Backup",
    "High-speed Elevator",
    "Clubhouse",
    "Landscaped Garden",
    "CCTV Surveillance",
  ]);

  // Step 5: Images
  const [selectedImages, setSelectedImages] = useState<string[]>([
    LUXURY_PHOTO_PRESETS[0],
    LUXURY_PHOTO_PRESETS[1],
    LUXURY_PHOTO_PRESETS[2],
  ]);

  // Step 6: Description
  const [overview, setOverview] = useState(
    "An extraordinary residence featuring soaring 14ft ceilings, Italian Statuario marble floors, floor-to-ceiling soundproof acoustic glazing, and panoramic skyline vistas."
  );

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleImage = (url: string) => {
    setSelectedImages((prev) =>
      prev.includes(url) ? (prev.length > 1 ? prev.filter((u) => u !== url) : prev) : [...prev, url]
    );
  };

  const handleSubmit = () => {
    const newId = "prop-" + Date.now();
    const priceSqFt = Math.round(price / (superArea || 1));

    const newProp: Property = {
      id: newId,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline,
      price,
      priceFormatted: formatPrice(price, purpose),
      pricePerSqFt: priceSqFt,
      purpose,
      propertyType,
      location: {
        city,
        neighborhood,
        address,
        coordinates: { lat: 22.5868, lng: 88.4754 },
        pincode,
      },
      bedrooms,
      bathrooms,
      balconies,
      carpetArea,
      superArea,
      floor,
      totalFloors,
      parking,
      furnishing,
      facing,
      propertyAge,
      possessionDate,
      verified: true,
      featured: true,
      reraId,
      images: selectedImages,
      description: {
        overview,
        features: [
          "Imported Italian marble flooring throughout living areas",
          "Automated smart climate & circadian lighting system",
          "Private high-speed keycard elevator landing lobby",
          "Custom Italian modular kitchen with built-in culinary suite",
        ],
        neighborhood: `Located in the prime ${neighborhood} corridor with seamless access to international transit and corporate campuses.`,
        society: "Exclusive gated residence with 24/7 concierge, private club, and infinity sky deck.",
      },
      amenities: selectedAmenities,
      nearbyPlaces: [
        { name: "Nearest Metro Hub", type: "Metro", distance: "1.2 km" },
        { name: "Super Speciality Hospital", type: "Hospital", distance: "2.1 km" },
        { name: "International School", type: "School", distance: "800 m" },
      ],
      agent: MOCK_AGENTS[0],
      status: "active",
      viewsCount: 1,
      savesCount: 0,
      createdAt: new Date().toISOString(),
    };

    addProperty(newProp);
    router.push(`/properties/${newProp.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/15 text-[#9F7A48] text-xs font-bold uppercase tracking-wider border border-[#C5A880]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>6-Step Submission Workflow</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            List a Signature Residence
          </h1>
          <p className="text-xs text-slate-500">
            Submit your luxury property for instant verification and publication on NESTORA
          </p>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-6 gap-2">
            {[
              { num: 1, label: "Basic Info" },
              { num: 2, label: "Location" },
              { num: 3, label: "Specs" },
              { num: 4, label: "Amenities" },
              { num: 5, label: "Photos" },
              { num: 6, label: "Review" },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mx-auto transition-all ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-[#0B0F17] text-[#C5A880] ring-2 ring-[#C5A880]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] block mt-1 uppercase tracking-wider font-semibold truncate ${
                      isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          {/* STEP 1: BASIC INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 1: Basic Residence Information
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Architectural Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Transaction Purpose
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as Purpose)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="buy">For Sale (Acquisition)</option>
                      <option value="rent">For Rent (Lease)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Property Type
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Sky Penthouse</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Studio">Executive Studio</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Listing Price (INR ₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    />
                    <span className="text-[11px] text-[#9F7A48] font-bold mt-1 block">
                      Preview: {formatPrice(price, purpose)}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      RERA Registration No.
                    </label>
                    <input
                      type="text"
                      value={reraId}
                      onChange={(e) => setReraId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 2: Location & Address Details
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Prime Neighborhood
                    </label>
                    <select
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="New Town">New Town</option>
                      <option value="Alipore">Alipore</option>
                      <option value="Salt Lake">Salt Lake (Sector V)</option>
                      <option value="Ballygunge">Ballygunge</option>
                      <option value="Rajarhat">Rajarhat</option>
                      <option value="Howrah">Howrah Riverfront</option>
                      <option value="Park Street">Park Street</option>
                      <option value="EM Bypass">EM Bypass</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Street Address & Landmarks
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SPECIFICATIONS */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 3: Specifications & Dimensions
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Bedrooms (BHK)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Carpet Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Super Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={superArea}
                    onChange={(e) => setSuperArea(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Floor No. / Total
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={floor}
                      onChange={(e) => setFloor(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                      placeholder="Floor"
                    />
                    <input
                      type="number"
                      value={totalFloors}
                      onChange={(e) => setTotalFloors(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                      placeholder="Total"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Covered Parking
                  </label>
                  <input
                    type="number"
                    value={parking}
                    onChange={(e) => setParking(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Furnishing Status
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AMENITIES */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 4: Select Included Luxury Amenities
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ALL_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48]"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate">{amenity}</span>
                      {isChecked && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: PHOTOS */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 5: High-Resolution Architectural Photos
              </h3>

              <div className="p-6 rounded-2xl border-2 border-dashed border-[#C5A880] bg-[#C5A880]/5 text-center space-y-2">
                <Upload className="w-8 h-8 text-[#9F7A48] mx-auto" />
                <h4 className="font-bold text-xs text-slate-900">
                  Select Architectural Photography Presets
                </h4>
                <p className="text-[11px] text-slate-500">
                  Click on photos below to attach to this listing
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LUXURY_PHOTO_PRESETS.map((url, idx) => {
                  const isAttached = selectedImages.includes(url);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleImage(url)}
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                        isAttached ? "border-[#C5A880] scale-105 shadow-md" : "border-slate-200 opacity-60"
                      }`}
                    >
                      <Image src={url} alt="" fill sizes="200px" className="object-cover" />
                      {isAttached && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C5A880] text-slate-950 flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & PUBLISH */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b pb-3">
                Step 6: Review & Final Publication
              </h3>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F7A48]">
                      {propertyType} • {purpose === "rent" ? "For Rent" : "For Sale"}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                      {title}
                    </h2>
                    <p className="text-xs text-slate-500">{address}, {neighborhood}, {city}</p>
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">
                    {formatPrice(price, purpose)}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs py-3 border-y border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">{bedrooms} BHK</span>
                    <span className="text-[10px] text-slate-400">Bedrooms</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{bathrooms} Baths</span>
                    <span className="text-[10px] text-slate-400">Bathrooms</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{carpetArea} sq ft</span>
                    <span className="text-[10px] text-slate-400">Carpet</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{parking} Slots</span>
                    <span className="text-[10px] text-slate-400">Parking</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  <strong className="block text-slate-900 mb-1">Architectural Overview:</strong>
                  {overview}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Residence to Live Catalog</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
