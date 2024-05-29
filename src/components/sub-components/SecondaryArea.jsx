import { ConfigProvider, Progress, Radio } from "antd";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { calculateTotalWeight } from "../../utilities/utilis";

const SecondaryArea = ({ inventory, secondary, setSecondary }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const options = [
    {
      label: "Glove Box",
      value: "glovebox",
    },
    {
      label: "Ground",
      value: "ground",
    },
  ];
  const onChange3 = ({ target: { value } }) => {
    setSecondary(value);
  };
  return (
    <div className="secondaryArea ">
      <div className="secondaryAreaTop">
        <Progress
          percent={inventory?.weightPercent}
          showInfo={false}
          size={["100%", 35]}
          strokeColor={slotBorder}
          trailColor="#555"
        />
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: slotBg,
                buttonColor: "white",
                buttonSolidCheckedColor: "white",
                buttonSolidCheckedBg: slotBorder,
                buttonSolidCheckedActiveBg: slotBorder,
                buttonSolidCheckedHoverBg: slotBorder,
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
      <div className="border py-2 rounded-[20px] px-3" style={{ borderColor: slotBorder }}>
        <div className="section">
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
      </div>
    </div>
  );
};

export default SecondaryArea;
