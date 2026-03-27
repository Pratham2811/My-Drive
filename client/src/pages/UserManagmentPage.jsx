import React, { useState } from "react";
import { Users, UserPlus, Shield, Settings } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "./home/components/AppSidebar";
 // Adjust path as needed

// Import our sub-components (defined below)
// import { UsersTable } from "./components/UsersTable";
// import { UserActionsToolbar } from "./components/UserActionsToolbar";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Users", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: Shield },
    { id: "settings", label: "Security Settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F5F7FA]">
        
        {/* Premium Header */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2 px-6 w-full">
            <SidebarTrigger className="-ml-2 text-slate-500 hover:text-slate-900" />
            <Separator orientation="vertical" className="h-5 mx-2 bg-slate-200" />
            <h1 className="font-semibold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" />
              User Management
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col gap-6 p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
          
          {/* Page Title & Description */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members</h2>
            <p className="text-slate-500 mt-1">Manage your team's access, roles, and security settings.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === "all" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                {/* <UserActionsToolbar />
                <UsersTable /> */}
              </div>
            )}
            
            {activeTab !== "all" && (
              <div className="h-64 flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm border-dashed">
                <p className="text-slate-400 font-medium">Coming soon...</p>
              </div>
            )}
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}