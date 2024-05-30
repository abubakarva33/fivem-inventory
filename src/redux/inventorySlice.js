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
            console.log({ ...findTarget, slot: item.slot});
            return { ...findTarget, slot: item.slot };
          }
          return item;
        });

        state[targetInventory.inventory].items = state[targetInventory.inventory].items.map(
          (item) => {
            if (item.slot === targetInventory.item.slot) {
              console.log({ amount: findSource?.amount + item?.amount });
              return { ...findSource, slot: item.slot };
            }
            return item;
          }
        );

        // target
        const targetWeight = calculateTotalWeight(state[targetInventory.inventory].items);
        state[targetInventory.inventory] = {
          ...state[targetInventory.inventory],
          weight: targetWeight,
          weightPercent: (targetWeight * 100) / state[targetInventory.inventory].maxWeight,
        };
        // source
        const sourceWeight = calculateTotalWeight(state[source.inventory].items);
        state[source.inventory] = {
          ...state[source.inventory],
          weight: sourceWeight,
          weightPercent: (sourceWeight * 100) / state[source.inventory].maxWeight,
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
