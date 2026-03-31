import React from "react";
import { cn } from "@/lib/utils";

export const UserStatusBadge = ({ status }) => {
  // Normalize status for safe matching
  console.log(status);
  
  const safeStatus = (status || "UNKNOWN").toUpperCase();

  const config = {
    ACTIVE: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    SUSPENDED: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    DELETED: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
    DEFAULT: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", dot: "bg-slate-400" },
  };

  const style = config[safeStatus] || config.DEFAULT;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", style.bg, style.text, style.border)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
      {/* Format text nicely: "ACTIVE" -> "Active" */}
      {safeStatus.charAt(0) + safeStatus.slice(1).toLowerCase()}
    </div>
  );
};