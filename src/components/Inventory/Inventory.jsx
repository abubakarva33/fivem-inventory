import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkItemsPresence, secondaryTypes } from "../../utilities/utilis";
import { closeContextMenu } from "../../redux/contextSlice";

const Inventory = () => {
  const dispatch = useDispatch();
  const { item, coords } = useSelector((state) => state.context);
  const state = useSelector((state) => state.inventory);
  const [secondary, setSecondary] = useState(secondaryTypes.glovebox);
  const [openBackpacks, setOpenBackpacks] = useState([]);

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

  const openBackpackHandler = (backpackData) => {
    setOpenBackpacks((prevOpenBackpacks) => {
      const identifier = backpackData?.info?.identifier;
      const isOpen = prevOpenBackpacks.some((backpack) => backpack.info?.identifier === identifier);
      if (isOpen) {
        // Remove the item if it's already in the array //
        return prevOpenBackpacks.filter((backpack) => backpack.info?.identifier !== identifier);
      } else {
        // Add the item to the array //
        return [...prevOpenBackpacks, backpackData];
      }
    });

    //!  send below data to server //
    const data = backpackData?.info;
    console.log(data);
  };

  return (
    <div className="mainSection relative">
      <div className="inventory">
        {openBackpacks?.length && <BackpackSection openBackpacks={openBackpacks} />}

        <MainAreaSection inventory={state.playerinventory} />

        {checkItemsPresence(state[secondary]?.items) && (
          <SecondaryArea
            inventory={state[secondary]}
            secondary={secondary}
            setSecondary={setSecondary}
          />
        )}
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
              <button className="border py-1 border-b-0" onClick={() => openBackpackHandler(item)}>
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

{
  /* condition for backpack, check backpack is present or not in primary inventory */
}
{
  /* {state[backpack]?.identifier &&
          findTypeInItems(state?.playerinventory?.items, "backpack") &&
          checkItemsPresence(state[backpack]?.items) && (
            <BackpackSection inventory={state[backpack]} setBackpack={setBackpack} />
          )} */
}
