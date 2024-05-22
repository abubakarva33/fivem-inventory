import "./Inventory.css";
import SlotEach from "../sub-components/SlotEach";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";

const Inventory = () => {
  const renderSlots = (items, slots) => {
    const allSlots = items.concat(Array(slots - items.length).fill(null));
    return allSlots.map((slot, ind) => <SlotEach key={ind} data={slot} ind={ind} />);
  };
  return (
    <div className="mainSection">
      <div className="inventory">
        <BackpackSection renderSlots={renderSlots} />
        <MainAreaSection renderSlots={renderSlots} />
        <SecondaryArea renderSlots={renderSlots} />
      </div>
    </div>
  );
};

export default Inventory;
