import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Set the main background color to our app's soft gray */}
      <SidebarInset className="bg-[#F5F7FA]">
        {/* Premium Header: Frosted glass effect, sticky, clean borders */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-6 w-full">
            <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900 transition-colors" />

            <Separator
              orientation="vertical"
              className="h-5 mx-2 bg-slate-200"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    className="text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                  >
                    Workspace
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-slate-300" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-slate-900">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content Area: Constrained width, generous padding, premium spacing */}
        <div className="flex flex-1 flex-col gap-6 p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
          {/* Top Row: Metric / Overview Cards */}
          <div className="grid auto-rows-min gap-6 md:grid-cols-3" />
          {/* <FolderList /> */}

          {/* Main Large Content Container */}
          <div className="flex-1 min-h-[50vh] rounded-xl bg-white border border-slate-200 shadow-sm p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {/* Placeholder internal structure to show how content sits */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
