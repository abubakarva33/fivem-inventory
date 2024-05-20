const MainAreaSection = ({ renderSlots, mainArea }) => {
  return (
    <div className="mainArea">
      <div className="mainAreaTop">
        <h3>Main Area</h3>
      </div>
      <div className="mainAreaSlot section">{renderSlots(mainArea)}</div>
    </div>
  );
};

export default MainAreaSection;
