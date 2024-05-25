import {
  createSlice,
  // current,
  // isFulfilled,
  // isPending,
  // isRejected,
  // PayloadAction,
} from "@reduxjs/toolkit";
import { setupInventoryFn } from "../utilities/helpers";
const Items = {
  water: {
    name: "water",
    close: false,
    label: "VODA",
    stack: true,
    usable: true,
    count: 5,
  },
  burger: {
    name: "burger",
    close: false,
    label: "BURGR",
    stack: false,
    usable: false,
    count: 3,
  },
};

const initialState = {
  backpackInventory: {
    id: "",
    type: "",
    slots: 0,
    maxWeight: 0,
    items: [],
  },
  primaryInventory: {
    id: "",
    type: "",
    slots: 0,
    maxWeight: 0,
    items: [],
  },
  secondaryInventory: {
    id: "",
    type: "",
    slots: 0,
    maxWeight: 0,
    items: [],
  },
  additionalMetadata: new Array(),
  itemAmount: 0,
  shiftPressed: false,
  isBusy: false,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    // stackSlots: (state, action) => {
    //   const { fromSlot, fromType, toSlot, toType, count } = action.payload;

    //   const { sourceInventory, targetInventory } = getTargetInventory(state, fromType, toType);

    //   const pieceWeight = fromSlot.weight / fromSlot.count;

    //   targetInventory.items[toSlot.slot - 1] = {
    //     ...targetInventory.items[toSlot.slot - 1],
    //     count: toSlot.count + count,
    //     weight: pieceWeight * (toSlot.count + count),
    //   };

    //   if (fromType === "shop" || fromType === "crafting") return;

    //   sourceInventory.items[fromSlot.slot - 1] =
    //     fromSlot.count - count > 0
    //       ? {
    //           ...sourceInventory.items[fromSlot.slot - 1],
    //           count: fromSlot.count - count,
    //           weight: pieceWeight * (fromSlot.count - count),
    //         }
    //       : {
    //           slot: fromSlot.slot,
    //         };
    // },
    // swapSlots: (state, action) => {
    //   const { fromSlot, fromType, toSlot, toType } = action.payload;
    //   const { sourceInventory, targetInventory } = getTargetInventory(state, fromType, toType);
    //   const curTime = Math.floor(Date.now() / 1000);

    //   [sourceInventory.items[fromSlot.slot - 1], targetInventory.items[toSlot.slot - 1]] = [
    //     {
    //       ...targetInventory.items[toSlot.slot - 1],
    //       slot: fromSlot.slot,
    //       durability: itemDurability(toSlot.metadata, curTime),
    //     },
    //     {
    //       ...sourceInventory.items[fromSlot.slot - 1],
    //       slot: toSlot.slot,
    //       durability: itemDurability(fromSlot.metadata, curTime),
    //     },
    //   ];
    // },
    setupInventory: (state, action) => {
      const { backpackInventory, primaryInventory, secondaryInventory } = action.payload;
      if (backpackInventory) {
        setupInventoryFn(backpackInventory, state, "backpackInventory");
      }
      if (primaryInventory) {
        setupInventoryFn(primaryInventory, state, "primaryInventory");
      }
      if (secondaryInventory) {
        setupInventoryFn(secondaryInventory, state, "secondaryInventory");
      }
      state.shiftPressed = false;
      state.isBusy = false;
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
        // const temp = { ...findSource };
        // console.log({temp})
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
    // moveSlots: (state, action) => {
    //   const { fromSlot, fromType, toSlot, toType, count } = action.payload;
    //   const { sourceInventory, targetInventory } = getTargetInventory(state, fromType, toType);
    //   const pieceWeight = fromSlot.weight / fromSlot.count;
    //   const curTime = Math.floor(Date.now() / 1000);
    //   const fromItem = sourceInventory.items[fromSlot.slot - 1];

    //   targetInventory.items[toSlot.slot - 1] = {
    //     ...fromItem,
    //     count: count,
    //     weight: pieceWeight * count,
    //     slot: toSlot.slot,
    //     durability: itemDurability(fromItem.metadata, curTime),
    //   };

    //   if (fromType === "shop" || fromType === "crafting") return;

    //   sourceInventory.items[fromSlot.slot - 1] =
    //     fromSlot.count - count > 0
    //       ? {
    //           ...sourceInventory.items[fromSlot.slot - 1],
    //           count: fromSlot.count - count,
    //           weight: pieceWeight * (fromSlot.count - count),
    //         }
    //       : {
    //           slot: fromSlot.slot,
    //         };
    // },
    // refreshSlots: (state, action) => {
    //   if (action.payload.items) {
    //     if (!Array.isArray(action.payload.items)) action.payload.items = [action.payload.items];
    //     const curTime = Math.floor(Date.now() / 1000);

    //     Object.values(action.payload.items)
    //       .filter((data) => !!data)
    //       .forEach((data) => {
    //         const targetInventory = data.inventory
    //           ? data.inventory !== "player"
    //             ? state.rightInventory
    //             : state.leftInventory
    //           : state.leftInventory;

    //         data.item.durability = itemDurability(data.item.metadata, curTime);
    //         targetInventory.items[data.item.slot - 1] = data.item;
    //       });

    //     // Janky workaround to force a state rerender for crafting inventory to
    //     // run canCraftItem checks
    //     if (state.rightInventory.type === "crafting") {
    //       state.rightInventory = { ...state.rightInventory };
    //     }
    //   }

    //   if (action.payload.itemCount) {
    //     const items = Object.entries(action.payload.itemCount);

    //     for (let i = 0; i < items.length; i++) {
    //       const item = items[i][0];
    //       const count = items[i][1];

    //       if (Items[item]!) {
    //         Items[item]!.count += count;
    //       } else console.log(`Item data for ${item} is undefined`);
    //     }
    //   }

    //   // Refresh maxWeight when SetMaxWeight is ran while an inventory is open
    //   if (action.payload.weightData) {
    //     const inventoryId = action.payload.weightData.inventoryId;
    //     const inventoryMaxWeight = action.payload.weightData.maxWeight;
    //     const inv =
    //       inventoryId === state.leftInventory.id
    //         ? 'leftInventory'
    //         : inventoryId === state.rightInventory.id
    //         ? 'rightInventory'
    //         : null;

    //     if (!inv) return;

    //     state[inv].maxWeight = inventoryMaxWeight;
    //   }

    //   if (action.payload.slotsData) {
    //     const { inventoryId } = action.payload.slotsData;
    //     const { slots } = action.payload.slotsData;

    //     const inv =
    //       inventoryId === state.leftInventory.id
    //         ? 'leftInventory'
    //         : inventoryId === state.rightInventory.id
    //         ? 'rightInventory'
    //         : null;

    //     if (!inv) return;

    //     state[inv].slots = slots;
    //     inventorySlice.caseReducers.setupInventory(state, {
    //       type: 'setupInventory',
    //       payload: {
    //         leftInventory: inv === 'leftInventory' ? state[inv] : undefined,
    //         rightInventory: inv === 'rightInventory' ? state[inv] : undefined,
    //       },
    //     });
    //   }
    // },
    // setAdditionalMetadata: (state, action) => {
    //   const metadata = [];

    //   for (let i = 0; i < action.payload.length; i++) {
    //     const entry = action.payload[i];
    //     if (!state.additionalMetadata.find((el) => el.value === entry.value)) metadata.push(entry);
    //   }

    //   state.additionalMetadata = [...state.additionalMetadata, ...metadata];
    // },
    // setItemAmount: (state, action) => {
    //   state.itemAmount = action.payload;
    // },
    // setShiftPressed: (state, action) => {
    //   state.shiftPressed = action.payload;
    // },
    // setContainerWeight: (state, action) => {
    //   const container = state.leftInventory.items.find((item) => item.metadata?.container === state.rightInventory.id);

    //   if (!container) return;

    //   container.weight = action.payload;
    // },
  },
  //   extraReducers: (builder) => {
  //     builder.addMatcher(isPending, (state) => {
  //       state.isBusy = true;

  //       state.history = {
  //         leftInventory: current(state.leftInventory),
  //         rightInventory: current(state.rightInventory),
  //       };
  //     });
  //     builder.addMatcher(isFulfilled, (state) => {
  //       state.isBusy = false;
  //     });
  //     builder.addMatcher(isRejected, (state) => {
  //       if (state.history && state.history.leftInventory && state.history.rightInventory) {
  //         state.leftInventory = state.history.leftInventory;
  //         state.rightInventory = state.history.rightInventory;
  //       }
  //       state.isBusy = false;
  //     });
  //   },
});

export const {
  // setAdditionalMetadata,
  // setItemAmount,
  // setShiftPressed,
  setupInventory,
  changeSlot,
  // swapSlots,
  // moveSlots,
  // stackSlots,
  // refreshSlots,
  // setContainerWeight,
} = inventorySlice.actions;
const inventorySliceReducer = inventorySlice.reducer;
export default inventorySliceReducer;
