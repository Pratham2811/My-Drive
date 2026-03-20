import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchDirectory, fetchGoogleDriveFiles } from "../explorerThunk";
import { openModal, setActiveSource } from "../explorerSlice";
import { EmptyState, ErrorState, LoadingState } from "@/shared";
import { FolderList } from "./FolderList";
import { FileList } from "./FileList";
import { ExplorerHeader } from "./ExplorerHeader";
import { ExplorerModals } from "./ExplorerModals";

const ExplorerContent = () => {
  const dispatch = useDispatch();
  const { dirId } = useParams();
  const location = useLocation();
  const { directories, files, error, loading, searchQuery, activeSource } =
    useSelector((state) => state.explorer);

  // Detect source from route
  const isGoogleDrive = location.pathname.startsWith("/gdrive");

  useEffect(() => {
    if (isGoogleDrive) {
      dispatch(setActiveSource("gdrive"));
      dispatch(fetchGoogleDriveFiles(dirId || ""));
    } else {
      dispatch(setActiveSource("local"));
      dispatch(fetchDirectory(dirId || ""));
    }
  }, [dirId, isGoogleDrive, dispatch]);

  // Retry handler
  const handleRetry = () => {
    if (isGoogleDrive) {
      dispatch(fetchGoogleDriveFiles(dirId || ""));
    } else {
      dispatch(fetchDirectory(dirId || ""));
    }
  };

  // Search filtering
  const filteredDirectories = useMemo(() => {
    if (!searchQuery) return directories;
    return directories.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [directories, searchQuery]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [files, searchQuery]);

  const isEmpty =
    filteredDirectories.length === 0 && filteredFiles.length === 0;

  // Error State
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <ErrorState error={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50">
      <ExplorerHeader />

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-8 max-w-[1600px] mx-auto w-full min-h-full">
          {loading ? (
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-32 bg-slate-200 rounded mb-4"></div>
              <LoadingState type="skeleton" count={6} />
            </div>
          ) : isEmpty && !searchQuery ? (
            <div className="h-[60vh] flex flex-col items-center justify-center">
              <EmptyState
                type="folder"
                title={
                  isGoogleDrive ? "No files in Google Drive" : "No files found"
                }
                description={
                  isGoogleDrive
                    ? "This folder is empty."
                    : "Upload files or create a folder to get started."
                }
                action={
                  !isGoogleDrive
                    ? {
                        label: "Upload Files",
                        onClick: () =>
                          dispatch(openModal({ modalName: "upload" })),
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Folders Section */}
              {filteredDirectories && filteredDirectories.length > 0 && (
                <section>
                  <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                    Folders
                    <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">
                      {filteredDirectories.length}
                    </span>
                  </h2>
                  <FolderList directories={filteredDirectories} />
                </section>
              )}

              {/* Files Section */}
              {filteredFiles && filteredFiles.length > 0 && (
                <section>
                  <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                    Files
                    <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">
                      {filteredFiles.length}
                    </span>
                  </h2>
                  <FileList files={filteredFiles} />
                </section>
              )}

              {/* No Search Results */}
              {searchQuery && isEmpty && (
                <div className="mt-20">
                  <EmptyState type="search" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Only show modals for local source (CRUD is local-only) */}
      <ExplorerModals />
    </div>
  );
};

/**
 * Explorer View Component
 */
export const ExplorerView = () => {
  return <ExplorerContent />;
};

export default ExplorerView;
