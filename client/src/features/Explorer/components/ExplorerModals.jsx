import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../explorerSlice";
import {
  createFolder,
  renameFolder,
  deleteFolder,
  uploadFiles,
  renameFile,
  deleteFile,
  fetchDirectory,
} from "../explorerThunk";
import { FolderCreate } from "./FolderCreate";
import { RenameItem } from "./RenameItem";
import { FileUpload, FileViewer } from "@/features/file/components";
import { ConfirmDialog } from "@/shared/components";
import { toast } from "sonner";

/**
 * Explorer Modals Component
 * Centralized management of all explorer-related modals using Redux.
 */
export const ExplorerModals = () => {
  const dispatch = useDispatch();
  const { modals, selectedItem, itemType, currentFolderId, actionLoading } =
    useSelector((state) => state.explorer);


  // Handle create folder
  const handleCreateFolder = async (folderName) => {
    try {
      await dispatch(
        createFolder({ name: folderName, parentId: currentFolderId }),
      ).unwrap();
      toast.success("Folder created");
      dispatch(closeModal("createFolder"));
      // Re-fetch to sync with server
      dispatch(fetchDirectory(currentFolderId || ""));
    } catch (error) {
      toast.error(error || "Failed to create folder");
    }
  };

  // Handle upload
  const handleUpload = async (files) => {
    try {
      toast.info("Uploading files...");
      await dispatch(
        uploadFiles({ files, parentDirId: currentFolderId || "" }),
      ).unwrap();
      toast.success(`${files.length} file(s) uploaded`);
      dispatch(closeModal("upload"));
      // Re-fetch to sync with server
      dispatch(fetchDirectory(currentFolderId || ""));
    } catch (error) {
      toast.error(error || "Upload failed");
    }
  };

  // Handle rename
  const handleRename = async (id, newName) => {
    try {
      if (itemType === "folder") {
        await dispatch(
          renameFolder({ folderId: id, oldName: selectedItem.name, newName }),
        ).unwrap();
        toast.success("Folder renamed");
      } else {
        await dispatch(
          renameFile({ fileId: id, oldName: selectedItem.name, newName }),
        ).unwrap();
        toast.success("File renamed");
      }
      dispatch(closeModal("rename"));
    } catch (error) {
      toast.error(error || "Failed to rename");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      if (itemType === "folder") {
        await dispatch(deleteFolder(selectedItem.id)).unwrap();
        toast.success("Folder moved to trash");
      } else {
        await dispatch(deleteFile(selectedItem.id)).unwrap();
        toast.success("File moved to trash");
      }
      dispatch(closeModal("delete"));
    } catch (error) {
      toast.error(error || "Failed to delete");
    }
  };

  // Handle file download
  const handleDownloadFile = () => {
    if (selectedItem) {
      window.open(
        `http://localhost:80/api/file/${selectedItem.id}?action=download`,
        "_blank",
      );
    }
  };

  return (
    <>
      {modals.createFolder && (
        <FolderCreate
          onClose={() => dispatch(closeModal("createFolder"))}
          onCreate={handleCreateFolder}
          directoryPath={currentFolderId}
          loading={actionLoading}
        />
      )}

      {modals.upload && (
        <FileUpload
          onClose={() => dispatch(closeModal("upload"))}
          onUpload={handleUpload}
          directoryPath={currentFolderId}
        />
      )}

      {modals.fileViewer && selectedItem && (
        <FileViewer
          file={selectedItem}
          onClose={() => dispatch(closeModal("fileViewer"))}
          onDownload={handleDownloadFile}
        />
      )}

      {modals.rename && selectedItem && (
        <RenameItem
          onClose={() => dispatch(closeModal("rename"))}
          onRename={handleRename}
          item={selectedItem}
          itemType={itemType}
          loading={actionLoading}
        />
      )}

      {modals.delete && selectedItem && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => dispatch(closeModal("delete"))}
          onConfirm={handleDelete}
          title={`Delete ${itemType === "folder" ? "Folder" : "File"}`}
          message={`Are you sure you want to delete "${selectedItem.name}"? This action cannot be undone.`}
          confirmText="Delete"
          variant="danger"
        />
      )}
    </>
  );
};

export default ExplorerModals;
