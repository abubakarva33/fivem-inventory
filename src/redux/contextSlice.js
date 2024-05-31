import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: null,
  item: null,
};

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    openContextMenu(state, action) {
      state.coords = action.payload.coords;
      state.item = action.payload.item;
    },
    closeContextMenu(state) {
      state.coords = null;
      state.item = null;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

const contextMenuReducer = contextMenuSlice.reducer;
export default contextMenuReducer;
