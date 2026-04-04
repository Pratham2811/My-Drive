import api from "@/shared/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
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

export const logoutUsers = createAsyncThunk(
  "admin/logoutUsers",
  async (users, { rejectWithValue }) => {
    try {
      console.log(users);

      const res = await api.post(`/admin/logout-users`, { userId: users });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout users",
      );
    }
  },
);

export const suspendUser = createAsyncThunk(
  "admin/suspendUsers",
  async (users, { rejectWithValue }) => {
    try {
      console.log(users);

      const res = await api.put(`/admin/suspend-users`, { userId: users });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to suspend users",
      );
    }
  },
);
export const reactivateUser = createAsyncThunk(
  "admin/reactivateUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/reactivate-user`, { userId: user });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reactivate user",
      );
    }
  },
);
export const softDeleteUser = createAsyncThunk(
  "admin/softDeleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/admin/soft-delete/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  },
);
