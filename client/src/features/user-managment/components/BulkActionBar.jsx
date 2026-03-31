import React from "react";
import { Trash2, Ban, X } from "lucide-react";

export const BulkActionBar = ({ count, onSuspend, onSoftDelete, onClear }) => {
  return (
    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md border border-indigo-100 font-medium text-sm">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        {count} selected
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSuspend}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
        >
          <Ban className="w-4 h-4" />
          Suspend
        </button>

        <button
          onClick={onSoftDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        
        <div className="w-px h-5 bg-slate-200 mx-1" />

        <button 
          onClick={onClear} 
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          title="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};