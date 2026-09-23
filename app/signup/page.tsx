"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNestora } from "@/context/NestoraContext";
import { UserRole } from "@/types";
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { switchRole, showToast } = useNestora();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      switchRole(role);
      setLoading(false);
      showToast("Account Created", `Welcome to NESTORA, ${name || "Client"}!`, "success");
      if (role === "agent") router.push("/agent/dashboard");
      else router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880] flex items-center justify-center font-serif font-bold text-slate-950 text-2xl mx-auto shadow-md">
            N
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500">
            Join Eastern India&apos;s foremost curated real estate platform
          </p>
        </div>

        {/* Account Role Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Register As:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                role === "buyer"
                  ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48]"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <UserCheck className="w-4 h-4 mb-1" />
              <div className="font-bold text-xs">Buyer / Tenant</div>
              <div className="text-[10px] text-slate-400">Looking for residences</div>
            </button>

            <button
              type="button"
              onClick={() => setRole("agent")}
              className={`p-3 rounded-2xl border text-left transition-all ${
                role === "agent"
                  ? "bg-[#C5A880]/15 border-[#C5A880] text-[#9F7A48]"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <Building className="w-4 h-4 mb-1" />
              <div className="font-bold text-xs">Certified Agent</div>
              <div className="text-[10px] text-slate-400">List and manage homes</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Siddharth Sen"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

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
                placeholder="siddharth@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98300 12345"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2"
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>Already registered? </span>
          <Link href="/login" className="text-[#9F7A48] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
