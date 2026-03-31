import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserInfoCell = ({ user }) => {
  return (
    <div className="flex gap-3 items-center min-w-[200px]">
      
      {/* Avatar + Online Indicator */}
      <div className="relative">
        <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-medium text-sm">
            {user.name?.slice(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        {/* Online / Offline dot */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            user.isLoggedIn ? "bg-green-500" : "bg-slate-300"
          }`}
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col overflow-hidden">
        
        {/* Name */}
        <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
          {user.name || "Unknown User"}
        </div>

        {/* Email */}
        <div className="text-sm text-slate-500 truncate">
          {user.email || "No email"}
        </div>

        {/* Mobile-only status */}
        <div className="text-xs text-slate-400 sm:hidden">
          {user.isLoggedIn ? "Online" : "Offline"}
        </div>

      </div>
    </div>
  );
};