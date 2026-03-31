import api from "@/shared/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async ( _, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/users`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load directory",
      );
    }
  },
);