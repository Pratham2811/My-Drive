import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./adminThunk";

const intialState = {
  users: [],
  loading: {
    loadingUsers: false,
  },
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading.loadingUsers = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        ((state.loading.loadingUsers = false),
          (state.users = action.payload.users));
      });
  },
});

const adminReducer = adminSlice.reducer;
export default adminReducer;
