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
    tooltipBg,
    tooltipBorderColor,
    hudBg,
    hudBorderColor,
    healthColor,
    armorColor,
    hungerColor,
    thirstColor,
    cashColor,
    bankColor,
  } = useSelector((state) => state.customizeSec);
  const handleBorderRadiusChange = (property) => (newColor) => {
    dispatch(customizeInventory({ [property]: newColor }));
  };

  const customizeData2 = [
    {
      type: "boxBg",
      color: boxBg,
      title: "INVENTORY BACKGROUND",
      allowAlpha: true,
    },
    {
      type: "boxBorderColor",
      color: boxBorderColor,
      title: "INVENTORY BORDER",
      allowAlpha: true,
    },
    {
      type: "btnColor",
      color: btnColor,
      title: "BUTTON COLOR",
      allowAlpha: true,
    },
    {
      type: "tooltipBorderColor",
      color: tooltipBorderColor,
      title: "TOOLTIP BORDER",
      allowAlpha: true,
    },
    {
      type: "hudBorderColor",
      color: hudBorderColor,
      title: "HUD BORDER",
      allowAlpha: true,
    },
    {
      type: "thirstColor",
      color: thirstColor,
      title: "THIRST COLOR",
      allowAlpha: true,
    },
    {
      type: "cashColor",
      color: cashColor,
      title: "CASH COLOR",
      allowAlpha: true,
    },
    {
      type: "bankColor",
      color: bankColor,
      title: "BANK COLOR",
      allowAlpha: true,
    },
  ];

  const customizeData1 = [
    {
      type: "slotBg",
      color: slotBg,
      title: "SLOT BACKGROUND",
      allowAlpha: true,
    },
    {
      type: "slotBorderColor",
      color: slotBorderColor,
      title: "SLOT BORDER",
      allowAlpha: true,
    },
    {
      type: "textColor",
      color: textColor,
      title: "TEXT COLOR",
      allowAlpha: true,
    },
    {
      type: "tooltipBg",
      color: tooltipBg,
      title: "TOOLTIP BACKGROUND",
      allowAlpha: true,
    },
    {
      type: "hudBg",
      color: hudBg,
      title: "HUD BACKGROUND",
      allowAlpha: true,
    },
    {
      type: "healthColor",
      color: healthColor,
      title: "HEALTH COLOR",
      allowAlpha: true,
    },
    {
      type: "armorColor",
      color: armorColor,
      title: "ARMOR COLOR",
      allowAlpha: true,
    },
    {
      type: "hungerColor",
      color: hungerColor,
      title: "HUNGER COLOR",
      allowAlpha: true,
    },
  ];

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

      <div style={{ height: "calc(100% - 120px)", overflowY: "auto", width: "100%" }}>
        <div className="flex justify-between mx-1">
          <div className="w-100">
            {customizeData1?.map((item, ind) => (
              <ColorPickerSection
                key={ind}
                type={item?.type}
                color={item?.color}
                title={item?.title}
                allowAlpha={item?.allowAlpha}
              />
            ))}
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
          </div>
          <div className="w-100">
            {customizeData2?.map((item, ind) => (
              <ColorPickerSection
                key={ind}
                type={item?.type}
                color={item?.color}
                title={item?.title}
                allowAlpha={item?.allowAlpha}
              />
            ))}
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
  );
};

export default CustomizeInventory;
