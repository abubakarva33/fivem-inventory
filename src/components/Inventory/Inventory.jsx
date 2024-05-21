import { useState } from "react";
import "./Inventory.css";
import SlotEach from "../sub-components/SlotEach";
import BackpackSection from "../sub-components/backpackSection";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";

const Inventory = () => {
  const [backpack] = useState(Array(28).fill(null));
  const [mainArea] = useState(Array(40).fill(null));
  const [ground] = useState(Array(28).fill(null));

  const renderSlots = (slots) => {
    return slots.map((slot, ind) => <SlotEach key={ind} data={slot} />);
  };
  return (
    <div className="mainSection">
      <div className="inventory">
        <BackpackSection renderSlots={renderSlots} backpack={backpack} />
        <MainAreaSection renderSlots={renderSlots} mainArea={mainArea} />
        <SecondaryArea renderSlots={renderSlots} ground={ground} />
      </div>
    </div>
  );
};

export default Inventory;
