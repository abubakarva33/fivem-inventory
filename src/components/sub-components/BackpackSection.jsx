import { useSelector } from "react-redux";
import { checkItemsPresence, gramsToKilograms } from "../../utilities/utilis";
import InventorySlot from "./InventorySlot";
import { Progress } from "antd";

const BackpackSection = ({ inventory, setBackpack }) => {
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    btnColor,
    slotBg,
    textColor,
    slotBorderColor,
    slotBorderRound,
  } = useSelector((state) => state.customizeSec);
  const { largeBackpack, smallBackpack } = useSelector((state) => state.inventory);

  return (
    <div
      className="backpackSection"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div
        className="backpackSectionTop mb-3 border-b pb-2"
        style={{ borderBottom: `5px solid ${slotBg}` }}
      >
        {largeBackpack?.identifier && (
          <div className=" rounded-lg" onClick={() => setBackpack("largeBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{ backgroundColor: slotBg, color: textColor }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}></div>
              <div className="w-full ms-2">
                <div className="flex flex-col	 mb-2">
                  <h3 className="text-[20px]  mb-[-4px]">{largeBackpack?.label}</h3>
                  <Progress
                    percent={Number(largeBackpack?.weightPercent)}
                    showInfo={false}
                    size={["100%", 8]}
                    strokeColor="green" //!  change  with condition //
                    trailColor={boxBg}
                  />
                  <span className="text-[14px]">ID: {largeBackpack?.identifier}</span>
                </div>
                <p className=" text-[14px] mt-[-8px] leading-[14px]">
                  This is a backpack item. You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}

        {smallBackpack?.identifier && (
          <div className=" rounded-lg " onClick={() => setBackpack("smallBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{ backgroundColor: slotBg, color: textColor }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}></div>
              <div className="w-full ms-2">
                <div className="flex flex-col mb-2 ">
                  <h3 className="text-[20px]  mb-[-4px]">{smallBackpack?.label}</h3>
                  <Progress
                    percent={Number(smallBackpack?.weightPercent)}
                    showInfo={false}
                    size={["100%", 8]}
                    strokeColor="green" //!  change  with condition //
                    trailColor={boxBg}
                  />
                  <span className="text-[14px]">ID: {smallBackpack?.identifier}</span>
                </div>
                <p className=" text-[14px] mt-[-8px] leading-[14px]">
                  This is a backpack item. You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: "calc(100% - 125px)", overflowY: "auto" }}>
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
    </div>
  );
};

export default BackpackSection;
