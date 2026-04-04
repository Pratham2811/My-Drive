import React from "react";
import { Shield, ShieldAlert, User, Code, Briefcase, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export const UserRoleBadge = ({ role }) => {
    console.log(role);
    
  const safeRole = (role || "Member").toLowerCase();

  // 1. Define the default style (for standard Members or unknown roles)
  let config = {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    icon: User,
    iconColor: "text-slate-500",
  };

  // 2. Map specific roles to premium colorways and icons
  if (safeRole.includes("owner") || safeRole.includes("founder")) {
    config = {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: ShieldAlert,
      iconColor: "text-purple-500",
    };
  } else if (safeRole.includes("admin")) {
    config = {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: Shield,
      iconColor: "text-blue-500",
    };
  } else if (safeRole.includes("engineer") || safeRole.includes("developer")) {
    config = {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      icon: Code,
      iconColor: "text-indigo-500",
    };
  } else if (safeRole.includes("product") || safeRole.includes("manager")) {
    config = {
      bg: "bg-sky-50",
      text: "text-sky-700",
      border: "border-sky-200",
      icon: Briefcase,
      iconColor: "text-sky-500",
    };
  } else if (safeRole.includes("marketing") || safeRole.includes("sales")) {
    config = {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      icon: Megaphone,
      iconColor: "text-orange-500",
    };
  }

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm",
        config.bg,
        config.text,
        config.border
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
      {role || "Member"}
    </div>
  );
};