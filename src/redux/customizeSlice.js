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
  healthColor: "#FF00008A",
  armorColor: "#3690FF8A",
  hungerColor: "#FFA5008A",
  thirstColor: " #1CA9C98A",
  cashColor: "#FFFFFF8A",
  bankColor: "#FFFFFF8A",
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
      state.healthColor = "#FF00008A";
      state.armorColor = "#3690FF8A";
      state.hungerColor = "#FFA5008A";
      state.thirstColor = " #1CA9C98A";
      state.cashColor = "#FFFFFF8A";
      state.bankColor = "#FFFFFF8A";
    },
  },
});

export const { customizeInventory, restoreToDefault } = customizeSlice.actions;
const customizeSliceReducer = customizeSlice.reducer;
export default customizeSliceReducer;
