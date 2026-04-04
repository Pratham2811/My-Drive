import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./home/components/AppSidebar";
import { AppHeader } from "./home/components/AppHeader";

export default function ExplorerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* min-w-0 is required to prevent flex children from blowing out the screen width on mobile */}
      <SidebarInset className="bg-[#F5F7FA] min-w-0">
        
        <AppHeader />

        {/* Added min-w-0 and px-3 sm:px-6 for responsive padding inside the main area */}
        <div className="flex flex-1 flex-col w-full h-[calc(100vh-4rem)] overflow-hidden min-w-0">
          <Outlet />
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  );
}