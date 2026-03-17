"use client";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { buildSidebar } from "../constants";
import { useSelector } from "react-redux";

export function NavMain() {
  const integrations = useSelector((state) => state.integratedApps);
  const items = buildSidebar(integrations.providers);
  console.log(items);

  return (
    <SidebarMenu>
      {items?.map((item) => (
        <Collapsible
          key={item.title}
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className="hover:bg-slate-100 data-[state=open]:bg-slate-50 text-slate-700 font-medium transition-colors"
              >
                {item.icon && (
                  <item.icon className="text-slate-500 group-hover:text-indigo-600 transition-colors" />
                )}

                <span>{item.title}</span>

                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub className="border-l-slate-200">
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to={subItem.url}
                        className="flex items-center gap-2 hover:bg-slate-100 hover:text-indigo-600 text-slate-600 transition-colors"
                      >
                        {subItem.icon && (
                          <subItem.icon className="h-4 w-4 shrink-0" />
                        )}

                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
