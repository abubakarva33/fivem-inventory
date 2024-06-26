import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const largeBackpack = openBackpacks?.find(
    (item) => item.info && item.info.type2 === "largeBackpack"
  );
  const smallBackpack = openBackpacks?.find(
    (item) => item.info && item.info.type2 === "smallBackpack"
  );

  useEffect(() => {
    const newBackpack = largeBackpack ? "largeBackpack" : smallBackpack ? "smallBackpack" : null;
    setBackpack(newBackpack);
  }, [openBackpacks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.25, ease: "easeInOut" }}
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
          <div className=" rounded-lg cursor-pointer" onClick={() => setBackpack("largeBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{
                backgroundColor: backpack === "largeBackpack" ? btnColor : slotBg,
                height: 115,
                border:
                  backpack === "largeBackpack" ? `2px solid ${textColor}` : `2px solid transparent`,
                color: textColor,
              }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}>
                <img src="./images/backpack-l.png" alt="" className="h-[90px]" />
              </div>
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
          <div className=" rounded-lg cursor-pointer" onClick={() => setBackpack("smallBackpack")}>
            <div
              className="flex p-2 items-center rounded-lg w-full"
              style={{
                backgroundColor: backpack === "smallBackpack" ? btnColor : slotBg,
                height: 115,
                border:
                  backpack === "smallBackpack" ? `2px solid ${textColor}` : `2px solid transparent`,
                color: textColor,
              }}
            >
              <div className="activeBackpack" style={{ backgroundColor: btnColor }}>
                <img src="./images/backpack-s.png" alt="" className="h-[90px]" />
              </div>
              <div className="w-full ms-2">
                <div className="flex flex-col mb-2 ">
                  <h3 className="text-[20px]  mb-[-4px]">{state["smallBackpack"]?.label}</h3>
                  <Progress
                    percent={Number(state["smallBackpack"]?.weightPercent)}
                    showInfo={false}
                    size={["100%", 8]}
                    strokeColor="green"
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
            state[backpack]?.items?.map((item, ind) => (
              <InventorySlot
                key={`${state[backpack].type}-${state[backpack].id}-${item.slot}`}
                item={item}
                ind={ind}
                inventory={state[backpack]}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BackpackSection;
