const MainAreaSection = ({ renderSlots, mainArea }) => {
  return (
    <div className="mainArea section">
      <div>
        <h3>Main Area</h3>
      </div>
      <div className="mainAreaSlot">{renderSlots(mainArea)}</div>
    </div>
  );
};

export default MainAreaSection;
