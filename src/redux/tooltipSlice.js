import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  item: null,
  inventoryType: null,
};

export const tooltipSlice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    openTooltip(state, { payload }) {
      state.open = true;
      state.item = payload.item;
      state.inventoryType = payload.inventoryType;
    },
    closeTooltip(state) {
      state.open = false;
      state.item = null;
      state.inventoryType = null;
    },
  },
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;
const tooltipReducer = tooltipSlice.reducer;
export default tooltipReducer;
