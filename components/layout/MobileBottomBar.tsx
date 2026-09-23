"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import { Home, Compass, Heart, Scale, User as UserIcon } from "lucide-react";

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { favorites, comparedIds, currentUser } = useNestora();

  const getDashboardLink = () => {
    if (currentUser.role === "agent") return "/agent/dashboard";
    if (currentUser.role === "admin") return "/admin";
    return "/dashboard";
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    {
      label: "Saved",
      href: "/saved",
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
    {
      label: "Compare",
      href: "/compare",
      icon: Scale,
      badge: comparedIds.length > 0 ? comparedIds.length : undefined,
    },
    {
      label: currentUser.role === "agent" ? "Agent" : currentUser.role === "admin" ? "Admin" : "Profile",
      href: getDashboardLink(),
      icon: UserIcon,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative min-w-[56px] ${
              isActive ? "text-[#C5A880]" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
              {typeof item.badge === "number" && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#C5A880] text-slate-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-1 leading-none">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1 shadow-sm" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
