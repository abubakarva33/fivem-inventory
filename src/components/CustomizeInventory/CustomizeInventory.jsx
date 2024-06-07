import "./CustomizeInventory.css";
import { useDispatch, useSelector } from "react-redux";
import { customizeInventory } from "../../redux/customizeSlice";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import ColorPickerSection from "./ColorPickerSection";

const CustomizeInventory = () => {
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    slotBorderRound,
    btnColor,
    hudBg,
    hudBorderColor,
  } = useSelector((state) => state.customizeSec);

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
        className="flex items-center justify-center text-[18px] rounded-xl h-[40px] mb-3"
        style={{ border: `2px solid ${slotBorderColor}`, backgroundColor: btnColor }}
      >
        Customizer
      </div>

      <div
        className="grid grid-cols-2 gap-5 "
        style={{ height: "calc(100% - 72px)", overflowY: "auto" }}
      >
        <ColorPickerSection type={"slotBg"} color={slotBg} title={"SLOT BACKGROUND"} />
        <ColorPickerSection type={"boxBg"} color={boxBg} title={"INVENTORY BACKGROUND"} />
        <ColorPickerSection type={"textColor"} color={textColor} title={"TEXT COLOR"} />
        <ColorPickerSection type={"btnColor"} color={btnColor} title={"BUTTON COLOR"} />
        <ColorPickerSection type={"hudBg"} color={hudBg} title={"HUD BACKGROUND"} />
        <ColorPickerSection type={"hudBorderColor"} color={hudBorderColor} title={"HUD BORDER"} />
        <ColorPickerSection
          type={"slotBorderColor"}
          color={slotBorderColor}
          title={"SLOT BORDER"}
        />
        <ColorPickerSection
          type={"boxBorderColor"}
          color={boxBorderColor}
          title={"INVENTORY BORDER"}
        />
      </div>
    </div>
  );
};

export default CustomizeInventory;
