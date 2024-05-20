const BackpackSection = ({ renderSlots, backpack }) => {
  return (
    <div className="backpackSection border">
      <div className="backpackSectionTop mb-2.5">
        <div className="me-1">
          <div className="activeBackpack"></div>
          <div className="flex flex-col	">
            <h3 className="text-lg  text-zinc-300 ms-2 mb-0">Large Backpack</h3>
            <p className="mb-0">
              Capacity <span>12</span>/ <span>50</span> kg
            </p>
          </div>
        </div>
        <div className="ms-1">
          <h3>Small Backpack</h3>
        </div>
      </div>
      <div className="section">{renderSlots(backpack)}</div>
    </div>
  );
};

export default BackpackSection;
