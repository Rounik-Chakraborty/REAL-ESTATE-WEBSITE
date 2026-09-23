"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import {
  X,
  Compass,
  Heart,
  Scale,
  PlusCircle,
  ShieldCheck,
  UserCheck,
  Building,
  Phone,
  Info,
  SlidersHorizontal,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRole } from "@/types";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentUser, switchRole, favorites, comparedIds } = useNestora();

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Properties (Buy)", href: "/properties?purpose=buy", icon: Building },
    { label: "Properties (Rent)", href: "/properties?purpose=rent", icon: SlidersHorizontal },
    { label: "Map Discovery", href: "/explore", icon: Compass },
    { label: "Saved Wishlist", href: "/saved", icon: Heart, badge: favorites.length },
    { label: "Compare Properties", href: "/compare", icon: Scale, badge: comparedIds.length },
    { label: "About Nestora", href: "/about", icon: Info },
    { label: "Contact Concierge", href: "/contact", icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-[#0B0F17] text-white p-6 flex flex-col shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880] flex items-center justify-center font-serif font-bold text-slate-950 text-lg shadow-sm">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="font-serif tracking-[0.2em] text-lg font-bold text-white leading-none">
                    NESTORA
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A880] mt-0.5">
                    Luxury Real Estate
                  </span>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Demo Switcher inside drawer */}
            <div className="my-5 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Active Persona</span>
                <span className="text-[#C5A880] text-[10px] font-mono">Demo Switch</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["buyer", "agent", "admin"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      currentUser.role === r
                        ? "bg-[#C5A880] text-slate-950 shadow-md font-semibold"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1 py-2 flex-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#C5A880]" : "text-slate-400"}`} />
                      <span>{link.label}</span>
                    </div>
                    {typeof link.badge === "number" && link.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A880] text-slate-950">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Dedicated Role Portals */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Buyer Dashboard</span>
              </Link>
              <Link
                href="/agent/dashboard"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Agent Portal & CRM</span>
              </Link>
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Moderation</span>
              </Link>
            </div>

            {/* List Property CTA */}
            <div className="pt-4 mt-2">
              <Link
                href="/agent/properties/new"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-sm transition-all shadow-lg active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Property</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
