import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boxBg: "rgb(144 140 140 / 50%)",
  boxBorderColor: "#f54e",
  boxBorderRound: 10,
  slotBg: "rgb(144 140 140 / 50%)",
  slotBorderColor: "#908c8c",
  slotBorderRound: 10,
};

export const customizeSlice = createSlice({
  name: "customizeSec",
  initialState,
  reducers: {
    customizeSlot: (state, { payload }) => {
      state.slotBg = payload;
      state.slotBorderColor = payload;
    },
    customizeSlotDummy: (state, { payload }) => {
      state.slotBg = payload;
      state.slotBorderColor = payload;
    },
  },
});

export const { customizeSlot, customizeSlotDummy } = customizeSlice.actions;
const customizeSliceReducer = customizeSlice.reducer;
export default customizeSliceReducer;
