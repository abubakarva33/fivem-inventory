import { Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeSlot } from "../../redux/customizeSlice";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

const CustomizeInventory = () => {
  const dispatch = useDispatch();
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    slotBorderRound,
    btnColor,
  } = useSelector((state) => state.customizeSec);

  const [color, setColor] = useState("#aabbcc88");

  return (
    <div
      className="customizeArea px-3 pt-3"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
        color: textColor,
      }}
    >
      <div
        className="flex items-center justify-center text-[18px] rounded-xl h-[40px]"
        style={{ border: `2px solid ${slotBorderColor}`, backgroundColor: slotBg }}
      >
        Customizer
      </div>

      <div className="colorPickerSection" style={{ zIndex: 9999999, overflow: "visible" }}>
        <HexAlphaColorPicker color={color} onChange={setColor} />
        <HexColorInput color={color} onChange={setColor} placeholder="Type a color" alpha />
      </div>
      {/* <div className="flex">
        <div className="w-full">
          <Slider defaultValue={30} />
          <div>
            <ColorPicker
              value={color?.slotBg}
              onChange={(value) => colorHandler("slotBg", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Slot Color</div>
            </ColorPicker>
            <ColorPicker
              value={color?.slotBorderColor}
              onChange={(value) => colorHandler("slotBorderColor", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Slot Border Color</div>
            </ColorPicker>
          </div>
        </div>
        <div className="w-full">
          <Slider defaultValue={30} />
          <div>
            <ColorPicker
              value={color?.boxBg}
              onChange={(value) => colorHandler("boxBg", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Inventory Color</div>
            </ColorPicker>
            <ColorPicker
              value={color?.boxBorderColor}
              onChange={(value) => colorHandler("boxBorderColor", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Inventory Border Color</div>
            </ColorPicker>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-full">
          <ColorPicker
            value={color?.textColor}
            onChange={(value) => colorHandler("textColor", value)}
            placement="top"
          >
            <div className="border rounded bg-slate-600 p-3">Text Color</div>
          </ColorPicker>
        </div>
        <div className="w-full">
          <ColorPicker
            value={color?.btnColor}
            onChange={(value) => colorHandler("btnColor", value)}
            placement="top"
          >
            <div className="border rounded bg-slate-600 p-3">button Color</div>
          </ColorPicker>
        </div>
      </div> */}
    </div>
  );
};

export default CustomizeInventory;

// const [color, setColor] = useState({
//   boxBg,
//   boxBorderColor,
//   boxBorderRound,
//   slotBg,
//   slotBorderColor,
//   textColor,
//   slotBorderRound,
//   btnColor,
// });
