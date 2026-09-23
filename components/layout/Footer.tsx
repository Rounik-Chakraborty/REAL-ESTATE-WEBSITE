"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNestora } from "@/context/NestoraContext";
import { ArrowRight, Mail, Phone, MapPin, Check, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  const { showToast } = useNestora();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    setSubscribed(true);
    showToast("Subscribed", "You have joined the exclusive Nestora Private Ledger.", "success");
  };

  return (
    <footer className="bg-[#080B10] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C5A880] flex items-center justify-center font-serif font-bold text-slate-950 text-xl shadow-md">
                N
              </div>
              <span className="font-serif tracking-[0.25em] text-2xl font-bold text-white">
                NESTORA
              </span>
            </div>
            <p className="font-serif italic text-lg text-slate-300">
              &ldquo;Find a place worth calling home.&rdquo;
            </p>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              Nestora is Eastern India&apos;s foremost curated real estate platform. We bridge architectural
              pedigree, intelligent algorithmic search, and discreet concierge advisory to serve discerning
              homeowners and institutional investors.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center bg-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-2">
              Join the Private Ledger
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Receive confidential off-market acquisitions, private penthouses, and quarterly real estate intelligence.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#C5A880]/15 text-[#C5A880] rounded-xl text-xs font-medium border border-[#C5A880]/30">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the Nestora Private Ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-md active:scale-95"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider mb-4">Discover</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/properties?purpose=buy" className="hover:text-[#C5A880] transition-colors">
                  Buy Residences
                </Link>
              </li>
              <li>
                <Link href="/properties?purpose=rent" className="hover:text-[#C5A880] transition-colors">
                  Luxury Rentals
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#C5A880] transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#C5A880] transition-colors">
                  Compare Homes
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#C5A880] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider mb-4">Locations</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/properties?location=New+Town" className="hover:text-[#C5A880] transition-colors">
                  New Town Action Areas
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Alipore" className="hover:text-[#C5A880] transition-colors">
                  Alipore Royal Enclave
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Salt+Lake" className="hover:text-[#C5A880] transition-colors">
                  Salt Lake Sector V
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ballygunge" className="hover:text-[#C5A880] transition-colors">
                  Ballygunge & Southern Ave
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Rajarhat" className="hover:text-[#C5A880] transition-colors">
                  Rajarhat Green Villas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider mb-4">Portals</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard" className="hover:text-[#C5A880] transition-colors">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/agent/dashboard" className="hover:text-[#C5A880] transition-colors">
                  Agent CRM & Analytics
                </Link>
              </li>
              <li>
                <Link href="/agent/properties/new" className="hover:text-[#C5A880] transition-colors">
                  Submit Property (6-Step)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C5A880] transition-colors">
                  Admin Moderation
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#C5A880] transition-colors">
                  Authentication UI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-[#C5A880] transition-colors">
                  About Nestora
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
                  Private Concierge
                </Link>
              </li>
              <li>
                <a href="#press" className="hover:text-[#C5A880] transition-colors">
                  Press & Accolades
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#C5A880] transition-colors">
                  Advisory Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider mb-4">Headquarters</h5>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>One International Centre, Eco Park Boulevard, New Town, Kolkata 700156</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+91 98301 84920</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>WBRERA Registered Advisory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & CINIX Watermark */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NESTORA Luxury Real Estate. All rights reserved.</p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
            <span>Crafted for Flagship Portfolio Excellence by</span>
            <span className="font-bold text-[#C5A880] tracking-wider">CINIX</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              RERA Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
