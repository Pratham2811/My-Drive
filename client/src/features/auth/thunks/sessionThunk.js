import api from "@/shared/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User Not logged In Please Login",
      );
    }
  },
);
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/logout",id);

      return res.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message || "User  logged out Please Login",
      );
    }
  },
);
