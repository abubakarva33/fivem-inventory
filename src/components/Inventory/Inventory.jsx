import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeContextMenu, handleContextInput } from "../../redux/contextSlice";
import { fetchNui } from "../../utilities/fetchNui";
import CustomizeInventory from "../sub-components/CustomizeInventory";

const Inventory = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { item, coords, inventoryType, inputAmount } = useSelector((state) => state.context);
  const [openBackpacks, setOpenBackpacks] = useState([]);
  const [secondaryBackpacks, setSecondaryBackpacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const buyItemHandler = (item) => {
    console.log(item);
  };
  const sellItemHandler = (item) => {
    console.log(item);
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

      {item?.name && (
        <div
          className="absolute w-[150px] no-close z-[500]"
          onClick={(e) => e.stopPropagation()}
          style={{ top: coords?.y, left: coords?.x }}
        >
          <div className="flex flex-col bg-slate-800 text-white">
            <div className="flex">
              <button
                className="border py-1 border-b-0 w-1/4"
                onClick={() => dispatch(handleContextInput(inputAmount - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-1/2  bg-slate-800 text-center border-t outline-none "
                style={{ color: "white" }}
                defaultValue={inputAmount}
                value={inputAmount}
                onChange={(e) => dispatch(handleContextInput(Number(e.target.value)))}
              />
              <button
                className="border py-1 border-b-0 w-1/4 text-white"
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(handleContextInput(inputAmount + 1))}
              >
                +
              </button>
            </div>
            {!item?.name?.includes("backpack") && inventoryType === "playerinventory" && (
              <button
                className="border py-1 border-b-0"
                onClick={() => dispatch(closeContextMenu())}
              >
                Use
              </button>
            )}

            {item?.name?.includes("backpack") && (
              <button
                className="border py-1 border-b-0"
                onClick={() =>
                  openBackpackHandler(
                    item,
                    openBackpacks.some(
                      (backpack) => backpack.info?.identifier === item.info?.identifier
                    )
                  )
                }
              >
                {openBackpacks.some(
                  (backpack) => backpack.info?.identifier === item.info?.identifier
                )
                  ? "Close"
                  : "Open"}
              </button>
            )}
            {inventoryType === "shop" && item?.info?.buyPrice && (
              <button
                className="border py-1"
                onClick={() =>
                  buyItemHandler({ ...item, amount: inputAmount === 0 ? item.amount : inputAmount })
                }
              >
                Buy
              </button>
            )}
            {inventoryType === "shop" && item?.info?.sellPrice && (
              <button
                className="border py-1"
                onClick={() =>
                  sellItemHandler({
                    ...item,
                    amount: inputAmount === 0 ? item.amount : inputAmount,
                  })
                }
              >
                Sell
              </button>
            )}

            {inventoryType === "playerinventory" && (
              <button
                className="border py-1 border-b-0"
                onClick={() => dispatch(closeContextMenu())}
              >
                Give
              </button>
            )}
            {inventoryType === "playerinventory" && (
              <button
                className="border py-1 border-b-0"
                onClick={() =>
                  dropHandler({ ...item, amount: inputAmount === 0 ? item.amount : inputAmount })
                }
              >
                Drop
              </button>
            )}

            {inventoryType === "playerinventory" && (
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
