import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalWeight, includedTypes, isObjMatched } from "../utilities/utilis";

const initialState = {};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setupInventory: (state, { payload }) => {
      const { item, type } = payload;
      const excludedTypes = Object.keys(state).filter(
        (i) => ![...includedTypes, "drop"].includes(i)
      );
      if (type === "drop") {
        if (!item) {
          delete state?.drop;
        }
      } else if (excludedTypes.length && !includedTypes.includes(type)) {
        excludedTypes.map((inv) => delete state[inv]);
      }
      if (item) {
        const weight = calculateTotalWeight(item?.items);
        state[type] = {
          ...item,
          weight,
          weightPercent: (weight * 100) / item?.maxWeight,
          items: Array.from(Array(item?.slots), (_, index) => {
            const inv = item?.items?.find((item) => item?.slot === index + 1) || {
              slot: index + 1,
            };
            return inv;
          }),
        };
      }
    },

    changeSlot: (state, { payload }) => {
      const { source, targetInventory } = payload;

      const sourceType = source.type === "backpack" ? source.type2 : source.type;
      const targetType =
        targetInventory.type === "backpack" ? targetInventory.type2 : targetInventory.type;

      const findSource = source.type
        ? state[sourceType]?.items?.find((item) => item.slot === source.item.slot)
        : undefined;

      const findTarget = targetInventory.type
        ? state[targetType]?.items?.find((item) => item.slot === targetInventory.item.slot)
        : undefined;

      if (findSource && findTarget) {
        state[sourceType].items = state[sourceType].items.map((item) => {
          if (item.slot === source.item.slot) {
            // condition for same item [ addition of quantity] //
            if (
              findSource.name === findTarget.name &&
              isObjMatched(findSource?.info, findTarget?.info)
            )
              return { item: item.slot };
            return { ...findTarget, slot: item.slot };
          }
          return item;
        });

        state[targetType].items = state[targetType].items.map((item) => {
          if (item.slot === targetInventory.item.slot) {
            // condition for same item [ addition of quantity] //
            if (
              findSource.name === findTarget.name &&
              isObjMatched(findSource?.info, findTarget?.info)
            ) {
              return { ...findSource, amount: item.amount + findSource.amount, slot: item.slot };
            }
            return { ...findSource, slot: item.slot };
          }
          return item;
        });

        // target
        const targetWeight = calculateTotalWeight(state[targetType].items);
        state[targetType] = {
          ...state[targetType],
          weight: targetWeight,
          weightPercent: (targetWeight * 100) / state[targetType].maxWeight,
        };
        // source
        const sourceWeight = calculateTotalWeight(state[sourceType].items);
        state[sourceType] = {
          ...state[sourceType],
          weight: sourceWeight,
          weightPercent: (sourceWeight * 100) / state[sourceType].maxWeight,
        };
      } else {
        console.log("not found");
      }
    },
    clearInventory: (state) => {
      state.playerinventory = null;
    },
  },
});

export const { setupInventory, changeSlot, clearInventory } = inventorySlice.actions;
const inventorySliceReducer = inventorySlice.reducer;
export default inventorySliceReducer;
