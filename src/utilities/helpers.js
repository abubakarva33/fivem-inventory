export const setupInventoryFn = (inventory, state, name) => {
  state[name] = {
    ...inventory,
    items: Array.from(Array(inventory.slots), (_, index) => {
      const item = inventory.items.find((item) => item?.slot === index + 1) || {
        slot: index + 1,
      };

      if (!item.name) return item;

      // if (typeof Items[item.name] === "undefined") {
      //   getItemData(item.name);
      // }
      // item.durability = itemDurability(item.metadata, curTime);
      return item;
    }),
  };
};
