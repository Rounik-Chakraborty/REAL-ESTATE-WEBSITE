"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Sparkles,
  Award,
  Compass,
  CheckCircle2,
  ArrowRight,
  Heart,
  Globe,
} from "lucide-react";
import { MOCK_AGENTS } from "@/data/agents";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Editorial Hero */}
      <section className="relative bg-[#080B10] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
            alt="Nestora Heritage Architecture"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[#C5A880] text-xs font-bold uppercase tracking-[0.2em] border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Nestora Manifesto</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight">
            Find a place worth <br />
            <span className="italic gold-gradient-text font-normal">calling home.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Nestora was founded to bring architectural clarity, algorithmic precision, and uncompromising integrity to Eastern India&apos;s luxury real estate landscape.
          </p>
        </div>
      </section>

      {/* Brand Narrative & Editorial Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F7A48]">
              Our Foundation
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 leading-snug">
              Curating spaces that elevate the human spirit.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe a home is not merely square footage or an investment vehicle—it is the sanctuary where memories take shape, families flourish, and generational legacies are anchored.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic aggregators inundated with duplicate broker listings and unverified claims, every residence on Nestora is handpicked, legally audited, and presented with transparent architectural fidelity.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Living"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              The Four Pillars of Nestora
            </h3>
            <p className="text-xs text-slate-500">
              How we protect your capital, time, and privacy at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Architectural Pedigree
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Only homes meeting exceptional design standards, natural lighting, and sound structural craftsmanship are listed.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                100% Legal Title Audit
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete scrutiny of municipal approvals, RERA compliance, encumbrance certificates, and ownership chain.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Algorithmic Discovery
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Natural-language AI search and geospatial commute matching connect you to residences tailored to your lifestyle.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-serif font-bold text-base text-slate-900">
                Discrete Advisory
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Experienced portfolio directors conduct private viewings with institutional confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Agency Engineering Watermark */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B0F17] to-[#1E293B] text-white space-y-4 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            <Award className="w-4 h-4" />
            <span>Craftsmanship & Product Engineering</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Built as a Flagship Platform by CINIX
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            NESTORA was engineered by <strong>CINIX</strong> as a state-of-the-art demonstration of modern real-estate technology: combining Next.js App Router, TypeScript, tailored Tailwind luxury design tokens, Framer Motion micro-interactions, responsive mobile bottom-sheets, and localized Indian real estate financial modeling.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Senior Leadership & Advisory Board
            </h3>
            <p className="text-xs text-slate-500">
              Dedicated directors with over ₹1,200 Cr in historical real-estate advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_AGENTS.map((agent) => (
              <div key={agent.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-100">
                  <Image src={agent.photo} alt={agent.name} fill sizes="200px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{agent.name}</h4>
                  <p className="text-xs text-[#9F7A48] font-medium">{agent.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
