import { ConfigProvider, Progress, Radio } from "antd";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight, checkItemsPresence } from "../../utilities/utilis";
import { useState } from "react";

const SecondaryArea = ({ secondaryBackpacks }) => {
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    slotBorderRound,
    textColor,
    btnColor,
  } = useSelector((state) => state.customizeSec);

  const [secondaryBackpack, setSecondaryBackpack] = useState(secondaryBackpacks[0]);
  const options = secondaryBackpacks?.map((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    return { label: value.label, value: key };
  });
  const [optionValue, setOptionValue] = useState(options[0]?.value);
  
  const changeSecondaryBackpack = ({ target: { value } }) => {
    setOptionValue(value);
    const matchingItem = secondaryBackpacks.find((item) => item[value]);
    if (matchingItem) {
      return setSecondaryBackpack(matchingItem[value]);
    }
  };

  console.log(secondaryBackpack);

  return (
    <div
      className="secondaryArea"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div className=" mx-3 pt-3 border-b pb-1" style={{ borderBottom: `4px solid ${slotBg}` }}>
        <Progress
          // percent={inventory?.weightPercent}
          percent={70}
          showInfo={false}
          size={["100%", 35]}
          strokeColor="green" //!  change  with condition //
          trailColor={boxBg}
          style={{ border: `2px solid ${slotBorderColor}`, borderRadius: 50 }}
        />
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: slotBg,
                buttonColor: "white",
                buttonSolidCheckedColor: "white",
                buttonSolidCheckedBg: btnColor,
                buttonSolidCheckedActiveBg: btnColor,
                buttonSolidCheckedHoverBg: btnColor,
              },
            },
          }}
        >
          <Radio.Group
            className="w-full my-2 mt-3"
            size="large"
            options={options}
            onChange={changeSecondaryBackpack}
            value={optionValue}
            // value={"glovebox"}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>

      {/* <div style={{ height: "calc(100% - 135px)", overflowY: "auto" }}>
        <div className="section px-3 mt-2">
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
      </div>  */}
    </div>
  );
};

export default SecondaryArea;
