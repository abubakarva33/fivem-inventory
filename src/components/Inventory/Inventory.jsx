import { useState } from "react";
import "./Inventory.css";
import SlotEach from "../sub-components/SlotEach";

const Inventory = () => {
  const [largeBackpack] = useState(Array(20).fill(null));
  const [smallBackpack] = useState(Array(10).fill(null));
  const [mainArea] = useState(Array(40).fill(null));
  const [gloveBox] = useState(Array(10).fill(null));
  const [ground] = useState(Array(10).fill(null));

  const renderSlots = (slots) => {
    return slots.map((slot, ind) => <SlotEach key={ind} data={slot} />);
  };
  return (
    <div className="inventory">
      <div className="section">
        <h3>Large Backpack</h3>
        <div className="grid">{renderSlots(largeBackpack)}</div>
      </div>
      <div className="section">
        <h3>Small Backpack</h3>
        <div className="grid">{renderSlots(smallBackpack)}</div>
      </div>
      <div className="section">
        <h3>Main Area</h3>
        <div className="grid">{renderSlots(mainArea)}</div>
      </div>
      <div className="section">
        <h3>Glove Box</h3>
        <div className="grid">{renderSlots(gloveBox)}</div>
      </div>
      <div className="section">
        <h3>Ground</h3>
        <div className="grid">{renderSlots(ground)}</div>
      </div>
    </div>
  );
};

export default Inventory;
