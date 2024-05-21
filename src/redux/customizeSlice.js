import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slotBg: "#555",
  slotBorder: "#666",
};

export const customizeSlice = createSlice({
  name: "customizeSec",
  initialState,
  reducers: {
    customizeSlot: (state, { payload }) => {
      state.slotBg = payload;
      state.slotBorder = payload;
    },
  },
});

export const { customizeSlot } = customizeSlice.actions;
const customizeSliceReducer = customizeSlice.reducer;
export default customizeSliceReducer;