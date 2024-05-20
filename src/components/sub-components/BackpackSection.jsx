const BackpackSection = ({ renderSlots, backpack }) => {
  return (
    <div className="backpackSection section">
      <div>
        <h3>Large Backpack</h3>
        <h3>Small Backpack</h3>
      </div>
      <div className="grid">{renderSlots(backpack)}</div>
    </div>
  );
};

export default BackpackSection;
