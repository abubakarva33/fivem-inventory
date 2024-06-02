import { useSelector } from "react-redux";
import { checkItemsPresence, gramsToKilograms } from "../../utilities/utilis";
import InventorySlot from "./InventorySlot";

const BackpackSection = ({ inventory, setBackpack }) => {
  const { largeBackpack, smallBackpack } = useSelector((state) => state.inventory);

  return (
    <div className="backpackSection  border border-[#666] rounded-xl">
      <div className="backpackSectionTop bg-[#2e2e2e] mb-3">
        {largeBackpack?.identifier && (
          <div
            className="me-1 rounded-lg border border-[#666]"
            onClick={() => setBackpack("largeBackpack")}
          >
            <div className="flex bg-[#666] p-2 items-center rounded-lg w-full">
              <div className="activeBackpack "></div>
              <div className="w-full ms-2">
                <div className="flex flex-col	border-b  mb-2 pb-2">
                  <h3 className="text-[20px] text-zinc-300  mb-0">{largeBackpack?.label}</h3>
                  <p className="mb-0 text-[17px] text-zinc-300">
                    Capacity <span>{gramsToKilograms(largeBackpack?.weight)}</span>/
                    <span>{gramsToKilograms(largeBackpack?.maxWeight)}</span> kg
                  </p>
                </div>
                <p className=" text-[14px]">
                  This is a backpack item. <br />
                  You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}

        {smallBackpack?.identifier && (
          <div
            className="ms-1 rounded-lg border border-[#666]"
            onClick={() => setBackpack("smallBackpack")}
          >
            <div className="flex bg-[#666] p-2 items-center rounded-lg w-full">
              <div className="activeBackpack"></div>
              <div className="w-full ms-2">
                <div className="flex flex-col	border-b mb-2 pb-2">
                  <h3 className="text-[20px] text-zinc-300  mb-0">{smallBackpack?.label}</h3>
                  <p className="mb-0 text-[17px] text-zinc-300">
                    Capacity <span>{gramsToKilograms(smallBackpack?.weight)}</span>/
                    <span>{gramsToKilograms(smallBackpack?.maxWeight)}</span> kg
                  </p>
                </div>
                <p className=" text-[14px]">
                  This is a backpack item. <br />
                  You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="section">
        {Array.isArray(inventory?.items) &&
          inventory?.items?.map((item) => (
            <InventorySlot
              key={`${inventory.type}-${inventory.id}-${item.slot}`}
              item={item}
              inventory={inventory}
            />
          ))}
      </div>
    </div>
  );
};

export default BackpackSection;
