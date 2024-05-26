import { ConfigProvider, Progress, Radio } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InventorySlot from "../Inventory/InventorySlot";
import { useIntersection } from "../../hooks/useIntersection";

const options = [
  {
    label: "Glove Box",
    value: "glove",
  },
  {
    label: "Ground",
    value: "ground",
  },
];
const PAGE_SIZE = 30;

const SecondaryArea = ({ inventory }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const [value3, setValue3] = useState("glove");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  // const isBusy = useSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <div className="secondaryArea ">
      <div className="secondaryAreaTop">
        <Progress
          percent={50}
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
            value={value3}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>
      <div className="border py-2 rounded-[20px] px-3" style={{ borderColor: slotBorder }}>
        <div className="section" ref={containerRef}>
          {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
            <InventorySlot
              key={`${inventory.type}-${inventory.id}-${item.slot}`}
              item={item}
              ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
              inventoryType={inventory.type}
              inventoryGroups={inventory.groups}
              inventoryId={inventory.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryArea;
