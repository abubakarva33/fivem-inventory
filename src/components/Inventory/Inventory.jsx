import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkItemsPresence, secondaryTypes } from "../../utilities/utilis";
import { closeContextMenu } from "../../redux/contextSlice";
import { fetchNui } from "../../utilities/fetchNui";
import CustomizeInventory from "../sub-components/CustomizeInventory";

const Inventory = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { item, coords } = useSelector((state) => state.context);
  const [secondary, setSecondary] = useState(secondaryTypes.glovebox);
  const [openBackpacks, setOpenBackpacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        (backpack) =>backpack.info.type2 === backpackData.info.type2
      );

      // Handle closing the backpack
      if (action) {
        if (existingBackpackIndex !== -1) {
          const backpackToClose = updatedBackpacks[existingBackpackIndex];
          console.log(backpackToClose)
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

      return updatedBackpacks;
    });
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

        {checkItemsPresence(state[secondary]?.items) && !isModalOpen && (
          <SecondaryArea
            inventory={state[secondary]}
            secondary={secondary}
            setSecondary={setSecondary}
          />
        )}
        {isModalOpen && <CustomizeInventory />}
      </div>

      {item?.name && (
        <div
          className="absolute w-[150px] no-close z-[500]"
          onClick={(e) => e.stopPropagation()}
          style={{ top: coords?.y, left: coords?.x }}
        >
          <div className="flex flex-col bg-slate-800 ">
            <div className="flex">
              <button
                className="border py-1 border-b-0 w-1/4"
                style={{ cursor: "pointer" }}
                // onClick={() => setRightBtnInputValue(rightBtnInputValue + 1)}
              >
                +
              </button>
              <input
                type="number"
                className="w-1/2  bg-slate-800 text-center border-t outline-none"
                style={{ color: "white" }}
                // defaultValue={rightBtnInputValue}
                // value={rightBtnInputValue}
                // onChange={(e) => setRightBtnInputValue(Number(e.target.value))}
              />
              <button
                className="border py-1 border-b-0 w-1/4"
                // onClick={() => setRightBtnInputValue(rightBtnInputValue - 1)}
              >
                -
              </button>
            </div>
            {!item?.name?.includes("backpack") && (
              <button className="border py-1 border-b-0">Use</button>
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

            <button className="border py-1 border-b-0">Give</button>
            <button className="border py-1 border-b-0">Drop</button>
            <button className="border py-1">Copy Serial</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
