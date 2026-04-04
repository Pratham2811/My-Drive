import React from "react";
import { LayoutGrid, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { changeState } from "@/slices/preferenceSlice";

export const ViewToggle = () => {
  const dispatch = useDispatch();

  const viewMode =
    useSelector((state) => state.preferences?.viewMode) || "grid";

  return (
    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => dispatch(changeState("grid"))}
        className={`h-9 w-9 flex items-center justify-center transition ${
          viewMode === "grid"
            ? "bg-slate-100 text-slate-900"
            : "text-slate-500 hover:bg-slate-50"
        }`}
        title="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-200" />

      <button
        onClick={() => dispatch(changeState("list"))}
        className={`h-9 w-9 flex items-center justify-center transition ${
          viewMode === "list"
            ? "bg-slate-100 text-slate-900"
            : "text-slate-500 hover:bg-slate-50"
        }`}
        title="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};
