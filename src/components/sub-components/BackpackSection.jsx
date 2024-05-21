const BackpackSection = ({ renderSlots, backpack }) => {
  return (
    <div className="backpackSection  border border-[#666] rounded-xl">
      <div className="backpackSectionTop mb-3">
        <div className="me-1 rounded-lg border border-[#666]">
          <div className="flex bg-[#666] p-2 items-center rounded-lg">
            <div className="activeBackpack "></div>
            <div className="w-full ms-2">
              <div className="flex flex-col	border-b  mb-2 pb-2">
                <h3 className="text-[20px] text-zinc-300  mb-0">Large Backpack</h3>
                <p className="mb-0 text-[17px] text-zinc-300">
                  Capacity <span>12</span>/ <span>50</span> kg
                </p>
              </div>
              <p className=" text-[14px]">
                This is a backpack item. <br />
                You can use it carry more.
              </p>
            </div>
          </div>
        </div>
        <div className="ms-1 rounded-lg border border-[#666]">
          <div className="flex bg-[#666] p-2 items-center rounded-lg">
            <div className="activeBackpack"></div>
            <div className="w-full ms-2">
              <div className="flex flex-col	border-b mb-2 pb-2">
                <h3 className="text-[20px] text-zinc-300  mb-0">Small Backpack</h3>
                <p className="mb-0 text-[17px] text-zinc-300">
                  Capacity <span>12</span>/ <span>50</span> kg
                </p>
              </div>
              <p className=" text-[14px]">
                This is a backpack item. <br />
                You can use it carry more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section">{renderSlots(backpack)}</div>
    </div>
  );
};

export default BackpackSection;
