import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDirectory,
  createFolder,
  renameFolder,
  deleteFolder,
  uploadFiles,
  renameFile,
  deleteFile,
} from "./explorerThunk";

const initialState = {
  // Core data
  currentFolderId: null,
  directory: null,
  files: [],
  directories: [],
  loading: false,
  error: null,

  // UI state
  searchQuery: "",
  modals: {
    createFolder: false,
    upload: false,
    rename: false,
    delete: false,
    fileViewer: false,
  },
  selectedItem: null,
  itemType: "file", // 'file' or 'folder'
  actionLoading: false, // for CRUD operations
};

const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    // Modal management   
    openModal: (state, action) => {
      const { modalName, item = null, itemType = "file" } = action.payload;
      state.modals[modalName] = true;
      state.selectedItem = item;
      state.itemType = itemType;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = false;
      state.selectedItem = null;
    },
    closeAllModals: (state) => {
      state.modals = { ...initialState.modals };
      state.selectedItem = null;
    },

    // Search
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Directory ───────────────────────────
      .addCase(fetchDirectory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectory.fulfilled, (state, action) => {
        const items = action.payload.data;
        state.directories = items.directories;
        state.files = items.files;
        state.directory = items.directory;
        state.currentFolderId = items.directory?.id || null;
        state.loading = false;
      })
      .addCase(fetchDirectory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load directory";
      })

      // ─── Create Folder ─────────────────────────────
      .addCase(createFolder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.actionLoading = false;
        // The new folder is returned in the response, push it to the list
        if (action.payload?.data) {
          state.directories.push(action.payload.data);
        }
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to create folder";
      })

      // ─── Rename Folder ─────────────────────────────
      .addCase(renameFolder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(renameFolder.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { folderId, newName } = action.payload;
        const folder = state.directories.find((d) => d.id === folderId);
        if (folder) {
          folder.name = newName;
        }
      })
      .addCase(renameFolder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to rename folder";
      })

      // ─── Delete Folder ─────────────────────────────
      .addCase(deleteFolder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { folderId } = action.payload;
        state.directories = state.directories.filter((d) => d.id !== folderId);
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to delete folder";
      })

      // ─── Upload Files ──────────────────────────────
      .addCase(uploadFiles.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Append uploaded files to the list
        if (action.payload?.data?.files) {
          state.files.push(...action.payload.data.files);
        } else if (Array.isArray(action.payload?.data)) {
          state.files.push(...action.payload.data);
        }
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to upload files";
      })

      // ─── Rename File ───────────────────────────────
      .addCase(renameFile.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(renameFile.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { fileId, newName } = action.payload;
        const file = state.files.find((f) => f.id === fileId);
        if (file) {
          file.name = newName;
        }
      })
      .addCase(renameFile.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to rename file";
      })

      // ─── Delete File ───────────────────────────────
      .addCase(deleteFile.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { fileId } = action.payload;
        state.files = state.files.filter((f) => f.id !== fileId);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Failed to delete file";
      });
  },
});

export const { openModal, closeModal, closeAllModals, setSearchQuery, clearError } =
  explorerSlice.actions;

const explorerReducer = explorerSlice.reducer;
export default explorerReducer;
