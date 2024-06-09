import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: null,
  inventory: null,
  selectedItems: [],
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
    closeContextMenu(state) {
      state.coords = null;
      state.inventory = null;
    },
    handleContextInput(state, { payload }) {
      state.inputAmount = payload;
    },
    handleSelectedItems(state, { payload }) {
      const selected = state.selectedItems.find((x) =>(x.identifier === state.inventory?.identifier && x.name === state.inventory?.item?.name && x.slot === state.inventory?.item?.slot) 
      );

      if (selected) {
        selected.selectedAmount = payload

      } else {
        state.selectedItems = [
          ...state.selectedItems,
          { 
            identifier:  state.inventory?.identifier , 
            amount:state.inventory?.item?.amount, 
            name:state.inventory?.item?.name, 
            slot: state.inventory?.item?.slot, 
            selectedAmount: payload 
          },
        ];
      }
    },
  },
});

export const { openContextMenu, closeContextMenu, handleContextInput, handleSelectedItems } =
  contextMenuSlice.actions;

const contextMenuReducer = contextMenuSlice.reducer;
export default contextMenuReducer;
