import { useState } from "react";
import "./Inventory.css";
import SlotEach from "../sub-components/SlotEach";

const Inventory = () => {
  const [backpack] = useState(Array(28).fill(null));
  const [mainArea] = useState(Array(30).fill(null));
  const [ground] = useState(Array(28).fill(null));

  const renderSlots = (slots) => {
    return slots.map((slot, ind) => <SlotEach key={ind} data={slot} />);
  };
  return (
    <div className="inventory">
      <div className="backpackSection section">
        <div>
          <h3>Large Backpack</h3>
          <h3>Small Backpack</h3>
        </div>
        <div className="grid">{renderSlots(backpack)}</div>
      </div>
      <div className="mainArea section">
        <div>
          <h3>Main Area</h3>
        </div>
        <div className="grid">{renderSlots(mainArea)}</div>
      </div>
      <div className="secondaryArea section">
        <div>
          <h3>Glove Box</h3>
          <h3>Ground</h3>
        </div>
        <div className="grid">{renderSlots(ground)}</div>
      </div>
    </div>
  );
};

export default Inventory;
