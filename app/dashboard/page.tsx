"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNestora } from "@/context/NestoraContext";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  User,
  Heart,
  Calendar,
  MessageSquare,
  History,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function UserDashboardPage() {
  const {
    currentUser,
    properties,
    favorites,
    visits,
    cancelVisit,
    enquiries,
    searchHistory,
    recentlyViewed,
  } = useNestora();

  const [activeTab, setActiveTab] = useState<"visits" | "enquiries" | "saved" | "history">("visits");

  const savedProperties = properties.filter((p) => favorites.includes(p.id));
  const recentProperties = properties.filter((p) => recentlyViewed.includes(p.id));
  const activeVisits = visits.filter((v) => v.status === "confirmed");

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Welcome Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#C5A880] text-slate-950 flex items-center justify-center font-bold text-2xl border-2 border-white shadow-md">
              {currentUser.avatar ? (
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#9F7A48] text-[10px] font-bold uppercase tracking-wider">
                  Verified Buyer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="px-4 py-2.5 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md active:scale-95"
            >
              Explore Residences
            </Link>
            <Link
              href="/explore"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all"
            >
              Map Search
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab("visits")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-[#C5A880] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Scheduled Visits
              </span>
              <Calendar className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
              {activeVisits.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              {activeVisits.length > 0 ? "Upcoming confirmed" : "No active tours"}
            </span>
          </div>

          <div
            onClick={() => setActiveTab("saved")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-[#C5A880] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Saved Wishlist
              </span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
              {savedProperties.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Curated residences
            </span>
          </div>

          <div
            onClick={() => setActiveTab("enquiries")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-[#C5A880] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Enquiries Sent
              </span>
              <MessageSquare className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
              {enquiries.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {enquiries.filter((e) => e.status === "replied").length} advisor replies
            </span>
          </div>

          <div
            onClick={() => setActiveTab("history")}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:border-[#C5A880] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Recently Viewed
              </span>
              <History className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-slate-900 mt-2">
              {recentProperties.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Recent properties
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: "visits", label: `Scheduled Visits (${visits.length})`, icon: Calendar },
            { id: "enquiries", label: `My Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: "saved", label: `Saved Portfolio (${savedProperties.length})`, icon: Heart },
            { id: "history", label: "Search & Activity", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0B0F17] text-[#C5A880] shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {/* TAB 1: VISITS */}
          {activeTab === "visits" && (
            <div className="space-y-4">
              {visits.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
                  No viewing appointments scheduled yet.
                </div>
              ) : (
                visits.map((vis) => (
                  <div
                    key={vis.id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={vis.propertyImage}
                          alt={vis.propertyTitle}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            {vis.ticketId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              vis.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {vis.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {vis.propertyTitle}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {vis.date} at {vis.timeSlot} • Format: <strong className="capitalize">{vis.visitType.replace("_", " ")}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Link
                        href={`/properties/${vis.propertyId}`}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        View Residence
                      </Link>
                      {vis.status === "confirmed" && (
                        <button
                          onClick={() => cancelVisit(vis.id)}
                          className="px-3.5 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors"
                        >
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              {enquiries.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
                  No enquiries dispatched yet.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              enq.status === "replied"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {enq.status === "replied" ? "Advisor Replied" : "Pending Callback"}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Sent {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mt-1">
                          {enq.propertyTitle} ({enq.propertyPrice})
                        </h4>
                      </div>

                      <Link
                        href={`/properties/${enq.propertyId}`}
                        className="text-xs font-semibold text-[#9F7A48] hover:underline flex items-center gap-1"
                      >
                        <span>Listing</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-700">
                      <strong className="block text-[10px] text-slate-400 uppercase mb-1">
                        Your Inquiry Message:
                      </strong>
                      {enq.message}
                    </div>

                    {enq.agentReply && (
                      <div className="p-4 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-2xl text-xs text-slate-900 space-y-1">
                        <strong className="text-[10px] text-[#9F7A48] uppercase tracking-wider flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Advisor Response:
                        </strong>
                        <p>{enq.agentReply}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SAVED WISHLIST */}
          {activeTab === "saved" && (
            <div>
              {savedProperties.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
                  No saved residences. Curate your wishlist from the catalog.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SEARCH & ACTIVITY */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Recent Natural Language Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, idx) => (
                    <Link
                      key={idx}
                      href={`/properties?ai_query=${encodeURIComponent(query)}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#C5A880] text-xs text-slate-700 hover:text-slate-900 flex items-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#C5A880]" />
                      <span>&ldquo;{query}&rdquo;</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Recently Viewed Catalog
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
