import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";
import { useSelector } from "react-redux";
import InventorySlot from "../Inventory/InventorySlot";

const MainAreaSection = ({ inventory }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  return (
    <div className="mainArea">
      <div className="mainAreaTop bg-[#2e2e2e] border-b " style={{ borderColor: slotBorder }}>
        <div className="mb-3">
          <div className="flex items-center	w-[36%]">
            <div
              className="border rounded-full p-2 text-xl me-2"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes />
            </div>
            <p
              className="border px-5 py-1  text-lg rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              Menan AK47
            </p>
          </div>
          <Progress
            percent={50}
            showInfo={false}
            size={["100%", 35]}
            strokeColor={slotBorder}
            trailColor="#555"
          />
          <div
            className="border rounded-full  p-2 text-xl"
            style={{ backgroundColor: slotBg, borderColor: slotBorder }}
          >
            <BsBoxes />
          </div>
        </div>
        <div className="flex items-center text-xl justify-between mb-2">
          <div className="flex items-center">
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>9565465</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorder }}
            >
              <BsBoxes className="me-2" />
              <span>95655</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mainAreaSlot section">
        {Array.isArray(inventory?.items) &&
          inventory?.items?.map((item) => (
            <InventorySlot
              key={`${inventory.type}-${inventory.id}-${item.slot}`}
              item={item}
              inventoryType={inventory.type}
            />
          ))}
      </div>
    </div>
  );
};

export default MainAreaSection;
