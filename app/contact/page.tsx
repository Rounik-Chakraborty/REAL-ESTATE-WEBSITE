"use client";

import React, { useState } from "react";
import { useNestora } from "@/context/NestoraContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const { showToast } = useNestora();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("New Town");
  const [budget, setBudget] = useState("₹1.5 Cr - ₹3.0 Cr");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Concierge Request Received", "A senior portfolio partner will connect within 15 minutes.", "success");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/15 text-[#9F7A48] text-xs font-bold uppercase tracking-wider border border-[#C5A880]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Advisory Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Connect with Private Concierge
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Whether you are acquiring a landmark sky villa, listing an estate, or seeking market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details & Offices (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Advisory Lines */}
            <div className="bg-[#0B0F17] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-xl text-white">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">General Inquiries & Bookings:</span>
                    <strong className="text-sm text-white font-mono">+91 98301 84920</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Confidential Advisory Email:</span>
                    <strong className="text-sm text-white">concierge@nestora.luxury</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Advisory Hours:</span>
                    <strong className="text-white">Monday - Sunday: 8:00 AM - 9:00 PM IST</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Advisory Lounges & Headquarters
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>One International Centre (Headquarters)</span>
                  </div>
                  <p className="text-slate-500">
                    Eco Park Boulevard, Action Area II, New Town, Kolkata 700156
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>South Kolkata Advisory Lounge</span>
                  </div>
                  <p className="text-slate-500">
                    Southern Avenue, Near Lake Club, Ballygunge, Kolkata 700029
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Concierge Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Concierge Request Dispatched
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. A dedicated senior portfolio advisor has received your parameters and will initiate a discrete callback within 15 minutes.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B0F17] text-white text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b pb-3 mb-4">
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Request Bespoke Acquisition Guidance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in your preferences and we will curate off-market recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Vikramaditya Sen"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98300 00000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikramaditya@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Target Locality
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
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
                      Anticipated Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Under ₹1.0 Cr">Under ₹1.0 Cr</option>
                      <option value="₹1.0 Cr - ₹2.5 Cr">₹1.0 Cr - ₹2.5 Cr</option>
                      <option value="₹2.5 Cr - ₹5.0 Cr">₹2.5 Cr - ₹5.0 Cr</option>
                      <option value="₹5.0 Cr - ₹10.0 Cr">₹5.0 Cr - ₹10.0 Cr</option>
                      <option value="₹10.0 Cr+">₹10.0 Cr+ (Ultra Prime)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Specific Requirements or Preferred Floor/View
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="E.g. Seeking lake-facing 4 BHK penthouse with 2 covered parkings and possession by early 2027..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{isSubmitting ? "Connecting with Concierge..." : "Dispatch Private Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
