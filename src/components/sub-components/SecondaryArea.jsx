const SecondaryArea = ({ renderSlots, ground }) => {
  return (
    <div className="secondaryArea ">
      <div className="secondaryAreaTop">
        <h3>Glove Box</h3>
        <h3>Ground</h3>
      </div>
      <div className="section">{renderSlots(ground)}</div>
    </div>
  );
};

export default SecondaryArea;
