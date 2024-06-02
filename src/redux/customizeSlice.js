import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boxBg: "rgb(0 0 0 / 25%)",
  boxBorderColor: "rgb(0, 0, 0)",
  boxBorderRound: 10,
  slotBg: "rgb(0 0 0 / 50%)",
  slotBorderColor: "rgb(0, 0, 0)",
  slotBorderRound: 10,
  textColor: "rgb(204, 204, 204)",
  btnColor: "rgb(0 0 0 / 70%)",
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
