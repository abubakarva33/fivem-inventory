export let dummyItems = {
  water: {
    name: "water",
    label: "Water",
    type: "item",
    description: "This item will reduce your thirst",
    weight: 800,
    shouldClose: true,
  },
  bread: {
    name: "bread",
    label: "Bread",
    type: "item",
    description: "This item will reduce your hunger",
    weight: 500,
    shouldClose: true,
  },
  weapon_pistol: {
    name: "weapon_pistol",
    label: "Pistol",
    type: "weapon",
    description: "This is a pistol",
    weight: 2500,
    shouldClose: true,
  },
  "backpack-s": {
    name: "backpack-s",
    label: "Backpack Small",
    type: "backpack",
    description: "You can carry more items",
    weight: 250,
    shouldClose: true,
  },
  "backpack-l": {
    name: "backpack-l",
    label: "Backpack Large",
    type: "backpack",
    description: "You can carry more items",
    weight: 250,
    shouldClose: true,
  },
  at_suppressor_heavy: {
    name: "at_suppressor_heavy",
    label: "Suppressor Heavy",
    type: "item",
    description: "Heavy weapon suppressor",
    weight: 250,
    shouldClose: true,
  },
  at_grip: {
    name: "at_grip",
    label: "Heavy Grip",
    type: "item",
    description: "Heavy weapon grip",
    weight: 250,
    shouldClose: true,
  },
};

export let primaryInvDummyData = {
  identifier: "player1",
  type: "playerinventory",
  label: "Player Inventory",
  maxWeight: 15000.0,
  slots: 50,
  weight: 10000.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      slot: 1,
      info: {
        quality: 100,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 2,
      quality: 100,
      info: {
        quality: 100,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 4,
      quality: 100,
      info: {
        quality: 100,
      },
    },
    {
      name: "weapon_pistol",
      label: "Pistol",
      type: "weapon",
      description: "This is a pistol",
      weight: 2500,
      amount: 1,
      slot: 5,
      info: {
        ammo: 12,
        tint: 0,
        serial: 12345678,
        quality: 100,
        owner: "Player 1",
        components: {
          at_grip: {
            name: "at_grip",
            label: "Heavy Grip",
            type: "item",
            description: "Heavy weapon grip",
            quality: 100,
            weight: 250,
            slot: 1,
            shouldClose: true,
            info: {},
          },
          at_suppressor_heavy: {
            name: "at_suppressor_heavy",
            label: "Suppressor Heavy",
            type: "item",
            description: "Heavy weapon suppressor",
            quality: 100,
            weight: 250,
            slot: 7,
            shouldClose: true,
            info: {},
          },
        },
      },
    },
    {
      name: "backpack-s",
      label: "Backpack Small",
      type: "backpack",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 6,
      info: {
        identifier: "backpack-s:123456789",
        type: "backpack",
        type2: "smallBackpack",
        quality: 100,
      },
    },
    {
      name: "backpack-s",
      label: "Backpack Small",
      type: "backpack",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 10,
      info: {
        identifier: "backpack-s:1234",
        type: "backpack",
        type2: "smallBackpack",
        quality: 100,
      },
    },
    {
      name: "backpack-l",
      label: "Backpack Large",
      type: "backpack",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 7,
      info: {
        identifier: "backpack-l:123456789",
        type: "backpack",
        type2: "largeBackpack",
        quality: 100,
      },
    },
    {
      name: "backpack-l",
      label: "Backpack Large",
      type: "backpack",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 11,
      info: {
        identifier: "backpack-l:1234",
        type: "backpack",
        type2: "largeBackpack",
        quality: 100,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 12,
      quality: 100,
      info: {
        quality: 80,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 3,
      slot: 13,
      quality: 100,
      info: {
        quality: 100,
        dummy: 20,
      },
    },
  ],
};

export let smallBackpackDummyData = {
  identifier: "backpack-s:123456789",
  type: "backpack",
  type2: "smallBackpack",
  label: "Backpack Small",
  maxWeight: 25000.0,
  slots: 25,
  weight: 1300.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 9,
      info: {},
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 2,
      quality: 100,
      info: {},
    },
  ],
};

export let largeBackpackDummyData = {
  identifier: "backpack-l:123456789",
  type: "backpack",
  type2: "largeBackpack",
  label: "Backpack Large",
  maxWeight: 10000.0,
  slots: 30,
  weight: 1300.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 1,
      info: {},
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 2,
      quality: 70,
      info: {},
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 5,
      quality: 70,
      info: {},
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 6,
      quality: 70,
      info: {},
    },
  ],
};

// export let secondaryInvDummyData = null;
export let secondaryInvDummyData = {
  identifier: "glovebox-123456",
  type: "glovebox",
  label: "Glovebox-123456",
  maxWeight: 10000.0,
  slots: 5,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 1,
      info: {},
    },
  ],
};

export let dropInvDummyData = {
  identifier: "drop-123456",
  type: "drop",
  label: "Drop",
  maxWeight: 10000,
  slots: 25,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 1,
      info: {},
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 4,
      quality: 100,
      info: {
        quality: 100,
      },
    },
  ],
};

export let shopInvDummyData = {
  identifier: "shop-123456",
  type: "shop",
  label: "Shop",
  maxWeight: 1000000,
  slots: 3,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 25,
      quality: 100,
      slot: 1,
      info: {
        buyPrice: 25,
        sellPrice: 25,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: -1,
      quality: 100,
      slot: 2,
      info: {
        buyPrice: 20,
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 2,
      quality: 100,
      slot: 3,
      info: {
        sellPrice: 20,
      },
    },
  ],
};

export let craftingInvDummyData = {
  identifier: "crafting-123456",
  type: "crafting",
  label: "Crafting",
  maxWeight: 1000000,
  slots: 25,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      type: "item",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 5,
      quality: 100,
      slot: 1,
      info: {
        required: {
          bread: {
            amount: 1,
            label: "Bread",
          },
          water: {
            amount: 1,
            label: "Water",
          },
        },
      },
    },
    {
      name: "bread",
      label: "Bread",
      type: "item",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      quality: 100,
      slot: 2,
      info: {
        required: {
          bread: {
            amount: 1,
            label: "Bread",
          },
          water: {
            amount: 1,
            label: "Water",
          },
        },
      },
    },
  ],
};

//show this variables into description box (if the item have) when an item hovered.
let infoToDescription = {
  ammo: true,
  tint: true,
  serial: true,
  owner: true,
};
