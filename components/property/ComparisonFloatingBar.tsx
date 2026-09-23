"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useNestora } from "@/context/NestoraContext";
import { Scale, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ComparisonFloatingBar: React.FC = () => {
  const { comparedIds, properties, removeFromCompare, clearCompare } = useNestora();

  if (comparedIds.length === 0) return null;

  const comparedProperties = properties.filter((p) => comparedIds.includes(p.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-[#0B0F17]/95 backdrop-blur-md text-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#C5A880]/30"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-[65%] no-scrollbar">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#C5A880] font-medium shrink-0">
              <Scale className="w-4 h-4" />
              <span>Compare ({comparedProperties.length}/4)</span>
            </div>

            {comparedProperties.map((item) => (
              <div
                key={item.id}
                className="relative group shrink-0 rounded-lg overflow-hidden border border-white/20 w-12 h-12 sm:w-14 sm:h-14 bg-slate-800"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
                <button
                  onClick={() => removeFromCompare(item.id)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {Array.from({ length: 4 - comparedProperties.length }).map((_, idx) => (
              <div
                key={idx}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-[10px] text-slate-400"
              >
                +Slot
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
            >
              Clear
            </button>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 bg-[#C5A880] hover:bg-[#b5966c] text-[#0B0F17] font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
