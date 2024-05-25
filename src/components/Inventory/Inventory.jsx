import "./Inventory.css";
import SlotEach from "../sub-components/SlotEach";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useSelector } from "react-redux";
import InventoryGrid from "./InventoryGrid";

const Inventory = () => {
  const { backpackInventory, primaryInventory, secondaryInventory } = useSelector(
    (state) => state.inventory
  );
  // const renderSlots = (items, slots) => {
  //   const allSlots = items.concat(Array(slots - items.length).fill(null));
  //   return allSlots.map((slot, ind) => <SlotEach key={ind} data={slot} ind={ind} />);
  // };
  return (
    <div className="mainSection">
      <div className="inventory">
        <div>
          <InventoryGrid inventory={backpackInventory}> </InventoryGrid>
        </div>
        <div>
          <InventoryGrid inventory={primaryInventory}> </InventoryGrid>
        </div>
        <div>
          <InventoryGrid inventory={secondaryInventory}> </InventoryGrid>
        </div>
        {/* <BackpackSection renderSlots={renderSlots} />
        <MainAreaSection renderSlots={renderSlots} />
        <SecondaryArea renderSlots={renderSlots} /> */}
      </div>
    </div>
  );
};

export default Inventory;
