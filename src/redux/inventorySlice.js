import { createSlice } from "@reduxjs/toolkit";
import { setupInventoryFn } from "../utilities/utilis";

const initialState = {};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setupInventory: (state, { payload }) => {
      const { item, type } = payload;
      setupInventoryFn(item, state, type);
    },

    changeSlot: (state, { payload }) => {
      const { source, targetInventory } = payload;

      const findSource = source.inventory
        ? state[source.inventory]?.items?.find((item) => item.slot === source.item.slot)
        : undefined;

      const findTarget = targetInventory.inventory
        ? state[targetInventory.inventory]?.items?.find(
            (item) => item.slot === targetInventory.item.slot
          )
        : undefined;

      if (findSource && findTarget) {
        state[source.inventory].items = state[source.inventory].items.map((item) => {
          if (item.slot === source.item.slot) {
            return { ...findTarget, slot: item.slot };
          }
          return item;
        });

        state[targetInventory.inventory].items = state[targetInventory.inventory].items.map(
          (item) => {
            if (item.slot === targetInventory.item.slot) {
              return { ...findSource, slot: item.slot };
            }
            return item;
          }
        );
      } else {
        console.log("not found");
      }
    },
  },
});

export const { setupInventory, changeSlot } = inventorySlice.actions;
const inventorySliceReducer = inventorySlice.reducer;
export default inventorySliceReducer;
