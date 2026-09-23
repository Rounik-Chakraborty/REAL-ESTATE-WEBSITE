"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNestora } from "@/context/NestoraContext";
import { MOCK_AGENTS } from "@/data/agents";
import {
  ShieldCheck,
  Building,
  Users,
  MessageSquare,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Award,
  Sparkles,
  Search,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { properties, togglePropertyStatus, showToast } = useNestora();
  const [agents, setAgents] = useState(MOCK_AGENTS);
  const [activeTab, setActiveTab] = useState<"moderation" | "agents" | "logs">("moderation");

  const toggleAgentVerification = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, verified: !a.verified } : a))
    );
    showToast("Agent Status Updated", "Verification badge status toggled.", "info");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-[#080B10] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 border-2 border-amber-500/40 flex items-center justify-center font-serif font-bold text-2xl shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold">CINIX Platform Administration</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                NESTORA Trust, Verification & Regulatory Compliance Oversight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-emerald-400 border border-emerald-400/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Registered Users
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-1">1,482</div>
            <span className="text-[11px] text-emerald-600 font-semibold">+84 this week</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Certified Agents
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-1">24</div>
            <span className="text-[11px] text-emerald-600 font-semibold">100% WBRERA Verified</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Active Inventory
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-1">
              {properties.length}
            </div>
            <span className="text-[11px] text-[#9F7A48] font-semibold">₹480+ Cr Value</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Conversion Rate
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 mt-1">14.8%</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Inquiry to Visit</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: "moderation", label: "Property Moderation Queue", icon: Building },
            { id: "agents", label: "Agent Verification", icon: ShieldCheck },
            { id: "logs", label: "Regulatory Audit Stream", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
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

        {/* TAB 1: PROPERTY MODERATION */}
        {activeTab === "moderation" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Listing Approval & Compliance Status
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">RERA Sanction</th>
                    <th className="py-3 px-4">Price & Area</th>
                    <th className="py-3 px-4">Listing Status</th>
                    <th className="py-3 px-4 text-right">Moderator Actions</th>
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

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                        {p.reraId}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{p.priceFormatted}</span>
                        <span className="text-[10px] text-slate-400">{p.carpetArea} sq ft</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            p.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {p.status !== "active" && (
                            <button
                              onClick={() => togglePropertyStatus(p.id, "active")}
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => togglePropertyStatus(p.id, "pending")}
                            className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 font-semibold text-[11px] hover:bg-slate-100 transition-colors"
                          >
                            Flag Review
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

        {/* TAB 2: AGENT VERIFICATION */}
        {activeTab === "agents" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#C5A880]">
                    <Image src={agent.photo} alt="" fill sizes="200px" className="object-cover" />
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-slate-900">{agent.name}</h4>
                    <p className="text-xs text-[#9F7A48] font-medium">{agent.title}</p>
                    <p className="text-[11px] text-slate-400">{agent.company}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
                    <div>Active Listings: <strong>{agent.activeListings}</strong></div>
                    <div>Rating: <strong>★ {agent.rating} ({agent.reviewsCount})</strong></div>
                  </div>
                </div>

                <button
                  onClick={() => toggleAgentVerification(agent.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    agent.verified
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-[#0B0F17] text-white hover:bg-slate-800"
                  }`}
                >
                  {agent.verified ? "✓ Verified Agent (Toggle)" : "Verify Agent Credentials"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REGULATORY AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              System Audit & Compliance Stream
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { time: "10 mins ago", event: "Legal title validation cleared for The Aurelia Residence (WBRERA/P/NOR/2023/000412)." },
                { time: "2 hours ago", event: "New agent onboarding credentials verified for Priya Sharma." },
                { time: "1 day ago", event: "Automated monthly RERA compliance sweep executed with 0 discrepancies." },
                { time: "3 days ago", event: "Encumbrance search certificates filed for Alipore and Ballygunge properties." },
              ].map((log, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-slate-800 font-medium">{log.event}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
