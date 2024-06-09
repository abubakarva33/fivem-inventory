import { fetchNui } from "./fetchNui";

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
    const weight = Number(item.weight) * item.amount;
    return total + (isNaN(weight) ? 0 : weight);
  }, 0);
};

export const checkItemsPresence = (items) => {
  return items?.some((item) => "name" in item);
};

export const includedTypes = ["largeBackpack", "smallBackpack", "playerinventory"];

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
  playerinventory: "playerinventory",
  glovebox: "glovebox",
  trunk: "trunk",
  stash: "stash",
  dumpster: "dumpster",
  crafting: "crafting",
  shop: "shop",
  ground: "ground",
};

export const keyMap = {
  BACK: 8,
  TAB: 9,
  RETURN: 13,
  PAUSE: 19,
  CAPITAL: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGEUP: 33,
  PRIOR: 33,
  PAGEDOWN: 34,
  NEXT: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SYSRQ: 44,
  SNAPSHOT: 44,
  INSERT: 45,
  DELETE: 46,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  LWIN: 91,
  RWIN: 92,
  APPS: 93,
  NUMPAD0: 96,
  NUMPAD1: 97,
  NUMPAD2: 98,
  NUMPAD3: 99,
  NUMPAD4: 100,
  NUMPAD5: 101,
  NUMPAD6: 102,
  NUMPAD7: 103,
  NUMPAD8: 104,
  NUMPAD9: 105,
  MULTIPLY: 106,
  ADD: 107,
  SUBTRACT: 109,
  DECIMAL: 110,
  DIVIDE: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  F13: 124,
  F14: 125,
  F15: 126,
  F16: 127,
  F17: 128,
  F18: 129,
  F19: 130,
  F20: 131,
  F21: 132,
  F22: 133,
  F23: 134,
  F24: 135,
  NUMLOCK: 144,
  SCROLL: 145,
  LSHIFT: 160,
  RSHIFT: 161,
  LCONTROL: 162,
  RCONTROL: 163,
  LMENU: 164,
  RMENU: 165,
  OEM_1: 186,
  SEMICOLON: 186,
  EQUALS: 187,
  PLUS: 187,
  COMMA: 188,
  MINUS: 189,
  PERIOD: 190,
  SLASH: 191,
  OEM_2: 191,
  OEM_3: 192,
  GRAVE: 192,
  LBRACKET: 219,
  OEM_4: 219,
  OEM_5: 220,
  BACKSLASH: 220,
  OEM_6: 221,
  RBRACKET: 221,
  APOSTROPHE: 222,
  OEM_7: 222,
  OEM_102: 226,
};
export const UpdateDataToServer = (data) => {
  if (data.identifier) {
    fetchNui("changeSlot", data)
      .then((retData) => {})
      .catch((e) => {});
  } else {
    fetchNui("transfer", data)
      .then((retData) => {})
      .catch((e) => {});
  }
};
export const buyItemHandlerWithDnd = (item) => {
  fetchNui("buyItemDrag", item)
    .then((retData) => {})
    .catch((e) => {});
};
export const sellItemHandlerWithDnd = (item) => {
  fetchNui("sellItemDrag", item)
    .then((retData) => {})
    .catch((e) => {});
};
export const buyItemHandlerWithClick = (item) => {
  fetchNui("buyItem", item)
    .then((retData) => {})
    .catch((e) => {});

  // add this as last line for closing right menu //
  // dispatch(closeContextMenu());
};
export const sellItemHandlerWithClick = (item) => {
  fetchNui("sellItem", item)
    .then((retData) => {})
    .catch((e) => {});

  // add this as last line for closing right menu //
  // dispatch(closeContextMenu());
};
export const CraftItemHandler = (item) => {
  fetchNui("craftItem", item)
    .then((retData) => {})
    .catch((e) => {});

  // add this as last line for closing right menu //
  // dispatch(closeContextMenu());
};

export const isObjMatched = (obj1, obj2) => {
  const type1 = typeof obj1;
  const type2 = typeof obj2;

  if (type1 !== type2) return false;
  if (type1 !== "object" && type2 !== "object") return obj1 === obj2;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!isObjMatched(value1, value2)) return false;
  }

  return true;
};

export const calculateRGB = (value) => {
  // Define the start and end RGB values
  const startRGB = { r: 175, g: 0, b: 0 }; // RGB for value 0
  const endRGB = { r: 46, g: 189, b: 0 }; // RGB for value 100

  // Ensure value is within the range [0, 100]
  value = Math.max(0, Math.min(100, value));

  // Calculate the difference in RGB values
  const diffR = endRGB.r - startRGB.r;
  const diffG = endRGB.g - startRGB.g;
  const diffB = endRGB.b - startRGB.b;

  // Calculate the RGB based on the value
  const r = startRGB.r + diffR * (value / 100);
  const g = startRGB.g + diffG * (value / 100);
  const b = startRGB.b + diffB * (value / 100);

  // Return the calculated RGB values
  return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
};

export const calculateRGBRev = (value) => {
  // Define the start and end RGB values
  const startRGB = { r: 46, g: 189, b: 0 }; // RGB for value 100
  const endRGB = { r: 175, g: 0, b: 0 }; // RGB for value 0

  // Ensure value is within the range [0, 100]
  value = Math.max(0, Math.min(100, value));

  // Calculate the difference in RGB values
  const diffR = endRGB.r - startRGB.r;
  const diffG = endRGB.g - startRGB.g;
  const diffB = endRGB.b - startRGB.b;

  // Calculate the RGB based on the value
  const r = startRGB.r + diffR * (value / 100);
  const g = startRGB.g + diffG * (value / 100);
  const b = startRGB.b + diffB * (value / 100);

  // Return the calculated RGB values
  return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
};
