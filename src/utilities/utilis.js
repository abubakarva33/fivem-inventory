export const gramsToKilograms = (grams) => {
  const kilograms = grams / 1000;
  return kilograms;
};

export const inventoryTypeChange = {
  backpack: "backpackInventory",
  playerinventory: "primaryInventory",
  glovebox: "secondaryInventory",
};
