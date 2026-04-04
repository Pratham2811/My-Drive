import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Upload, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { openModal } from "@/features/Explorer/explorerSlice";

const UploadCreateSection = () => {
  const dispatch = useDispatch();
  const { activeSource } = useSelector((state) => state.explorer);
  const isGoogleDrive = activeSource === "gdrive";

  return (
    <div className="px-4 py-4 group-data-[collapsible=icon]:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isGoogleDrive}
            className="
              h-10 w-full rounded-xl
              bg-indigo-500 hover:bg-indigo-600
              text-white font-medium text-sm
              shadow-sm hover:shadow-md
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="
            w-56 rounded-xl p-1.5
            bg-white
            border border-slate-200
            shadow-lg
          "
        >
          <DropdownMenuItem
            onClick={() => dispatch(openModal({ modalName: "upload" }))}
            className="
              flex items-center gap-3
              px-3 py-2.5 rounded-lg
              cursor-pointer
              text-slate-700 text-sm
              hover:bg-slate-100
              transition-colors
            "
          >
            <Upload className="h-4 w-4 text-slate-500" />
            Upload file
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              dispatch(openModal({ modalName: "createFolder" }))
            }
            className="
              flex items-center gap-3
              px-3 py-2.5 rounded-lg
              cursor-pointer
              text-slate-700 text-sm
              hover:bg-slate-100
              transition-colors
            "
          >
            <FolderPlus className="h-4 w-4 text-slate-500" />
            New folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UploadCreateSection;