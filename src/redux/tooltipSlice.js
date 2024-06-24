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
    openTooltip(state, action) {
      state.open = true;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
    },
    closeTooltip(state) {
      state.open = false;
    },
  },
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;
const tooltipReducer = tooltipSlice.reducer;
export default tooltipReducer;
