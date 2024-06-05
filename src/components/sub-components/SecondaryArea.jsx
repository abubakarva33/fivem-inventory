import { ConfigProvider, Progress, Radio } from "antd";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight } from "../../utilities/utilis";
import { useEffect, useState } from "react";

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
  const state = useSelector((state) => state.inventory);
  const [secondaryBackpack, setSecondaryBackpack] = useState(
    secondaryBackpacks[0] ? Object.keys(secondaryBackpacks[0])[0] : ""
  );
  const [options, setOptions] = useState([]);

  if (
    secondaryBackpacks.length === 2 &&
    secondaryBackpacks[0] &&
    Object.keys(secondaryBackpacks[0])[0] === "drop"
  ) {
    [secondaryBackpacks[0], secondaryBackpacks[1]] = [secondaryBackpacks[1], secondaryBackpacks[0]];
  }

  useEffect(() => {
    if (secondaryBackpacks[0]) {
      const option = secondaryBackpacks?.map((item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return { label: value.label, value: key };
      });
      setSecondaryBackpack(option[0]?.value);
      setOptions(option);
    }
  }, [secondaryBackpacks]);

  const changeSecondaryBackpack = ({ target: { value } }) => setSecondaryBackpack(value);

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
          percent={state[secondaryBackpack]?.weightPercent}
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
            value={secondaryBackpack}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>

      <div style={{ height: "calc(100% - 135px)", overflowY: "auto" }}>
        <div className="section px-3 mt-2">
          {Array.isArray(state[secondaryBackpack]?.items) &&
            state[secondaryBackpack]?.items?.map((item) => (
              <InventorySlot
                key={`${state[secondaryBackpack].type}-${state[secondaryBackpack].id}-${item.slot}`}
                item={item}
                inventory={state[secondaryBackpack]}
                totalWeight={calculateTotalWeight(state[secondaryBackpack]?.items)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryArea;
