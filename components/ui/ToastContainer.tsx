"use client";

import React from "react";
import { useNestora } from "@/context/NestoraContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNestora();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-[#0B0F17] text-white p-4 rounded-xl shadow-2xl border border-white/10 flex items-start gap-3 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#C5A880]" />
            <div className="mt-0.5 shrink-0">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-sky-400" />}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {toast.title}
              </h4>
              <p className="text-sm text-slate-100 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
