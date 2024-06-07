import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: null,
  inventory: null,
  inputAmount: 0,
};

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    openContextMenu(state, action) {
      state.coords = action.payload.coords;
      state.inventory = action.payload.inventory;
    },
    handleContextInput(state, { payload }) {
      state.inputAmount = payload;
    },
    closeContextMenu(state) {
      state.coords = null;
      state.inventory = null;
    },
  },
});

export const { openContextMenu, closeContextMenu, handleContextInput } = contextMenuSlice.actions;

const contextMenuReducer = contextMenuSlice.reducer;
export default contextMenuReducer;
