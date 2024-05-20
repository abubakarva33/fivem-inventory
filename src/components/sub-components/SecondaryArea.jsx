const SecondaryArea = ({ renderSlots, ground }) => {
  return (
    <div className="secondaryArea section">
      <div>
        <h3>Glove Box</h3>
        <h3>Ground</h3>
      </div>
      <div className="grid">{renderSlots(ground)}</div>
    </div>
  );
};

export default SecondaryArea;
