import React from "react";

export const PropertySkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/80 animate-pulse flex flex-col">
      <div className="aspect-[4/3] w-full bg-slate-200 relative" />
      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-3 bg-slate-100 rounded w-1/4" />
          </div>
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
        </div>
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100">
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
};
