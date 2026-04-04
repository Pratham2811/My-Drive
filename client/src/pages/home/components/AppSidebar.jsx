"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cloud, Shield } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import IntegrationsManager from "@/features/appIntegrations/components/IntergrationManager";
import UploadCreateSection from "./UploadCreateSection";

export function AppSidebar({ ...props }) {
  const { user } = useSelector((state) => state.auth);
  const { activeSource } = useSelector((state) => state.explorer);

  const role = user?.role || user?.user?.role;

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-r border-slate-200 bg-white shadow-sm"
    >
      <SidebarHeader className="h-16 flex justify-center border-b border-slate-100">
        <div className="flex items-center gap-3 px-2 overflow-hidden">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg flex-shrink-0 shadow-sm">
            <Cloud size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight truncate group-data-[collapsible=icon]:hidden">
            CloudMemories
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-4">
        <UploadCreateSection />

        <NavMain />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Integrations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="px-2">
                <IntegrationsManager />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role === "Admin" && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-2">
            <SidebarGroupLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-4">
              Admin
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="px-2">
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin/users"
                      className="flex items-center gap-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium rounded-lg transition-colors group"
                    >
                      <Shield className="h-4 w-4 text-slate-400 group-hover:text-[#0B192C] transition-colors" />
                      <span>User Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 bg-slate-50/50 p-4">
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
