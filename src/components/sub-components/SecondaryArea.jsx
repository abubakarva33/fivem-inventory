import { ConfigProvider, Progress, Radio } from "antd";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { useEffect, useState } from "react";
import CraftInventorySlot from "./CraftInventorySlot";
import { calculateRGBRev } from "../../utilities/utilis";
import { motion } from "framer-motion";

const SecondaryArea = ({ secondaryBackpacks }) => {
  const { boxBg, boxBorderColor, boxBorderRound, slotBg, slotBorderColor, textColor, btnColor } =
    useSelector((state) => state.customizeSec);
  const state = useSelector((state) => state.inventory);
  const [secondaryBackpack, setSecondaryBackpack] = useState(
    secondaryBackpacks ? secondaryBackpacks[0] : ""
  );
  const [options, setOptions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (secondaryBackpacks) {
      const option = secondaryBackpacks?.map((item) => {
        return { label: item?.label, value: item?.type };
      });
      setSecondaryBackpack(state[option[0].value]);
      setOptions(option);
    }
  }, [secondaryBackpacks[0]?.type, secondaryBackpacks[1]?.type]);

  const changeSecondaryBackpack = ({ target: { value } }) => setSecondaryBackpack(state[value]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 1, ease: "easeInOut" }}
      className="secondaryArea"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div className=" mx-3 pt-3 border-b pb-[6px]" style={{ borderBottom: `4px solid ${slotBg}` }}>
        <Progress
          percent={state[secondaryBackpack?.type]?.weightPercent}
          showInfo={false}
          size={["100%", 35]}
          strokeColor={calculateRGBRev(Number(state[secondaryBackpack?.type]?.weightPercent))}
          trailColor={boxBg}
          style={{ border: `2px solid ${slotBorderColor}`, borderRadius: 50 }}
        />
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: slotBg,
                buttonColor: textColor,
                buttonSolidCheckedColor: textColor,
                buttonSolidCheckedBg: btnColor,
                buttonSolidCheckedActiveBg: btnColor,
                buttonSolidCheckedHoverBg: btnColor,
              },
            },
          }}
        >
          <Radio.Group
            className="w-full my-2 mt-3 "
            size="large"
            options={options}
            onChange={changeSecondaryBackpack}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            value={secondaryBackpack?.type}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none", color: isHovered ? btnColor?.slice(0, 4) : textColor }}
          />
        </ConfigProvider>
      </div>

      <div style={{ height: "calc(100% - 135px)", overflowY: "auto" }}>
        <div
          className={`secondaryAreaSlot grid ${
            secondaryBackpack?.type === "crafting" ? "grid-cols-2" : "grid-cols-4"
          } gap-[5px] px-3 mt-2`}
        >
          {Array.isArray(state[secondaryBackpack?.type]?.items) &&
            state[secondaryBackpack?.type]?.items?.map((item, ind) => (
              <>
                {secondaryBackpack?.type != "crafting" ? (
                  <InventorySlot
                    key={`${state[secondaryBackpack?.type].type}-${
                      state[secondaryBackpack?.type].id
                    }-${item.slot}`}
                    item={item}
                    ind={ind}
                    inventory={state[secondaryBackpack?.type]}
                  />
                ) : (
                  <CraftInventorySlot item={item} inventory={state[secondaryBackpack?.type]} />
                )}
              </>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SecondaryArea;
