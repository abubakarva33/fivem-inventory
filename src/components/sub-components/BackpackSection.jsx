import { useEffect, useRef, useState } from "react";
import { largeBackpackDummyData, smallBackpackDummyData } from "../../dummyData";
import { gramsToKilograms } from "../../utilities/utilis";
import InventorySlot from "../Inventory/InventorySlot";
import { useIntersection } from "../../hooks/useIntersection";

const PAGE_SIZE = 30;

const BackpackSection = ({ inventory }) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  // const isBusy = useSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <div className="backpackSection  border border-[#666] rounded-xl">
      <div className="backpackSectionTop bg-[#2e2e2e] mb-3">
        <div className="me-1 rounded-lg border border-[#666]">
          <div className="flex bg-[#666] p-2 items-center rounded-lg">
            <div className="activeBackpack "></div>
            <div className="w-full ms-2">
              <div className="flex flex-col	border-b  mb-2 pb-2">
                <h3 className="text-[20px] text-zinc-300  mb-0">{largeBackpackDummyData?.label}</h3>
                <p className="mb-0 text-[17px] text-zinc-300">
                  Capacity <span>{gramsToKilograms(largeBackpackDummyData?.weight)}</span>/
                  <span>{gramsToKilograms(largeBackpackDummyData?.maxWeight)}</span> kg
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
                <h3 className="text-[20px] text-zinc-300  mb-0">{smallBackpackDummyData?.label}</h3>
                <p className="mb-0 text-[17px] text-zinc-300">
                  Capacity <span>{gramsToKilograms(smallBackpackDummyData?.weight)}</span>/
                  <span>{gramsToKilograms(smallBackpackDummyData?.maxWeight)}</span> kg
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
      <div className="section" ref={containerRef}>
        {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
          <InventorySlot
            key={`${inventory.type}-${inventory.id}-${item.slot}`}
            item={item}
            ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
            inventoryType={inventory.type}
            inventoryGroups={inventory.groups}
            inventoryId={inventory.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BackpackSection;
