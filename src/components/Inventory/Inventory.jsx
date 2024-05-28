import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useSelector } from "react-redux";
import { useState } from "react";

const Inventory = () => {
  const [backpack, setBackpack] = useState("largeBackpack");
  const [secondary, setSecondary] = useState("glovebox");
  const state = useSelector((state) => state.inventory);

  return (
    <div className="mainSection">
      <div className="inventory">
        <BackpackSection inventory={state[backpack]} />
        <MainAreaSection inventory={state.playerinventory} />
        <SecondaryArea inventory={state[secondary]} />
      </div>
    </div>
  );
};

export default Inventory;
