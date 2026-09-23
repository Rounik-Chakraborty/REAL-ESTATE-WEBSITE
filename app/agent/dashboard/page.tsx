"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNestora } from "@/context/NestoraContext";
import { Property, Enquiry } from "@/types";
import {
  Building,
  PlusCircle,
  TrendingUp,
  Eye,
  Users,
  MessageSquare,
  ShieldCheck,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Send,
  Sparkles,
} from "lucide-react";

export default function AgentDashboardPage() {
  const {
    properties,
    deleteProperty,
    togglePropertyStatus,
    enquiries,
    replyToEnquiry,
    currentUser,
  } = useNestora();

  const [activeTab, setActiveTab] = useState<"listings" | "leads" | "analytics">("listings");
  const [replyingEnquiry, setReplyingEnquiry] = useState<Enquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const totalViews = properties.reduce((acc, p) => acc + p.viewsCount, 0);
  const totalSaves = properties.reduce((acc, p) => acc + p.savesCount, 0);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingEnquiry || !replyText.trim()) return;

    replyToEnquiry(replyingEnquiry.id, replyText);
    setReplyingEnquiry(null);
    setReplyText("");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Agent Header */}
        <div className="bg-[#0B0F17] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C5A880] shadow-md">
              <Image
                src={currentUser.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                alt={currentUser.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Senior Advisor
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Nestora Prime Signature • License: WBRERA-ADV-89120
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/agent/properties/new"
              className="px-5 py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Property</span>
            </Link>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Active Portfolio</span>
              <Building className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-2">
              {properties.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              100% Verified Listings
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Total Impressions</span>
              <Eye className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-2">
              {totalViews.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              +14.2% from last week
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Client Inquiries</span>
              <MessageSquare className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-2">
              {enquiries.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              {enquiries.filter((e) => e.status === "pending").length} pending responses
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Buyer Bookmarks</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-2">
              {totalSaves.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Saved across portfolios
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: "listings", label: `Manage Listings (${properties.length})`, icon: Building },
            { id: "leads", label: `Buyer Lead Inbox (${enquiries.length})`, icon: MessageSquare },
            { id: "analytics", label: "Performance Analytics", icon: TrendingUp },
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

        {/* TAB 1: LISTINGS MANAGEMENT TABLE */}
        {activeTab === "listings" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Active Residential Inventory
              </h3>
              <Link
                href="/agent/properties/new"
                className="text-xs font-bold text-[#9F7A48] hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Residence</span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Type & Area</th>
                    <th className="py-3 px-4">Engagement</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                            <Image src={p.images[0]} alt="" fill sizes="50px" className="object-cover" />
                          </div>
                          <div>
                            <Link
                              href={`/properties/${p.id}`}
                              className="font-bold text-slate-900 hover:text-[#9F7A48] truncate block max-w-xs"
                            >
                              {p.title}
                            </Link>
                            <span className="text-[10px] text-slate-400">
                              {p.location.neighborhood}, {p.location.city}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {p.priceFormatted}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="block font-medium">{p.propertyType}</span>
                        <span className="text-[10px] text-slate-400">{p.carpetArea} sq ft</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            {p.viewsCount}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            {p.savesCount}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={p.status}
                          onChange={(e) =>
                            togglePropertyStatus(p.id, e.target.value as Property["status"])
                          }
                          className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-800 cursor-pointer focus:outline-none"
                        >
                          <option value="active">Active (Published)</option>
                          <option value="pending">Under Review</option>
                          <option value="under_offer">Under Offer</option>
                          <option value="sold">Acquired / Sold</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/properties/${p.id}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            title="View"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteProperty(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BUYER LEAD INBOX */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
                No buyer enquiries in inbox.
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{enq.userName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            enq.status === "replied"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {enq.status === "replied" ? "Replied" : "Pending Action"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {enq.email} • {enq.phone} • Preferred: {enq.preferredTime}
                      </p>
                    </div>

                    <div className="text-xs font-bold text-[#9F7A48]">
                      Re: {enq.propertyTitle} ({enq.propertyPrice})
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-700">
                    <strong className="block text-[10px] text-slate-400 uppercase mb-1">
                      Inquiry Message:
                    </strong>
                    {enq.message}
                  </div>

                  {enq.agentReply && (
                    <div className="p-3.5 bg-emerald-50 rounded-2xl text-xs text-emerald-900 border border-emerald-200/80">
                      <strong className="block text-[10px] text-emerald-700 uppercase mb-1">
                        Your Sent Reply:
                      </strong>
                      {enq.agentReply}
                    </div>
                  )}

                  {enq.status !== "replied" && (
                    <button
                      onClick={() => setReplyingEnquiry(enq)}
                      className="px-4 py-2 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Reply to Buyer</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: PERFORMANCE ANALYTICS CHARTS */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SVG Impressions Chart */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Weekly Portfolio Impressions
                  </h3>
                  <p className="text-xs text-slate-500">Total views across 16 listings</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  +18.4% WoW
                </span>
              </div>

              {/* Stylized SVG Chart */}
              <div className="pt-6">
                <svg className="w-full h-48" viewBox="0 0 500 180">
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C5A880" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C5A880" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="165" x2="500" y2="165" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Area fill */}
                  <path
                    d="M 0 140 Q 80 120 160 80 T 320 40 T 500 20 L 500 165 L 0 165 Z"
                    fill="url(#chartGrad)"
                  />

                  {/* Line */}
                  <path
                    d="M 0 140 Q 80 120 160 80 T 320 40 T 500 20"
                    fill="none"
                    stroke="#C5A880"
                    strokeWidth="3"
                  />

                  {/* Points */}
                  {[
                    { x: 0, y: 140 },
                    { x: 80, y: 120 },
                    { x: 160, y: 80 },
                    { x: 240, y: 65 },
                    { x: 320, y: 40 },
                    { x: 410, y: 30 },
                    { x: 500, y: 20 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="4.5"
                      fill="#0B0F17"
                      stroke="#C5A880"
                      strokeWidth="2.5"
                    />
                  ))}
                </svg>

                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Top Performing Residences */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Top Performing Residences
              </h3>

              <div className="space-y-3">
                {properties.slice(0, 4).map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono font-bold text-xs text-[#9F7A48]">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{p.title}</h4>
                        <div className="text-[10px] text-slate-400">{p.location.neighborhood}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900 block">{p.viewsCount} Views</span>
                      <span className="text-[10px] text-[#9F7A48] font-semibold">{p.savesCount} Wishlists</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Reply to {replyingEnquiry.userName}
            </h3>
            <p className="text-xs text-slate-500">
              Inquiry regarding <strong>{replyingEnquiry.propertyTitle}</strong>
            </p>

            <form onSubmit={handleSendReply} className="space-y-4">
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official advisor reply, brochure details, or invite for private viewing..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyingEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
