"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNestora, DEMO_USERS } from "@/context/NestoraContext";
import { UserRole } from "@/types";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Building,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, switchRole, showToast } = useNestora();
  const [email, setEmail] = useState("alex.reynolds@luxuryestates.com");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("buyer");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      switchRole(selectedRole);
      setLoading(false);
      if (selectedRole === "agent") router.push("/agent/dashboard");
      else if (selectedRole === "admin") router.push("/admin");
      else router.push("/dashboard");
    }, 400);
  };

  const handleQuickLogin = (role: UserRole) => {
    setSelectedRole(role);
    switchRole(role);
    if (role === "agent") router.push("/agent/dashboard");
    else if (role === "admin") router.push("/admin");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880] flex items-center justify-center font-serif font-bold text-slate-950 text-2xl mx-auto shadow-md">
            N
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Sign In to NESTORA
          </h2>
          <p className="text-xs text-slate-500">
            Access your saved homes, scheduled visits, and private inquiries
          </p>
        </div>

        {/* 1-Click Demo Personas */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#9F7A48] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Instant Demo Evaluation Switch</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("buyer")}
              className={`p-2 rounded-xl text-left text-xs transition-all border ${
                currentUser.role === "buyer"
                  ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C5A880] mb-1" />
              <div className="font-bold text-[11px] leading-tight">Buyer</div>
              <div className="text-[9px] text-slate-400">Alex R.</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("agent")}
              className={`p-2 rounded-xl text-left text-xs transition-all border ${
                currentUser.role === "agent"
                  ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Building className="w-3.5 h-3.5 text-emerald-400 mb-1" />
              <div className="font-bold text-[11px] leading-tight">Agent</div>
              <div className="text-[9px] text-slate-400">Priya S.</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className={`p-2 rounded-xl text-left text-xs transition-all border ${
                currentUser.role === "admin"
                  ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 mb-1" />
              <div className="font-bold text-[11px] leading-tight">Admin</div>
              <div className="text-[9px] text-slate-400">CINIX Ops</div>
            </button>
          </div>
        </div>

        {/* Standard Auth Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <a href="#forgot" className="text-[11px] text-[#9F7A48] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In with Credentials"}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>New to Nestora? </span>
          <Link href="/signup" className="text-[#9F7A48] font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
