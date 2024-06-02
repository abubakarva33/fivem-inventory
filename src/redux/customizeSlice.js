import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slotBg: "rgb(144 140 140 / 50%)",
  slotBorder: "#908c8c",
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
