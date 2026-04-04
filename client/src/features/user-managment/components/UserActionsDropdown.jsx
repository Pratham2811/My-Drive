import React from "react";
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
import { logOut } from "@/features/auth/thunks/sessionThunk";
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

  const handleSuspend = async () => {
    try {
      await dispatch(suspendUser(user.id)).unwrap();
      toast.success("user suspended");
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSoftDelete = async (id) => {
    try {
      const response = await dispatch(softDeleteUser(user.id)).unwrap();
      toast.error(response.message);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error);
    }
  };
  const handleReactivateUser = async (id) => {
    try {
      const response = await dispatch(reactivateUser(id)).unwrap();
      toast.success(response.message);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error);
    }
  };
  const handleHardDelete = () => {
    /* dispatch(hardDeleteUser(user.id)); */
  };
  const handleLogout = async (id) => {
    try {
      await dispatch(logoutUsers(id)).unwrap();
      toast.success("user logged out");
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error);
    }
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
        {user.state === "ACTIVE" && (
          <DropdownMenuItem
            disabled={user.state === "SUSPENDED"}
            onClick={handleSuspend}
            className="cursor-pointer text-slate-700"
          >
            <Ban className="w-4 h-4 mr-2 text-slate-400" />
            Suspend User
          </DropdownMenuItem>
        )}
        {user.state === "SUSPENDED" ||user.state === "DISABLED" && (
          <DropdownMenuItem
            onClick={() => {
              handleReactivateUser(user.id);
            }}
            className="cursor-pointer text-green-600 focus:text-green-700 focus:bg-green-50 mt-1"
          >
            <UserRoundCheck className="w-4 h-4 mr-2" />
            Reactivate
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSoftDelete}
          className="cursor-pointer text-slate-700"
        >
          <Trash className="w-4 h-4 mr-2 text-slate-400" />
          Soft Delete
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleHardDelete}
          className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1"
        >
          <ShieldAlert className="w-4 h-4 mr-2" />
          Hard Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleLogout(user.id);
          }}
          disabled={!loginStatus}
          className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
