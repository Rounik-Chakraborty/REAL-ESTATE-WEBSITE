"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNestora, DEMO_USERS } from "@/context/NestoraContext";
import {
  Compass,
  Heart,
  Scale,
  Bell,
  PlusCircle,
  Menu,
  ChevronDown,
  UserCheck,
  Building,
  ShieldCheck,
  LogOut,
  Search,
} from "lucide-react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { UserRole } from "@/types";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentUser,
    switchRole,
    favorites,
    comparedIds,
    notifications,
    markAllNotificationsRead,
  } = useNestora();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const getDashboardPath = (role: UserRole) => {
    if (role === "agent") return "/agent/dashboard";
    if (role === "admin") return "/admin";
    return "/dashboard";
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0F17]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3"
            : "bg-[#0B0F17] border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E2D2BC] via-[#C5A880] to-[#9F7A48] flex items-center justify-center font-serif font-bold text-slate-950 text-xl shadow-md group-hover:scale-105 transition-transform">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="font-serif tracking-[0.25em] text-xl font-bold text-white leading-none">
                    NESTORA
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-medium mt-0.5">
                    Luxury Real Estate
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1.5 ml-4">
                <Link
                  href="/explore"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                    pathname === "/explore"
                      ? "text-[#C5A880] bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore</span>
                </Link>

                <Link
                  href="/properties?purpose=buy"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                    pathname.startsWith("/properties") && !pathname.includes("rent")
                      ? "text-[#C5A880] bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Buy
                </Link>

                <Link
                  href="/properties?purpose=rent"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                    pathname.includes("rent")
                      ? "text-[#C5A880] bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Rent
                </Link>

                <Link
                  href="/about"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                    pathname === "/about"
                      ? "text-[#C5A880] bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                    pathname === "/contact"
                      ? "text-[#C5A880] bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Compare Button */}
              {comparedIds.length > 0 && (
                <Link
                  href="/compare"
                  className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  title="Compare Properties"
                >
                  <Scale className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {comparedIds.length}
                  </span>
                </Link>
              )}

              {/* Saved Wishlist */}
              <Link
                href="/saved"
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifMenuOpen(!notifMenuOpen);
                    setUserMenuOpen(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifs > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#C5A880] rounded-full ring-2 ring-[#0B0F17]" />
                  )}
                </button>

                {notifMenuOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#0B0F17] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                        Notifications
                      </h4>
                      {unreadNotifs > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-[#C5A880] hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-white/5 max-h-72 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 text-center">No notifications</p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`py-3 ${!notif.read ? "bg-white/[0.02]" : "opacity-75"}`}
                          >
                            <div className="flex items-center justify-between text-xs font-medium text-slate-200">
                              <span>{notif.title}</span>
                              <span className="text-[10px] text-slate-400">{notif.time}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {notif.message}
                            </p>
                            {notif.link && (
                              <Link
                                href={notif.link}
                                onClick={() => setNotifMenuOpen(false)}
                                className="text-[11px] text-[#C5A880] hover:underline inline-block mt-1.5"
                              >
                                View details →
                              </Link>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Persona & Role Selector Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotifMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-[#C5A880] text-slate-950 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-medium text-slate-200 leading-none">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-[#C5A880] uppercase tracking-wider font-mono mt-0.5">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#0B0F17] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <p className="text-xs font-semibold text-slate-100">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="mb-2 p-2 bg-white/5 rounded-xl">
                      <p className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-wider mb-1.5 px-1">
                        Switch Demo Role
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {(["buyer", "agent", "admin"] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              switchRole(r);
                              setUserMenuOpen(false);
                            }}
                            className={`py-1 rounded-md text-[11px] font-medium capitalize ${
                              currentUser.role === r
                                ? "bg-[#C5A880] text-slate-950 font-bold shadow-sm"
                                : "text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href={getDashboardPath(currentUser.role)}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-white/5 transition-colors"
                      >
                        {currentUser.role === "buyer" && <UserCheck className="w-4 h-4 text-[#C5A880]" />}
                        {currentUser.role === "agent" && <Building className="w-4 h-4 text-emerald-400" />}
                        {currentUser.role === "admin" && <ShieldCheck className="w-4 h-4 text-amber-400" />}
                        <span>
                          {currentUser.role === "buyer"
                            ? "Buyer Dashboard"
                            : currentUser.role === "agent"
                            ? "Agent CRM & Dashboard"
                            : "Admin Moderation"}
                        </span>
                      </Link>

                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign In / Switch Account</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* List Property CTA */}
              <Link
                href="/agent/properties/new"
                className="flex items-center gap-1.5 bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Property</span>
              </Link>
            </div>

            {/* Mobile Header Right Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/properties"
                className="p-2 text-slate-300 hover:text-white"
                aria-label="Search properties"
              >
                <Search className="w-5 h-5" />
              </Link>

              <Link
                href="/saved"
                className="relative p-2 text-slate-300 hover:text-white"
                aria-label="Saved properties"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C5A880] text-slate-950 text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="p-2 text-slate-300 hover:text-white rounded-lg"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </>
  );
};
