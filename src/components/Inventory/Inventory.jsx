import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useSelector } from "react-redux";
import { useState } from "react";
import { checkItemsPresence, findSomethingInItems, secondaryTypes } from "../../utilities/utilis";

const Inventory = () => {
  const [backpack, setBackpack] = useState("largeBackpack");
  const [secondary, setSecondary] = useState(secondaryTypes.glovebox);
  const state = useSelector((state) => state.inventory);

  return (
    <div className="mainSection">
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
    </div>
  );
};

export default Inventory;
