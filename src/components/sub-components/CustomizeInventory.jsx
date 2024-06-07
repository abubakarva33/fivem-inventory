import { Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeInventory } from "../../redux/customizeSlice";
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

  const handleColorChange = (property) => (newColor) => {
    dispatch(customizeInventory({ [property]: newColor }));
  };

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
        <HexAlphaColorPicker color={slotBg} onChange={handleColorChange("slotBg")} />
        <HexColorInput
          color={slotBg}
          onChange={handleColorChange("slotBg")}
          placeholder="Type a color"
          alpha
        />
      </div>
      <div className="colorPickerSection" style={{ zIndex: 9999999, overflow: "visible" }}>
        <HexAlphaColorPicker color={boxBg} onChange={handleColorChange("boxBg")} />
        <HexColorInput
          color={boxBg}
          onChange={handleColorChange("boxBg")}
          placeholder="Type a color"
          alpha
        />
      </div>
    </div>
  );
};

export default CustomizeInventory;
