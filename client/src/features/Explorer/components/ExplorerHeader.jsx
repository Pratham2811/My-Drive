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
      

        <div className="flex items-center gap-3">
          {/* Search Input */}
         

          {/* Only show create/upload for local files */}
          
        </div>
      </div>
    </div>
  );
};

export default ExplorerHeader;
