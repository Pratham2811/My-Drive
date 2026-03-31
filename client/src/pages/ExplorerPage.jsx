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
import { AppSidebar } from "./home/components/AppSidebar";
import ExplorerView from "@/features/Explorer/components/ExplorerView";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function ExplorerPage() {
  const { directory } = useSelector((state) => state.explorer);
  const location = useLocation();
  const isGoogleDrive = location.pathname.startsWith("/gdrive");

  const folderName =
    directory?.name || (isGoogleDrive ? "My Drive" : "My Files");
  const rootLabel = isGoogleDrive ? "Google Drive" : "Workspace";
  const rootUrl = isGoogleDrive ? "/gdrive" : "/test";

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-[#F5F7FA]">
        {/* Premium Header: Frosted glass effect */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                    href={rootUrl}
                    className="text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {rootLabel}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-slate-300" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-slate-900">
                    {folderName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col w-full h-[calc(100vh-4rem)] overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
