export const hideRoot = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.style.display = "none";
  }
};
export const showRoot = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.style.display = "block";
  }
};

export const gramsToKilograms = (grams) => {
  const kilograms = grams / 1000;
  return kilograms;
};

export const calculateTotalWeight = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    const weight = Number(item.weight);
    return total + (isNaN(weight) ? 0 : weight);
  }, 0);
};

export const checkItemsPresence = (items) => {
  return items?.some((item) => "name" in item);
};
export const findSomethingInItems = (items, something) => {
  return items?.some((item) => item.name && item.name.includes(something));
};

export const setupInventoryFn = (inventory, state, name) => {
  const weight = calculateTotalWeight(inventory?.items);
  state[name] = {
    ...inventory,
    weight,
    weightPercent: (weight * 100) / inventory?.maxWeight,
    items: Array.from(Array(inventory?.slots), (_, index) => {
      const item = inventory?.items?.find((item) => item?.slot === index + 1) || {
        slot: index + 1,
      };
      return item;
    }),
  };
};

// TODO: give me all possible types here //
export const secondaryTypes = {
  glovebox: "glovebox",
  ground: "ground",
};
