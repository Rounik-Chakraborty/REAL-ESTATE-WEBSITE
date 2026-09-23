"use client";

import React, { useState } from "react";
import { calculateMortgageEMI, formatPrice, formatNumber } from "@/lib/utils";
import { Calculator, Sparkles, CheckCircle2, Shield } from "lucide-react";
import { useNestora } from "@/context/NestoraContext";

interface EMICalculatorProps {
  initialPrice?: number;
  className?: string;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({
  initialPrice = 12500000,
  className = "",
}) => {
  const { showToast } = useNestora();
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [consultationRequested, setConsultationRequested] = useState(false);

  const result = calculateMortgageEMI(price, downPaymentPercent, interestRate, tenureYears);
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);

  // SVG Donut calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (result.principalRatio / 100) * circumference;
  const interestStroke = (result.interestRatio / 100) * circumference;

  const handleApply = () => {
    setConsultationRequested(true);
    showToast(
      "Mortgage Advisory Requested",
      "Our institutional banking desk (HDFC, ICICI, SBI) will connect for bespoke lowest rates.",
      "success"
    );
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/15 text-[#9F7A48] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900">
              Interactive Mortgage & EMI Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Instant loan simulations tailored for high-value residential acquisitions
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Shield className="w-3.5 h-3.5" />
          <span>Prime Rate 8.5% Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Property Acquisition Price
              </label>
              <span className="text-sm font-bold text-slate-900 font-serif">
                {formatPrice(price, "buy")}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={100000000}
              step={500000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹20 Lakhs</span>
              <span>₹5 Crores</span>
              <span>₹10 Crores</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-bold text-slate-900">
                ₹{formatNumber(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Min)</span>
              <span>30%</span>
              <span>60% (Max)</span>
            </div>
          </div>

          {/* Interest Rate & Tenure Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Interest Rate (p.a.)
                </label>
                <span className="text-sm font-bold text-[#9F7A48]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.0}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>7.0%</span>
                <span>10.5%</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Loan Tenure
                </label>
                <span className="text-sm font-bold text-slate-900">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B0F17] to-[#172033] text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <span className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Estimated Monthly Outlay
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-serif text-white mt-1">
              ₹{formatNumber(result.monthlyEMI)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ month</span>
            </div>
          </div>

          {/* SVG Donut Chart & Breakdown */}
          <div className="my-6 flex items-center justify-between gap-4">
            {/* SVG Donut */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#1E293B"
                  strokeWidth="18"
                />
                {/* Principal Stroke */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#C5A880"
                  strokeWidth="18"
                  strokeDasharray={`${principalStroke} ${circumference}`}
                  strokeLinecap="round"
                />
                {/* Interest Stroke */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#475569"
                  strokeWidth="18"
                  strokeDasharray={`${interestStroke} ${circumference}`}
                  strokeDashoffset={-principalStroke}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs font-bold text-white leading-none">
                  {result.principalRatio}%
                </span>
                <span className="text-[8px] text-slate-400 block uppercase">Principal</span>
              </div>
            </div>

            {/* Breakdown numbers */}
            <div className="space-y-2 text-xs flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
                  <span className="text-slate-300">Principal:</span>
                </div>
                <span className="font-semibold text-white">₹{formatNumber(result.loanAmount)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#475569]" />
                  <span className="text-slate-300">Total Interest:</span>
                </div>
                <span className="font-semibold text-slate-300">₹{formatNumber(result.totalInterest)}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-slate-200">
                <span>Total Payable:</span>
                <span className="font-bold text-[#C5A880]">₹{formatNumber(result.totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* Action */}
          {consultationRequested ? (
            <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mortgage Desk Notified</span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="w-full py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Request Pre-Approved Rates</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
