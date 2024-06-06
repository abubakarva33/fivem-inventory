import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: null,
  item: null,
  inventoryType: null,
  inputAmount: 0,
};

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    openContextMenu(state, action) {
      state.coords = action.payload.coords;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
    },
    handleContextInput(state, { payload }) {
      state.inputAmount = payload;
    },
    closeContextMenu(state) {
      state.coords = null;
      state.item = null;
      state.inventoryType = null;
    },
  },
});

export const { openContextMenu, closeContextMenu, handleContextInput } = contextMenuSlice.actions;

const contextMenuReducer = contextMenuSlice.reducer;
export default contextMenuReducer;
