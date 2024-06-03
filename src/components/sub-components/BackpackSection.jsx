import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { Progress } from "antd";
import { useEffect, useState } from "react";

const BackpackSection = ({ openBackpacks }) => {
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    btnColor,
    slotBg,
    textColor,
    slotBorderColor,
    slotBorderRound,
  } = useSelector((state) => state.customizeSec);
  const [backpack, setBackpack] = useState("largeBackpack");
  const state = useSelector((state) => state.inventory);
  const largeBackpack = openBackpacks?.find((item) => item.name === "backpack-l");
  const smallBackpack = openBackpacks?.find((item) => item.name === "backpack-s");

  useEffect(() => {
    const newBackpack = largeBackpack ? "largeBackpack" : smallBackpack ? "smallBackpack" : null;
    setBackpack(newBackpack);
  }, [openBackpacks]);

  return (
    <div
      className="backpackSection"
      style={{
        backgroundColor: boxBg,
        border: `1px solid ${boxBorderColor}`,
        borderRadius: boxBorderRound,
      }}
    >
      <div
        className="backpackSectionTop mb-3 border-b pb-2"
        style={{ borderBottom: `5px solid ${slotBg}` }}
      >
        {largeBackpack && (
          <div className=" rounded-lg" onClick={() => setBackpack("largeBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{ backgroundColor: slotBg, color: textColor }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}></div>
              <div className="w-full ms-2">
                <div className="flex flex-col	 mb-2">
                  <h3 className="text-[20px]  mb-[-4px]">{state["largeBackpack"]?.label}</h3>
                  <Progress
                    percent={Number(state["largeBackpack"]?.weightPercent)}
                    showInfo={false}
                    size={["100%", 8]}
                    strokeColor="green" //!  change  with condition //
                    trailColor={boxBg}
                  />
                  <span className="text-[14px]">ID: {state["largeBackpack"]?.identifier}</span>
                </div>
                <p className=" text-[14px] mt-[-8px] leading-[14px]">
                  This is a backpack item. You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}

        {smallBackpack && (
          <div className=" rounded-lg " onClick={() => setBackpack("smallBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{ backgroundColor: slotBg, color: textColor }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}></div>
              <div className="w-full ms-2">
                <div className="flex flex-col mb-2 ">
                  <h3 className="text-[20px]  mb-[-4px]">{state["smallBackpack"]?.label}</h3>
                  <Progress
                    percent={Number(state["smallBackpack"]?.weightPercent)}
                    showInfo={false}
                    size={["100%", 8]}
                    strokeColor="green" //!  change  with condition //
                    trailColor={boxBg}
                  />
                  <span className="text-[14px]">ID: {state["smallBackpack"]?.identifier}</span>
                </div>
                <p className=" text-[14px] mt-[-8px] leading-[14px]">
                  This is a backpack item. You can use it carry more.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: "calc(100% - 125px)", overflowY: "auto" }}>
        <div className="section">
          {Array.isArray(state[backpack]?.items) &&
            state[backpack]?.items?.map((item) => (
              <InventorySlot
                key={`${state[backpack].type}-${state[backpack].id}-${item.slot}`}
                item={item}
                inventory={state[backpack]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BackpackSection;
