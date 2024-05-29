import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useSelector } from "react-redux";
import { useState } from "react";
import { secondaryTypes } from "../../utilities/utilis";

const Inventory = () => {
  const [backpack, setBackpack] = useState("largeBackpack");
  const [secondary, setSecondary] = useState(secondaryTypes.glovebox);
  const state = useSelector((state) => state.inventory);
  return (
    <div className="mainSection">
      <div className="inventory">
        <BackpackSection inventory={state[backpack]} setBackpack={setBackpack} />
        <MainAreaSection inventory={state.playerinventory} />
        <SecondaryArea
          inventory={state[secondary]}
          secondary={secondary}
          setSecondary={setSecondary}
        />
      </div>
    </div>
  );
};

export default Inventory;
