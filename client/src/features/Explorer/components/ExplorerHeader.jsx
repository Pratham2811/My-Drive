import React from "react";
import { Grid, List, FolderPlus, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setSearchQuery } from "../explorerSlice";

/**
 * Explorer Header Component
 * Hides create/upload buttons when viewing Google Drive (read-only).
 */
export const ExplorerHeader = () => {
  const dispatch = useDispatch();
  const { activeSource } = useSelector((state) => state.explorer);
  const isGoogleDrive = activeSource === "gdrive";

  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-slate-900">
            {isGoogleDrive ? "Google Drive" : "My Files"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative group w-full md:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search..."
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="pl-9 h-9 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500/20 transition-all rounded-md text-sm"
            />
          </div>

          {/* Only show create/upload for local files */}
          {!isGoogleDrive && (
            <>
              <Separator orientation="vertical" className="h-6 hidden md:block" />

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch(openModal({ modalName: "createFolder" }))}
                  className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <FolderPlus className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="hidden sm:inline">Folder</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => dispatch(openModal({ modalName: "upload" }))}
                  className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorerHeader;
