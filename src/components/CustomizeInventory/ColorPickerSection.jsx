import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import { customizeInventory } from "../../redux/customizeSlice";
import { useState } from "react";

const ColorPickerSection = ({ children, type, color, title, allowAlpha }) => {
  const dispatch = useDispatch();
  const { slotBg, textColor, btnColor } = useSelector((state) => state.customizeSec);
  const handleColorChange = (property) => (newColor) => {
    dispatch(customizeInventory({ [property]: newColor }));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="colorPickerSection">
      <div
        className="text-center text-[16px] py-1 mb-3"
        style={{ backgroundColor: btnColor, color: textColor }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </div>

      {isOpen && (
        <div>
          {allowAlpha ? (
            <HexAlphaColorPicker color={color} onChange={handleColorChange(type)} />
          ) : (
            <HexColorPicker color={color} onChange={handleColorChange(type)} />
          )}

          {allowAlpha ? (
            <HexColorInput
              className="w-full h-8 text-[18px] text-center outline-none "
              style={{ backgroundColor: slotBg, color: textColor }}
              color={color}
              onChange={handleColorChange(type)}
              placeholder="Type a color"
              alpha
            />
          ) : (
            <HexColorInput
              className="w-full h-8 text-[18px] text-center outline-none "
              style={{ backgroundColor: slotBg, color: textColor }}
              color={color}
              onChange={handleColorChange(type)}
              placeholder="Type a color"
              alpha
            />
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default ColorPickerSection;
