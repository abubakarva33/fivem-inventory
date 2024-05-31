import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { gramsToKilograms } from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";
import { fetchNui } from "../../utilities/fetchNui";
import { closeContextMenu, openContextMenu } from "../../redux/contextSlice";

const InventorySlotComponent = ({ item, inventory }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);

  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const [rightBtnInputValue, setRightBtnInputValue] = useState(1);
  const { type: inventoryType, maxWeight, identifier } = inventory;
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 1000); // 1 second delay
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };
  const handleRightButtonClick = (event) => {
    event.preventDefault();
    if (item?.name && inventoryType === "playerinventory") {
      dispatch(openContextMenu({ item, coords: { x: event.clientX, y: event.clientY } }));
    } else {
      dispatch(closeContextMenu());
    }
  };

  const UpdateDataToServer = (data) => {
    if (data.identifier) {
      fetchNui("changeSlot", data)
        .then((retData) => {})
        .catch((e) => {});
    } else {
      fetchNui("transfer", data)
        .then((retData) => {})
        .catch((e) => {});
    }
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
          type: inventoryType,
          identifier,
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
          type: inventoryType,
          identifier,
          item,
          items: main.item,
        };
        const source = { ...main, type: main.type };

        // for passing data to server //
        const changeSlotData = {
          identifier: source.identifier,
          fromSlot: source.item.slot,
          fromSlotData: {},
          toSlot: targetInventory.item.slot,
          toSlotData: { ...targetInventory.items, slot: targetInventory.item.slot },
        };
        const transferSlotData = {
          fromInv: {
            identifier: source.identifier,
            slot: source.item.slot,
            slotData: {},
          },
          toInv: {
            identifier: targetInventory.identifier,
            slot: targetInventory.item.slot,
            slotData: { ...targetInventory.items, slot: targetInventory.item.slot },
          },
        };

        // initially store and set data to redux(localhost)//
        dispatch(changeSlot({ source, targetInventory }));
        // conditionally pass data for server //
        if (source.type === targetInventory.type) {
          UpdateDataToServer(changeSlotData);
        } else {
          UpdateDataToServer(transferSlotData);
        }
      },
      canDrop: (source) => {
        if (source.item.slot !== item.slot || source.type !== inventoryType) {
          // condition for backpack transfer in backpack inventory //
          if (inventoryType === "smallBackpack" || inventoryType === "largeBackpack") {
            if (source.item.name === "backpack-l" || source.item.name === "backpack-s") {
              return false;
            }
          }
          // condition for weight based transfer //
          if (source.type !== inventoryType) {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {showTooltip && item?.name && !isRightButtonClick && (
        <div className="flex flex-col absolute top-8 left-8 z-[500] bg-slate-800 border w-[200px] p-2">
          <h5> {item?.label}</h5>
          <div className="flex flex-col">
            <span> Amount: {item?.amount} </span>
            <span> Weight: {item?.weight} </span>
            <span> Quality: {item?.quality}</span>
            <span> Serial: {item?.serial || "Change it later"}</span>
            <span> Owner: {item?.owner || "Change it later"}</span>
          </div>
          <p>{item?.description}</p>
        </div>
      )}
    </div>
  );
};

const InventorySlot = React.memo(InventorySlotComponent);
export default InventorySlot;
