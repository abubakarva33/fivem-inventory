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
  tooltipBg: "#212121",
  tooltipBorderColor: "#cccccc",
  healthColor: "#FF0000",
  armorColor: "#0000FF",
  hungerColor: "#FFA500",
  thirstColor: " #1CA9C9",
  cashColor: "#FFFFFF",
  bankColor: "#FFFFFF",
};

export const customizeSlice = createSlice({
  name: "customizeSec",
  initialState,
  reducers: {
    customizeInventory: (state, { payload }) => {
      Object.assign(state, payload);
    },
    restoreToDefault: (state) => {
      state.boxBg = "#00000040";
      state.boxBorderColor = "#000000";
      state.boxBorderRound = 10;
      state.slotBg = "#00000080";
      state.slotBorderColor = "#000000";
      state.slotBorderRound = 10;
      state.textColor = "#cccccc";
      state.btnColor = "#000000b3";
      state.hudBg = "#00000080";
      state.hudBorderColor = "#00000080";
      state.tooltipBg = "#212121";
      state.tooltipBorderColor = "#cccccc";
      state.healthColor = "#FF0000";
      state.armorColor = "#0000FF";
      state.hungerColor = "#FFA500";
      state.thirstColor = " #1CA9C9";
      state.cashColor = "#FFFFFF";
      state.bankColor = "#FFFFFF";
    },
  },
});

export const { customizeInventory, restoreToDefault } = customizeSlice.actions;
const customizeSliceReducer = customizeSlice.reducer;
export default customizeSliceReducer;
