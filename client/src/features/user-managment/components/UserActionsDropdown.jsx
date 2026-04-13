import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MoreVertical,
  Ban,
  Trash,
  ShieldAlert,
  LogOut,
  UserRoundCheck,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import {
  getAllUsers,
  logoutUsers,
  reactivateUser,
  softDeleteUser,
  suspendUser,
} from "../adminThunk";

export const UserActionsDropdown = ({ user, loginStatus }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAction = async (action, successMsg) => {
    try {
      setLoading(true);
      const response = await dispatch(action).unwrap();
      toast.success(response?.message || successMsg);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = () =>
    handleAction(suspendUser(user.id), "User suspended");

  const handleSoftDelete = () =>
    handleAction(softDeleteUser(user.id), "User soft deleted");

  const handleReactivateUser = () =>
    handleAction(reactivateUser(user.id), "User reactivated");

  const handleLogout = () =>
    handleAction(logoutUsers(user.id), "User logged out");

  const handleHardDelete = () => {
    // TODO: implement properly
    toast.error("Hard delete not implemented yet");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors outline-none">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 rounded-xl shadow-lg border-slate-100"
      >
        {/* Suspend */}
        {user.state === "ACTIVE" && (
          <DropdownMenuItem
            disabled={loading}
            onClick={handleSuspend}
            className="cursor-pointer text-slate-700"
          >
            <Ban className="w-4 h-4 mr-2 text-slate-400" />
            Suspend User
          </DropdownMenuItem>
        )}

        {/* Reactivate (FIXED CONDITION) */}
        {(user.state === "SUSPENDED" || user.state === "DISABLED") && (
          <DropdownMenuItem
            disabled={loading}
            onClick={handleReactivateUser}
            className="cursor-pointer text-green-600 focus:text-green-700 focus:bg-green-50 mt-1"
          >
            <UserRoundCheck className="w-4 h-4 mr-2" />
            Reactivate
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Soft Delete */}
        <DropdownMenuItem
          disabled={loading}
          onClick={handleSoftDelete}
          className="cursor-pointer text-slate-700"
        >
          <Trash className="w-4 h-4 mr-2 text-slate-400" />
          Soft Delete
        </DropdownMenuItem>

        {/* Hard Delete */}
        <DropdownMenuItem
          disabled={loading}
          onClick={handleHardDelete}
          className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1"
        >
          <ShieldAlert className="w-4 h-4 mr-2" />
          Hard Delete
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuItem
          disabled={!loginStatus || loading}
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
