
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "grid",
};
const preferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {
    changeState(state, action) {
      if (state.viewMode === "list") {
        state.viewMode = "grid";
      } else {
        state.viewMode = "list";
      }
    },
  },
});

export const { changeState } = preferenceSlice.actions;
const preferenceReducer = preferenceSlice.reducer;
export default preferenceReducer;
