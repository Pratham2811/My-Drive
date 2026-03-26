import api from "@/shared/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ─── Directory Thunks ────────────────────────────────────────────────

export const fetchDirectory = createAsyncThunk(
  "explorer/fetchDirectory",
  async (directoryId = "", { rejectWithValue }) => {
    try {
      const res = await api.get(`/directory/${directoryId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load directory",
      );
    }
  },
);

export const createFolder = createAsyncThunk(
  "explorer/createFolder",
  async ({ name, parentId = "" }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/directory/create", {
        directoryname: name,
        parentDirId: parentId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create folder",
      );
    }
  },
);

export const renameFolder = createAsyncThunk(
  "explorer/renameFolder",
  async ({ folderId, oldName, newName }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/directory/${folderId}`, {
        oldName,
        newName,
      });
      return { ...data, folderId, newName };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to rename folder",
      );
    }
  },
);

export const deleteFolder = createAsyncThunk(
  "explorer/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/directory/${folderId}`);
      return { ...data, folderId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete folder",
      );
    }
  },
);

// ─── File Thunks ─────────────────────────────────────────────────────

export const uploadFiles = createAsyncThunk(
  "explorer/uploadFiles",
  async ({ files, parentDirId = "" }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("uploadedFiles", file);
      });
      formData.append("parentDirId", parentDirId);

      const { data } = await api.post("file/upload", formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload files",
      );
    }
  },
);

export const renameFile = createAsyncThunk(
  "explorer/renameFile",
  async ({ fileId, oldName, newName }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/file/${fileId}`, {
        oldFilename: oldName,
        newFilename: newName,
      });
      return { ...data, fileId, newName };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to rename file",
      );
    }
  },
);

export const deleteFile = createAsyncThunk(
  "explorer/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/file/${fileId}`);
      return { ...data, fileId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete file",
      );
    }
  },
);

// ─── Google Drive Thunks ─────────────────────────────────────────────

export const fetchGoogleDriveFiles = createAsyncThunk(
  "explorer/fetchGoogleDriveFiles",
  async (folderId = "", { rejectWithValue }) => {
    try {
      const url = folderId
        ? `/integrations/google-drive/files/${folderId}`
        : `/integrations/google-drive/files`;
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load Google Drive files",
      );
    }
  },
);

export const getGoogleDriveFile = createAsyncThunk(
  "explorer/getGoogleDriveFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const url = `/integrations/google-drive/file/${fileId}`;

      const res = await api.get(url);
      console.log(res.data);
      
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load Google Drive file",
      );
    }
  },
);
