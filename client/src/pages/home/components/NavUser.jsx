import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/features/auth/thunks/sessionThunk";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  
  const handleLogout = async () => {
    try {
      const data = await dispatch(logOut()).unwrap();
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error("error");
    }
  };
  // Helper to get initials (e.g., "John Doe" -> "JD", "demo@email.com" -> "DE")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(user?.name || user?.email);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-slate-100 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 text-slate-700 transition-colors rounded-lg"
            >
              <Avatar className="h-8 w-8 rounded-md border border-slate-200">
                <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
                <AvatarFallback className="rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-900">
                  {user?.name || "User"}
                </span>
                <span className="truncate text-xs text-slate-500">
                  {user?.email || "No email"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-slate-100 shadow-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2 text-left text-sm">
                <Avatar className="h-9 w-9 rounded-md border border-slate-200 shadow-sm">
                  <AvatarImage
                    src={user?.avatarUrl}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="rounded-md bg-indigo-50 text-indigo-700 font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-slate-900">
                    {user?.name || "User"}
                  </span>
                  <span className="truncate text-xs text-slate-500">
                    {user?.email || "No email"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-indigo-50 focus:bg-indigo-50 text-slate-700 focus:text-indigo-700 cursor-pointer rounded-md m-1 transition-colors">
                <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                <span className="font-medium">Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-slate-100 focus:bg-slate-100 text-slate-700 cursor-pointer rounded-md m-1 transition-colors">
                <BadgeCheck className="mr-2 h-4 w-4 text-slate-500" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-100 focus:bg-slate-100 text-slate-700 cursor-pointer rounded-md m-1 transition-colors">
                <CreditCard className="mr-2 h-4 w-4 text-slate-500" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-100 focus:bg-slate-100 text-slate-700 cursor-pointer rounded-md m-1 transition-colors">
                <Bell className="mr-2 h-4 w-4 text-slate-500" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-50 focus:bg-red-50 text-slate-700 focus:text-red-700 cursor-pointer rounded-md m-1 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4 text-slate-500 group-focus:text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
