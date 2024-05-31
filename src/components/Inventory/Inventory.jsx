import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkItemsPresence, findSomethingInItems, secondaryTypes } from "../../utilities/utilis";
import { closeContextMenu } from "../../redux/contextSlice";

const Inventory = () => {
  const dispatch = useDispatch();
  const { item, coords } = useSelector((state) => state.context);
  const [backpack, setBackpack] = useState("largeBackpack");
  const [secondary, setSecondary] = useState(secondaryTypes.glovebox);
  const state = useSelector((state) => state.inventory);

  useEffect(() => {
    const keyHandler = (e) => {
      if (!e.target.closest(".no-close")) {
        dispatch(closeContextMenu());
      }
      // dispatch(closeContextMenu());
    };

    window.addEventListener("click", keyHandler);
    return () => {
      window.removeEventListener("click", keyHandler);
    };
  }, []);

  return (
    <div className="mainSection relative">
      <div className="inventory">
        {/* condition for backpack, check backpack is present or not in primary inventory */}
        {checkItemsPresence(state[backpack]?.items) &&
          findSomethingInItems(state?.playerinventory?.items, "backpack") && (
            <BackpackSection inventory={state[backpack]} setBackpack={setBackpack} />
          )}
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
            <button className="border py-1 border-b-0">Use</button>
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
