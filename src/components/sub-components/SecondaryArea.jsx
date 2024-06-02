import { ConfigProvider, Progress, Radio } from "antd";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight, checkItemsPresence } from "../../utilities/utilis";

const SecondaryArea = ({ inventory, secondary, setSecondary }) => {
  const { boxBg, boxBorderColor, boxBorderRound, slotBg, slotBorderColor, slotBorderRound } =
    useSelector((state) => state.customizeSec);
  const { glovebox } = useSelector((state) => state.inventory);

  const options = [
    {
      label: "Glove Box",
      value: "glovebox",
    },
    {
      label: "Drop",
      value: "drop",
    },
  ];
  const onChange3 = ({ target: { value } }) => {
    setSecondary(value);
  };
  return (
    <div
      className="secondaryArea"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div className="secondaryAreaTop">
        <Progress
          percent={inventory?.weightPercent}
          showInfo={false}
          size={["100%", 35]}
          strokeColor={slotBorderColor}
          trailColor="#555"
        />
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: slotBg,
                buttonColor: "white",
                buttonSolidCheckedColor: "white",
                buttonSolidCheckedBg: slotBorderColor,
                buttonSolidCheckedActiveBg: slotBorderColor,
                buttonSolidCheckedHoverBg: slotBorderColor,
              },
            },
          }}
        >
          <Radio.Group
            className="w-full my-2 mt-4"
            size="large"
            options={options}
            onChange={onChange3}
            value={secondary}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>
      <div className="border py-2 rounded-[20px] px-3" style={{ borderColor: slotBorderColor }}>
        <div className="section">
          {checkItemsPresence(inventory?.items) &&
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
    </div>
  );
};

export default SecondaryArea;
