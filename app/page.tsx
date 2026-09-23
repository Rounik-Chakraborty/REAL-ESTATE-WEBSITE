"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNestora } from "@/context/NestoraContext";
import { SearchBar } from "@/components/search/SearchBar";
import { AiSearchBar } from "@/components/search/AiSearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { EMICalculator } from "@/components/property/EMICalculator";
import { NEIGHBORHOODS } from "@/data/locations";
import { TESTIMONIALS } from "@/data/testimonials";
import { MOCK_AGENTS } from "@/data/agents";
import {
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Compass,
  Award,
  TrendingUp,
  MapPin,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { properties } = useNestora();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const featuredProperties = properties.filter((p) => {
    if (activeCategory === "all") return p.featured || p.verified;
    if (activeCategory === "penthouse") return p.propertyType === "Penthouse";
    if (activeCategory === "villa") return p.propertyType === "Luxury Villa";
    if (activeCategory === "duplex") return p.propertyType === "Duplex";
    if (activeCategory === "rent") return p.purpose === "rent";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          HERO SECTION: Cinematic luxury background with dual search (Classic & AI)
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-[#080B10]">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Nestora Luxury Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-40 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#080B10]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-10">
          {/* Verified Badge Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C5A880] text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Curated Luxury Real Estate • Eastern India</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Find a place worth <br className="hidden sm:inline" />
            <span className="italic gold-gradient-text font-normal">calling home.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover thoughtfully selected homes, apartments, and sky villas in the places you love.
          </motion.p>

          {/* AI Search Bar (Prominent natural language search) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 pb-4"
          >
            <AiSearchBar />
          </motion.div>

          {/* Classic Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-2"
          >
            <SearchBar />
          </motion.div>
        </div>

        {/* Floating Metrics Counter Bar */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">₹480+ Cr</div>
            <div className="text-[11px] uppercase tracking-wider text-[#C5A880] mt-0.5">
              Portfolio Listed
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-400 mt-0.5">
              Verified Legal Title
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">15 Mins</div>
            <div className="text-[11px] uppercase tracking-wider text-[#C5A880] mt-0.5">
              Concierge Callback
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">4.98 ★</div>
            <div className="text-[11px] uppercase tracking-wider text-amber-300 mt-0.5">
              Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROPERTIES SECTION
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Residences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              Explore Exceptional Properties
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Architecturally bespoke residences, penthouses with private decks, and gated villas in Kolkata&apos;s most sought-after enclaves.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: "all", label: "All Curated" },
              { id: "penthouse", label: "Sky Penthouses" },
              { id: "villa", label: "Luxury Villas" },
              { id: "duplex", label: "Duplexes" },
              { id: "rent", label: "Exclusive Rentals" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0B0F17] text-[#C5A880] shadow-md font-bold"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.slice(0, 6).map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            <span>View All {properties.length} Verified Residences</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          MAP DISCOVERY TEASER SPLIT SECTION
          ========================================================================= */}
      <section className="bg-[#0B0F17] text-white py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs font-semibold border border-[#C5A880]/30 uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" />
                <span>Geospatial Exploration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Search residences by neighborhood & commute.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Discover properties with interactive price markers across Kolkata&apos;s metro lines, tech corridors, and heritage enclaves. View distances to international schools, hospitals, and airports in real time.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive pins with instant preview cards & pricing</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time metro & transit corridor radius mapping</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Split screen synchronization between list and map</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Open Interactive Map Search</span>
                </Link>
              </div>
            </div>

            {/* Map Preview Teaser Card */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl p-2">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="Map exploration teaser"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Floating Mock Pins */}
                <div className="absolute top-1/4 left-1/3 bg-[#0B0F17] text-white px-3 py-1.5 rounded-full border border-[#C5A880] shadow-xl text-xs font-bold flex items-center gap-1 animate-bounce">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>₹1.25 Cr • New Town</span>
                </div>

                <div className="absolute top-1/2 left-2/3 bg-[#C5A880] text-slate-950 px-3 py-1.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-950" />
                  <span>₹4.85 Cr • Alipore</span>
                </div>

                <div className="absolute bottom-1/3 left-1/4 bg-[#0B0F17] text-white px-3 py-1.5 rounded-full border border-white/20 shadow-xl text-xs font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>₹2.40 Cr • Salt Lake</span>
                </div>

                {/* Bottom Overlay CTA */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Explore Kolkata Enclaves
                    </span>
                    <span className="text-[11px] text-slate-400">
                      16+ Verified Luxury Listings Plotted
                    </span>
                  </div>
                  <Link
                    href="/explore"
                    className="px-4 py-2 rounded-xl bg-[#C5A880] text-slate-950 font-bold text-xs"
                  >
                    Launch Map →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRIME NEIGHBORHOODS SPOTLIGHT
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
            Prime Localities
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Kolkata Enclave Spotlight
          </h2>
          <p className="text-sm text-slate-500">
            Explore capital appreciation, infrastructure connectivity, and lifestyle profiles of Eastern India&apos;s premier addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {NEIGHBORHOODS.map((loc) => (
            <Link
              key={loc.id}
              href={`/properties?location=${encodeURIComponent(loc.name)}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-end p-5 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 space-y-1 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
                  {loc.propertyCount} Residences
                </span>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C5A880] transition-colors">
                  {loc.name}
                </h3>
                <p className="text-[11px] text-slate-300 font-medium">
                  {loc.avgPricePerSqFt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MORTGAGE CALCULATOR EMBED
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <EMICalculator initialPrice={12500000} />
      </section>

      {/* =========================================================================
          WHY NESTORA & VERIFICATION GUARANTEE
          ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">
              The Nestora Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Why Discerning Buyers Choose Nestora
            </h2>
            <p className="text-sm text-slate-400">
              Unlike generic portals cluttered with unverified brokers, every property on Nestora undergoes stringent architectural and legal audit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                100% Verified Legal Dossier
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear title deeds, verified RERA sanction plans, zero encumbrances, and municipal completion certificates verified before listing.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Bespoke Private Viewings
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Schedule discrete in-person walkthroughs or live 4K drone-guided video tours with senior portfolio directors at your convenience.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Discreet Confidentiality
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Institutional-grade privacy protection for high-net-worth individuals, family offices, and executives during negotiation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED AGENTS SECTION
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
            Advisory Council
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Meet Our Senior Portfolio Advisors
          </h2>
          <p className="text-sm text-slate-500">
            Licensed luxury real estate directors with decades of combined transactional advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-3">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#C5A880]/30">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  {agent.verified && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0F5132]/90 backdrop-blur-md text-emerald-200 text-[10px] font-bold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {agent.name}
                  </h3>
                  <div className="text-xs text-[#9F7A48] font-medium">{agent.title}</div>
                  <div className="text-[11px] text-slate-400">{agent.company}</div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {agent.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">★ {agent.rating} ({agent.reviewsCount})</span>
                <span className="text-[11px] text-slate-400">{agent.activeListings} active listings</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS & SOCIAL PROOF
          ========================================================================= */}
      <section className="py-20 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
              Client Endorsements
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              Trusted by Discerning Homeowners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image src={test.avatar} alt={test.name} fill sizes="50px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">{test.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{test.role}, {test.company}</div>
                    <div className="text-[10px] text-[#9F7A48] font-medium mt-0.5 truncate">
                      Acquired: {test.propertyAcquired}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION BANNER: LIST PROPERTY OR CALL CONCIERGE
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B0F17] via-[#111827] to-[#1E293B] text-white p-8 sm:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A880] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Institutional Excellence</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Looking to list a prime residence or acquire an off-market estate?
            </h2>
            <p className="text-sm text-slate-300">
              Our bespoke desk represents high-net-worth sellers with cinematic media production, targeted private buyer syndication, and total privacy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/agent/properties/new"
              className="bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-bold text-xs sm:text-sm px-6 py-4 rounded-xl text-center transition-all shadow-lg active:scale-95"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-4 rounded-xl text-center transition-all"
            >
              Speak to Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
