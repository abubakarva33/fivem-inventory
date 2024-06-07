import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boxBg: "#00000040",
  boxBorderColor: "#000000",
  boxBorderRound: 10,
  slotBg: "#00000080",
  slotBorderColor: "#000000",
  slotBorderRound: 10,
  textColor: "#cccccc",
  btnColor: "#000000b3",
  hudBg: "#00000080",
  hudBorderColor: "#00000080",
};

export const customizeSlice = createSlice({
  name: "customizeSec",
  initialState,
  reducers: {
    customizeInventory: (state, { payload }) => {
      // Use Object.assign to update the state with the properties from the payload
      Object.assign(state, payload);
    },
  },
});

export const { customizeInventory } = customizeSlice.actions;
const customizeSliceReducer = customizeSlice.reducer;
export default customizeSliceReducer;
