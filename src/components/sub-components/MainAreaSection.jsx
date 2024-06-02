import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight } from "../../utilities/utilis";
import { useState } from "react";
import CustomizeModal from "./CustomizeModal";

const MainAreaSection = ({ inventory }) => {
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    slotBorderRound,
  } = useSelector((state) => state.customizeSec);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="mainArea"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div
        className="mainAreaTop pt-1 border-b pb-1"
        style={{ borderBottom: `4px solid ${slotBg}`, color: textColor }}
      >
        <div className="mb-3 pt-2">
          <div className="flex items-center	w-[36%]">
            <div
              className="border rounded-full p-2 text-xl me-2"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes />
            </div>
            <p
              className="border px-5 py-1  text-lg rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              Menan AK47
            </p>
          </div>
          <Progress
            percent={Number(inventory?.weightPercent)}
            showInfo={false}
            size={["100%", 35]}
            strokeColor="green" //!  change  with condition //
            trailColor={boxBg}
            style={{ border: `2px solid ${slotBorderColor}`, borderRadius: 50 }}
          />
          <div
            className="border rounded-full  p-2 text-xl"
            style={{ backgroundColor: slotBg, borderColor: slotBg }}
          >
            <BsBoxes onClick={showModal} />
          </div>
        </div>
        <div className="flex items-center text-xl justify-between mb-2">
          <div className="flex items-center">
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>9565465</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBg }}
            >
              <BsBoxes className="me-2" />
              <span>95655</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "calc(100% - 145px)", overflowY: "auto" }}>
        <div className="mainAreaSlot section">
          {Array.isArray(inventory?.items) &&
            inventory?.items?.map((item) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                inventory={inventory}
                totalWeight={calculateTotalWeight(inventory?.items)}
              />
            ))}
        </div>
      </div>
      <CustomizeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default MainAreaSection;
