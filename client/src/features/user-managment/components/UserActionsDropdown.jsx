import React from "react";
import { useDispatch } from "react-redux";
import { MoreVertical, Ban, Trash, ShieldAlert, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserActionsDropdown = ({ user }) => {
  const dispatch = useDispatch();

  const handleSuspend = () => { /* dispatch(suspendUser(user.id)); */ };
  const handleSoftDelete = () => { /* dispatch(softDeleteUser(user.id)); */ };
  const handleHardDelete = () => { /* dispatch(hardDeleteUser(user.id)); */ };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors outline-none">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-100">
        
        <DropdownMenuItem onClick={handleSuspend} className="cursor-pointer text-slate-700">
          <Ban className="w-4 h-4 mr-2 text-slate-400" />
          Suspend User
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSoftDelete} className="cursor-pointer text-slate-700">
          <Trash className="w-4 h-4 mr-2 text-slate-400" />
          Soft Delete
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleHardDelete} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1">
          <ShieldAlert className="w-4 h-4 mr-2" />
          Hard Delete
        </DropdownMenuItem>
      <DropdownMenuItem onClick={handleHardDelete} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};