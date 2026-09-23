"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Property } from "@/types";
import { useNestora } from "@/context/NestoraContext";
import {
  X,
  Send,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const { currentUser, submitEnquiry } = useNestora();

  const [userName, setUserName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [preferredTime, setPreferredTime] = useState("Anytime (9 AM - 7 PM)");
  const [message, setMessage] = useState(
    "Hello, I am interested in this verified residence and would like to request detailed floor plans, legal dossier, and available pricing flexibility."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEnquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.priceFormatted,
        propertyLocation: `${property.location.neighborhood}, ${property.location.city}`,
        userName,
        email,
        phone,
        preferredTime,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="bg-[#0B0F17] text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#C5A880] mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Direct Listing Advisory</span>
            </div>
            <h3 className="text-xl font-bold font-serif">{property.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned Advisor: {property.agent.name} • {property.priceFormatted}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 sm:p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 font-serif">
                  Enquiry Dispatched!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Your message has been routed to {property.agent.name}. You will receive a direct callback within 15 minutes.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Agent card snippet */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#C5A880]/40">
                  <Image
                    src={property.agent.photo}
                    alt={property.agent.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {property.agent.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500">{property.agent.title}</div>
                  <div className="text-[10px] text-[#9F7A48] font-medium">
                    ⚡ Typical reply: {property.agent.responseTime}
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Preferred Callback Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    <option value="Anytime (9 AM - 7 PM)">Anytime (9 AM - 7 PM)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-600 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
