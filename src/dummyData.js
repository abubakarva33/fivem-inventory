let dummyItems = {
  water: {
    name: "water",
    label: "Water",
    description: "This item will reduce your thirst",
    weight: 800,
    shouldClose: true,
  },
  bread: {
    name: "bread",
    label: "Bread",
    description: "This item will reduce your hunger",
    weight: 500,
    shouldClose: true,
  },
  weapon_pistol: {
    name: "weapon_pistol",
    label: "Pistol",
    description: "This is a pistol",
    weight: 2500,
    shouldClose: true,
  },
  "backpack-s": {
    name: "backpack-s",
    label: "Backpack Small",
    description: "You can carry more items",
    weight: 250,
    shouldClose: true,
  },
  "backpack-l": {
    name: "backpack-l",
    label: "Backpack Large",
    description: "You can carry more items",
    weight: 250,
    shouldClose: true,
  },
  at_suppressor_heavy: {
    name: "at_suppressor_heavy",
    label: "Suppressor Heavy",
    description: "Heavy weapon suppressor",
    weight: 250,
    shouldClose: true,
  },
  at_grip: {
    name: "at_grip",
    label: "Heavy Grip",
    description: "Heavy weapon grip",
    weight: 250,
    shouldClose: true,
  },
};

export let primaryInvDummyData = {
  identifier: "player1",
  type: "playerinventory",
  label: "Player Inventory",
  maxWeight: 50000.0,
  slots: 50,
  weight: 10000.0,
  items: [
    {
      name: "water",
      label: "Water",
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
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 2,
      quality: 100,
      info: {
        quality: 60.0,
      },
    },
    {
      name: "bread",
      label: "Bread",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      slot: 4,
      quality: 100,
      info: {
        quality: 70.0,
      },
    },
    {
      name: "weapon_pistol",
      label: "Pistol",
      description: "This is a pistol",
      weight: 2500,
      amount: 1,
      slot: 5,
      quality: 100,
      info: {
        ammo: 12,
        tint: 0,
        serial: 12345678,
        quality: 90.1,
        registered: "Player 1",
        components: {
          at_grip: {
            name: "at_grip",
            label: "Heavy Grip",
            description: "Heavy weapon grip",
            quality: 100,
            weight: 250,
            slot: 1,
            shouldClose: true,
          },
          at_suppressor_heavy: {
            name: "at_suppressor_heavy",
            label: "Suppressor Heavy",
            description: "Heavy weapon suppressor",
            quality: 100,
            weight: 250,
            slot: 7,
            shouldClose: true,
          },
        },
      },
    },
    {
      name: "backpack-s",
      label: "Backpack Small",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 6,
      quality: 100,
      info: {
        identifier: "backpack-s:123456789",
      },
    },
    {
      name: "backpack-l",
      label: "Backpack Large",
      description: "You can carry more items",
      weight: 250,
      amount: 1,
      slot: 7,
      quality: 100,
      info: {
        identifier: "backpack-l:123456789",
      },
    },
  ],
};

export let smallBackpackDummyData = {
  identifier: "backpack-s:123456789",
  type: "backpack",
  label: "Backpack Small",
  maxWeight: 25000.0,
  slots: 25,
  weight: 1300.0,
  items: [
    {
      name: "water",
      label: "Water",
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
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 2,
      quality: 100,
      info: {
        quality: 60.0,
      },
    },
  ],
};

export let largeBackpackDummyData = {
  identifier: "backpack-l:123456789",
  type: "backpack",
  label: "Backpack Large",
  maxWeight: 45000.0,
  slots: 30,
  weight: 1300.0,
  items: [
    {
      name: "water",
      label: "Water",
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
      weight: 500,
      description: "This item will reduce your hunger",
      amount: 5,
      slot: 2,
      quality: 70,
      info: {
        quality: 60.0,
      },
    },
  ],
};

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
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 1,
      info: {},
    },
  ],
};

let dropInvDummyData = {
  identifier: "drop-123456",
  type: "drop",
  label: "Drop",
  maxWeight: 1000000,
  slots: 25,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 1,
      quality: 100,
      slot: 1,
      info: {},
    },
  ],
};

let shopInvDummyData = {
  identifier: "shop-123456",
  type: "shop",
  label: "Shop",
  maxWeight: 1000000,
  slots: 25,
  weight: 100.0,
  items: [
    {
      name: "water",
      label: "Water",
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 25,
      quality: 100,
      slot: 1,
      info: {
        price: 25,
      },
    },
    {
      name: "bread",
      label: "Bread",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 25,
      quality: 100,
      slot: 2,
      info: {
        price: 20,
      },
    },
  ],
};

let craftingInvDummyData = {
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
      description: "This item will reduce your thirst",
      weight: 800,
      amount: 5,
      quality: 100,
      slot: 1,
      info: {
        required: {
          bread: 1,
          water: 1,
        },
      },
    },
    {
      name: "bread",
      label: "Bread",
      description: "This item will reduce your hunger",
      weight: 500,
      amount: 5,
      quality: 100,
      slot: 2,
      info: {
        required: {
          bread: 1,
          water: 1,
        },
      },
    },
  ],
};
