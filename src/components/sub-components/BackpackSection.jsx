const BackpackSection = ({ renderSlots, backpack }) => {
  return (
    <div className="backpackSection border">
      <div className="backpackSectionTop mb-2.5">
        <div className="me-1">
          <div className="activeBackpack"></div>
          <div className="w-full ms-2">
            <div className="flex flex-col	border-b mb-2 pb-2">
              <h3 className="text-lg  text-zinc-300  mb-0">Large Backpack</h3>
              <p className="mb-0   text-zinc-300">
                Capacity <span>12</span>/ <span>50</span> kg
              </p>
            </div>
            <p className=" text-[11px]">
              This is a backpack item. <br />
              You can use it carry more.
            </p>
          </div>
        </div>
        <div className="">
          <div className="activeBackpack"></div>
          <div className="w-full ms-2">
            <div className="flex flex-col	border-b mb-2 pb-2">
              <h3 className="text-lg  text-zinc-300  mb-0">Small Backpack</h3>
              <p className="mb-0   text-zinc-300">
                Capacity <span>12</span>/ <span>50</span> kg
              </p>
            </div>
            <p className=" text-[11px]">
              This is a backpack item. <br />
              You can use it carry more.
            </p>
          </div>
        </div>
      </div>
      <div className="section">{renderSlots(backpack)}</div>
    </div>
  );
};

export default BackpackSection;
