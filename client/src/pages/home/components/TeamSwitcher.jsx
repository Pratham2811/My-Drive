"use client"

import React, { useState } from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-slate-100 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 text-slate-700 transition-colors rounded-lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-indigo-600 text-white shadow-sm border border-indigo-700">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-900">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs text-slate-500">
                  {activeTeam.plan}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-slate-100 shadow-xl"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 py-2">
              Workspaces
            </DropdownMenuLabel>
            
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-3 p-2 cursor-pointer rounded-md hover:bg-slate-50 focus:bg-slate-50 transition-colors group"
              >
                <div className="flex size-8 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                  <team.logo className="size-4 shrink-0 text-slate-500 group-hover:text-indigo-600" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="font-medium text-slate-900">{team.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide">{team.plan}</span>
                </div>
                <DropdownMenuShortcut className="text-slate-400">⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator className="bg-slate-100 my-1" />
            
            <DropdownMenuItem className="gap-3 p-2 cursor-pointer rounded-md hover:bg-slate-50 focus:bg-slate-50 text-slate-700 transition-colors group">
              <div className="flex size-8 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                <Plus className="size-4 text-slate-500 group-hover:text-indigo-600" />
              </div>
              <div className="font-medium text-slate-700 group-hover:text-indigo-700">
                Create workspace
              </div>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}