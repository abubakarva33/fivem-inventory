import { ColorPicker, Progress } from "antd";
import { BsBoxes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight } from "../../utilities/utilis";
import { useEffect, useState } from "react";
import { customizeSlot } from "../../redux/customizeSlice";

const MainAreaSection = ({ inventory }) => {
  const dispatch = useDispatch();
  const { boxBg, boxBorderColor, boxBorderRound, slotBg, slotBorderColor, slotBorderRound } =
    useSelector((state) => state.customizeSec);
  const [color, setColor] = useState(slotBg);

  useEffect(() => {
    if (color?.metaColor) {
      const { r, g, b } = color?.metaColor || null;
      dispatch(customizeSlot(`rgba(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)},0.50)`));
    }
  }, [color]);

  return (
    <div
      className="mainArea"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div className="mainAreaTop border-b " style={{ borderColor: slotBorderColor }}>
        <div className="mb-3">
          <div className="flex items-center	w-[36%]">
            <div
              className="border rounded-full p-2 text-xl me-2"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes />
            </div>
            <p
              className="border px-5 py-1  text-lg rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              Menan AK47
            </p>
          </div>
          <Progress
            percent={Number(inventory?.weightPercent)}
            showInfo={false}
            size={["100%", 35]}
            strokeColor={slotBorderColor}
            trailColor="#555"
          />
          <div
            className="border rounded-full  p-2 text-xl"
            style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
          >
            <ColorPicker value={color} onChange={setColor} placement="top">
              <BsBoxes />
            </ColorPicker>
          </div>
        </div>
        <div className="flex items-center text-xl justify-between mb-2">
          <div className="flex items-center">
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
            >
              <BsBoxes className="me-2" />
              <span>9565465</span>
            </div>
            <div
              className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
              style={{ backgroundColor: slotBg, borderColor: slotBorderColor }}
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
              inventory={inventory}
              totalWeight={calculateTotalWeight(inventory?.items)}
            />
          ))}
      </div>
    </div>
  );
};

export default MainAreaSection;
