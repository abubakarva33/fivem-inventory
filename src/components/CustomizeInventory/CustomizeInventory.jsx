import "./CustomizeInventory.css";
import { useDispatch, useSelector } from "react-redux";
import { customizeInventory, restoreToDefault } from "../../redux/customizeSlice";
import ColorPickerSection from "./ColorPickerSection";
import { ConfigProvider, Slider } from "antd";

const CustomizeInventory = () => {
  const dispatch = useDispatch();
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    btnColor,
    hudBg,
    hudBorderColor,
    tooltipBg,
    tooltipBorderColor,
  } = useSelector((state) => state.customizeSec);
  const handleBorderRadiusChange = (property) => (newColor) => {
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
        className="flex items-center justify-center text-[18px] rounded-xl h-[40px] mb-3"
        style={{ border: `2px solid ${slotBorderColor}`, backgroundColor: btnColor }}
      >
        Customizer
      </div>

      <div style={{ height: "calc(100% - 72px)", overflowY: "auto", width: "100%" }}>
        <div className="grid grid-cols-2 gap-5 ">
          <ColorPickerSection
            type={"slotBg"}
            color={slotBg}
            title={"SLOT BACKGROUND"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"boxBg"}
            color={boxBg}
            title={"INVENTORY BACKGROUND"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"textColor"}
            color={textColor}
            title={"TEXT COLOR"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"btnColor"}
            color={btnColor}
            title={"BUTTON COLOR"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"tooltipBg"}
            color={tooltipBg}
            title={"TOOLTIP BACKGROUND"}
            allowAlpha={false}
          />
          <ColorPickerSection
            type={"tooltipBorderColor"}
            color={tooltipBorderColor}
            title={"TOOLTIP BORDER"}
            allowAlpha={false}
          />
          <ColorPickerSection
            type={"hudBg"}
            color={hudBg}
            title={"HUD BACKGROUND"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"hudBorderColor"}
            color={hudBorderColor}
            title={"HUD BORDER"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"slotBorderColor"}
            color={slotBorderColor}
            title={"SLOT BORDER"}
            allowAlpha={true}
          />
          <ColorPickerSection
            type={"boxBorderColor"}
            color={boxBorderColor}
            title={"INVENTORY BORDER"}
            allowAlpha={true}
          />

          <div className="colorPickerSection">
            <div
              className="text-center text-[16px] py-1 mb-3"
              style={{ backgroundColor: btnColor, color: textColor }}
            >
              SLOT RADIUS
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    railSize: 20,
                    handleSize: 15,
                    railBg: btnColor,
                    railHoverBg: slotBg,
                  },
                },
              }}
            >
              <Slider
                defaultValue={slotBorderRound}
                className="w-full"
                max={50}
                onChange={handleBorderRadiusChange("slotBorderRound")}
              />
            </ConfigProvider>
          </div>
          <div className="colorPickerSection">
            <div
              className="text-center text-[16px] py-1 mb-3"
              style={{ backgroundColor: btnColor, color: textColor }}
            >
              INVENTORY RADIUS
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    railSize: 20,
                    handleSize: 15,
                    railBg: btnColor,
                    railHoverBg: slotBg,
                  },
                },
              }}
            >
              <Slider
                defaultValue={boxBorderRound}
                max={50}
                className="w-full"
                onChange={handleBorderRadiusChange("boxBorderRound")}
              />
            </ConfigProvider>
          </div>
        </div>
        <button
          className="py-2 flex items-center w-full justify-center h-10 mt-3 rounded-xl mb-1 text-[18px]"
          style={{
            backgroundColor: btnColor,
            border: `2px solid ${slotBorderColor}`,
          }}
          onClick={() => dispatch(restoreToDefault())}
        >
          Restore Default
        </button>
      </div>
    </div>
  );
};

export default CustomizeInventory;
