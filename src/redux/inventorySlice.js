import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalWeight, setupInventoryFn } from "../utilities/utilis";

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

      const findSource = source.type
        ? state[source.type]?.items?.find((item) => item.slot === source.item.slot)
        : undefined;

      const findTarget = targetInventory.type
        ? state[targetInventory.type]?.items?.find(
            (item) => item.slot === targetInventory.item.slot
          )
        : undefined;

      if (findSource && findTarget) {
        state[source.type].items = state[source.type].items.map((item) => {
          if (item.slot === source.item.slot) {
            // console.log({ item: item.amount, slot: item.slot });
            return { ...findTarget, slot: item.slot };
          }
          return item;
        });

        state[targetInventory.type].items = state[targetInventory.type].items.map((item) => {
          if (item.slot === targetInventory.item.slot) {
            return { ...findSource, slot: item.slot };
          }
          return item;
        });

        // target
        const targetWeight = calculateTotalWeight(state[targetInventory.type].items);
        state[targetInventory.type] = {
          ...state[targetInventory.type],
          weight: targetWeight,
          weightPercent: (targetWeight * 100) / state[targetInventory.type].maxWeight,
        };
        // source
        const sourceWeight = calculateTotalWeight(state[source.type].items);
        state[source.type] = {
          ...state[source.type],
          weight: sourceWeight,
          weightPercent: (sourceWeight * 100) / state[source.type].maxWeight,
        };
      } else {
        console.log("not found");
      }
    },
  },
});

export const { setupInventory, changeSlot } = inventorySlice.actions;
const inventorySliceReducer = inventorySlice.reducer;
export default inventorySliceReducer;
