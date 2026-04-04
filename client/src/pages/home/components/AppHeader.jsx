import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/shared";
import { setSearchQuery } from "@/features/Explorer/explorerSlice";
import { ViewToggle } from "./ViewToggle";

export const AppHeader = () => {
  const { directory } = useSelector((state) => state.explorer);
  const location = useLocation();
  const isGoogleDrive = location.pathname.startsWith("/gdrive");
  const dispatch = useDispatch();

  const folderName =
    directory?.name || (isGoogleDrive ? "My Drive" : "My Files");
  const rootLabel = isGoogleDrive ? "Google Drive" : "Workspace";
  const rootUrl = isGoogleDrive ? "/gdrive" : "/";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 md:px-6 border-b bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />

        <div className="h-5 w-px bg-slate-200" />

        <Breadcrumb className="truncate">
          <BreadcrumbList className="flex-nowrap truncate">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href={rootUrl}
                className="text-slate-500 hover:text-slate-900 text-sm"
              >
                {rootLabel}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden md:block text-slate-300" />

            <BreadcrumbItem className="truncate">
              <BreadcrumbPage className="text-sm font-medium text-slate-900 truncate">
                {folderName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* SEARCH (FIXED) */}
        <div className="relative w-[220px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Search..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="
      h-10 w-full
      pl-9 pr-3
      text-sm
      bg-white
      border border-slate-200
      rounded-md
      focus-visible:outline-none
      focus-visible:ring-1
      focus-visible:ring-slate-300
      focus-visible:border-slate-300
    "
          />
        </div>
        {/* VIEW TOGGLE */}
        <div>
          <ViewToggle />
        </div>
      </div>
    </header>
  );
};
