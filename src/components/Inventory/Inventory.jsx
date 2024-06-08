import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  closeContextMenu,
  handleContextInput,
  handleSelectedItems,
} from "../../redux/contextSlice";
import { fetchNui } from "../../utilities/fetchNui";
import CustomizeInventory from "../CustomizeInventory/CustomizeInventory";
import {
  CraftItemHandler,
  buyItemHandlerWithClick,
  sellItemHandlerWithClick,
} from "../../utilities/utilis";

const Inventory = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { inventory, coords, selectedItems } = useSelector((state) => state.context);
  const [openBackpacks, setOpenBackpacks] = useState([]);
  const [secondaryBackpacks, setSecondaryBackpacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState({});

  useEffect(() => {
    const number = selectedItems.find(
      (x) =>
        x?.identifier === inventory?.identifier &&
        x?.name === inventory?.item?.name &&
        x.slot === inventory?.item?.slot
    );
    console.log({ number });
    setInputAmount(number);
  }, [selectedItems, inventory]);

  useEffect(() => {
    const inventoryKeys = Object.keys(state);
    const excludedTypes = ["largeBackpack", "smallBackpack", "playerinventory"];
    const filteredInventory = inventoryKeys.filter((key) => !excludedTypes.includes(key));
    const filteredItems = filteredInventory.map((key) => {
      if (state[key]) {
        return state[key];
      } else {
        return null;
      }
    });
    if (filteredItems.length === 2 && filteredItems[0].type === "drop") {
      [filteredItems[0], filteredItems[1]] = [filteredItems[1], filteredItems[0]];
    }
    //  dynamically sets secondary backpacks data //
    setSecondaryBackpacks(filteredItems);
  }, [state]);

  useEffect(() => {
    const keyHandler = (e) => {
      if (!e.target.closest(".no-close")) {
        dispatch(closeContextMenu());
      }
    };

    window.addEventListener("click", keyHandler);
    return () => {
      window.removeEventListener("click", keyHandler);
    };
  }, []);

  const openBackpackHandler = (backpackData, action) => {
    setOpenBackpacks((prevOpenBackpacks) => {
      const name = backpackData?.name;
      let updatedBackpacks = [...prevOpenBackpacks];

      const existingBackpackIndex = updatedBackpacks.findIndex(
        (backpack) => backpack.info.type2 === backpackData.info.type2
      );

      // Handle closing the backpack
      if (action) {
        if (existingBackpackIndex !== -1) {
          const backpackToClose = updatedBackpacks[existingBackpackIndex];
          fetchNui("closeBackpack", backpackToClose.info)
            .then((retData) => {})
            .catch((e) => {});
          updatedBackpacks.splice(existingBackpackIndex, 1); // Remove the existing backpack
        }
        return updatedBackpacks;
      }

      // Handle opening the backpack
      if (existingBackpackIndex !== -1) {
        const backpackToClose = updatedBackpacks[existingBackpackIndex];
        fetchNui("closeBackpack", backpackToClose.info)
          .then((retData) => {})
          .catch((e) => {});
        updatedBackpacks.splice(existingBackpackIndex, 1); // Remove the existing backpack
      }

      // If the array has reached the limit of 2 items, remove the oldest one
      if (updatedBackpacks.length >= 2) {
        const backpackToClose = updatedBackpacks.shift();
        fetchNui("closeBackpack", backpackToClose.info)
          .then((retData) => {})
          .catch((e) => {});
      }

      // Open the new backpack
      fetchNui("openBackpack", backpackData.info)
        .then((retData) => {})
        .catch((e) => {});
      updatedBackpacks.push(backpackData);

      dispatch(closeContextMenu());

      return updatedBackpacks;
    });
  };

  const dropHandler = (item) => {
    fetchNui("drop", item)
      .then((retData) => {})
      .catch((e) => {});
    dispatch(closeContextMenu());
  };
  return (
    <div className="mainSection relative">
      <div className="inventory">
        {openBackpacks?.length && <BackpackSection openBackpacks={openBackpacks} />}

        <MainAreaSection
          inventory={state.playerinventory}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {secondaryBackpacks?.length && !isModalOpen && (
          <SecondaryArea secondaryBackpacks={secondaryBackpacks} />
        )}
        {isModalOpen && <CustomizeInventory />}
      </div>

      {/* // right click menu // */}
      {inventory?.item?.name && (
        <div
          className="absolute w-[150px] no-close z-[500]"
          onClick={(e) => e.stopPropagation()}
          style={{ top: coords?.y, left: coords?.x }}
        >
          <div className="flex flex-col bg-slate-800 text-white">
            <div className="flex">
              <button
                className="border py-1 border-b-0 w-1/4"
                // onClick={() => dispatch(handleContextInput(inputAmount - 1))}
                disabled={(inputAmount?.selectedAmount || 0) <= 0}
                onClick={() =>
                  dispatch(handleSelectedItems((inputAmount?.selectedAmount || 0) - 1))
                }
              >
                -
              </button>
              <input
                type="number"
                className="w-1/2  bg-slate-800 text-center border-t outline-none "
                style={{ color: "white" }}
                value={inputAmount?.selectedAmount || 0}
                onChange={(e) => dispatch(handleSelectedItems(Number(e.target.value)))}
              />
              <button
                className="border py-1 border-b-0 w-1/4 text-white"
                style={{ cursor: "pointer" }}
                // onClick={() => dispatch(handleContextInput(inputAmount + 1))}
                disabled={
                  inventory?.item?.amount > 0 &&
                  inventory?.item?.amount <= inputAmount?.selectedAmount
                }
                onClick={() =>
                  dispatch(handleSelectedItems((inputAmount?.selectedAmount || 0) + 1))
                }
              >
                +
              </button>
            </div>
            {!inventory?.item?.name?.includes("backpack") &&
              inventory?.type === "playerinventory" && (
                <button
                  className="border py-1 border-b-0"
                  onClick={() => dispatch(closeContextMenu())}
                >
                  Use
                </button>
              )}

            {inventory?.item?.name?.includes("backpack") && (
              <button
                className="border py-1 border-b-0"
                onClick={() =>
                  openBackpackHandler(
                    inventory?.item,
                    openBackpacks.some(
                      (backpack) => backpack.info?.identifier === inventory?.item.info?.identifier
                    )
                  )
                }
              >
                {openBackpacks.some(
                  (backpack) => backpack.info?.identifier === inventory?.item.info?.identifier
                )
                  ? "Close"
                  : "Open"}
              </button>
            )}
            {inventory?.type === "shop" && inventory?.item?.info?.buyPrice && (
              <button
                className="border py-1"
                onClick={() =>
                  buyItemHandlerWithClick({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount: inputAmount === 0 ? 1 : inputAmount,
                    },
                  })
                }
              >
                Buy
              </button>
            )}
            {inventory?.type === "shop" && inventory?.item?.info?.sellPrice && (
              <button
                className="border py-1"
                onClick={() =>
                  sellItemHandlerWithClick({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount: inputAmount === 0 ? 1 : inputAmount,
                    },
                  })
                }
              >
                Sell
              </button>
            )}

            {inventory?.type === "playerinventory" && (
              <button
                className="border py-1 border-b-0"
                onClick={() => dispatch(closeContextMenu())}
              >
                Give
              </button>
            )}
            {inventory?.type === "crafting" && (
              <button
                className="border py-1 "
                onClick={() =>
                  CraftItemHandler({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount: (inputAmount === 0 ? 1 : inputAmount) * inventory?.item?.amount,
                    },
                  })
                }
              >
                Craft
              </button>
            )}
            {inventory?.type === "playerinventory" && (
              <button
                className="border py-1 border-b-0"
                onClick={() =>
                  dropHandler({
                    ...inventory?.item,
                    amount: inputAmount === 0 ? inventory?.item.amount : inputAmount,
                  })
                }
              >
                Drop
              </button>
            )}

            {inventory?.type === "playerinventory" && (
              <button className="border py-1" onClick={() => dispatch(closeContextMenu())}>
                Copy Serial
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
