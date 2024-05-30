import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { gramsToKilograms } from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";

const InventorySlotComponent = ({ item, inventory }) => {
  const dispatch = useDispatch();
  const [isRightButtonClick, setIsRightButtonClick] = useState(false);
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const state = useSelector((state) => state.inventory);
  const { type: inventoryType, maxWeight } = inventory;

  const handleRightButtonClick = (event) => {
    event.preventDefault();
    setIsRightButtonClick(!isRightButtonClick);
  };

  const UpdateDataToServer = (data) => {
    console.log({ data });
    // TODO: Send your data to server from here //
  };

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "SLOT",
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      item: () => {
        return {
          inventory: inventoryType,
          item,
          image: item?.name && `url(/images/${item?.name + ".png" || "none"})`,
        };
      },
      canDrag: Boolean(item.name),
    };
  }, [inventoryType, item]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "SLOT",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (main) => {
        const targetInventory = {
          inventory: inventoryType,
          item,
          items: main.item,
        };
        const source = { ...main, inventory: main.inventory };

        // for passing data to server //
        const changeSlotData = {
          identifier: source.inventory,
          fromSlot: source.item.slot,
          fromSlotData: source.item,
          toSlot: targetInventory.item.slot,
          toSlotData: targetInventory.items,
        };
        const transferSlotData = {
          fromInv: {
            identifier: source.inventory,
            slot: source.item.slot,
            slotData: source.item,
          },
          toInv: {
            identifier: targetInventory.inventory,
            slot: targetInventory.item.slot,
            slotData: targetInventory.items,
          },
        };

        // initially store and set data to redux(localhost)//
        dispatch(changeSlot({ source, targetInventory }));
        // conditionally pass data for server //
        if (source.inventory === targetInventory.inventory) {
          UpdateDataToServer(changeSlotData);
        } else {
          UpdateDataToServer(transferSlotData);
        }
      },
      canDrop: (source) => {
        if (source.item.slot !== item.slot || source.inventory !== inventoryType) {
          // condition for backpack transfer in backpack inventory //
          if (inventoryType === "smallBackpack" || inventoryType === "largeBackpack") {
            if (source.item.name === "backpack-l" || source.item.name === "backpack-s") {
              return false;
            }
          }
          // condition for weight based transfer //
          if (source.inventory !== inventoryType) {
            return source.item.weight + state[inventoryType].weight <= maxWeight;
          } else {
            return state[inventoryType].weight <= maxWeight;
          }
        }
      },
    }),

    [inventoryType, item, state[inventoryType].weight]
  );

  const connectRef = (element) => drag(drop(element));
  const refs = useMergeRefs([connectRef]);

  return (
    <div
      className="relative"
      style={{
        userSelect: "none",
        opacity: isDragging ? 0.4 : 1.0,
        border: `1px dashed ${isOver ? " rgba(255,255,255,0.4)" : "transparent"}`,
      }}
      onContextMenu={handleRightButtonClick}
    >
      <div
        ref={refs}
        onDrag={drag}
        onDrop={drop}
        className="absolute top-0 left-0 right-0 bottom-0 z-40"
      ></div>

      {true && (
        <div className="slot rounded-md" style={{ backgroundColor: slotBg }}>
          <div
            className="flex items-center justify-between flex-col w-full h-full"
            style={{ opacity: isDragging ? 0.5 : 1 }}
          >
            <div className="flex items-center justify-between w-full px-2">
              {item?.amount && <span className="">{item?.amount}x</span>}
              {item?.weight && <span className="">{gramsToKilograms(item?.weight)}kg</span>}
            </div>
            <img src={`/images/${item?.name}.png`} alt="" className="img-fluid slotImg mb-[12px]" />
            {item?.quality && (
              <div className="slotQuality w-full mt-[-24px]">
                <Progress
                  percent={item?.quality}
                  showInfo={false}
                  size={["100%", 4]}
                  strokeColor={"green"}
                  trailColor="#555"
                />
              </div>
            )}
            {item?.label && (
              <div
                className="slotItemLabel border mt-[-6px]  w-full text-center"
                style={{ borderColor: slotBorder }}
              >
                <span>{item?.label}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InventorySlot = React.memo(InventorySlotComponent);
export default InventorySlot;
