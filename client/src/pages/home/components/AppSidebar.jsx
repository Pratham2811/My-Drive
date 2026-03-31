"use client";

import * as React from "react";
import {
  FolderOpen,
  Trash2,
  Clock,
  Star,
  Cloud,
  Settings2,
  HardDrive,
} from "lucide-react";

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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// CloudMemories tailored data

export function AppSidebar({ ...props }) {
  const { user } = useSelector((state) => state.auth);

  // FIX: handle nested structure safely
  const role = user?.role || user?.user?.role;

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-r border-slate-200 bg-white shadow-sm"
    >
      {/* 1. Custom Brand Header */}
      <SidebarHeader className="h-16 flex justify-center border-b border-slate-100">
        <div className="flex items-center gap-3 px-2 overflow-hidden">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg flex-shrink-0 shadow-sm">
            {/* <Cloud size={20} fill="currentColor" /> */}
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight truncate group-data-[collapsible=icon]:hidden">
            CloudMemories
          </span>
        </div>
      </SidebarHeader>

      {/* 2. Main Navigation & Integrations */}
      <SidebarContent className="gap-0 py-4">
        {/* Core Nav (Files, Trash, Settings) */}
        <NavMain />

        {/* Custom Integrations Group injected seamlessly */}
        {/* We hide this specific label when collapsed so it stays clean */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Integrations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="px-2">
                {/* Embedded our beautiful Dialog component */}
                <IntegrationsManager />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {role === "Admin" && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-4">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Admin
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin/users"
                      className="flex items-center gap-2 text-slate-700 hover:bg-slate-100"
                    >
                      <span>User Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* 3. User Profile Footer */}
      <SidebarFooter className="border-t border-slate-100 bg-slate-50/50 p-4">
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
