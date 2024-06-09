import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateDataToServer,
  buyItemHandlerWithDnd,
  gramsToKilograms,
  sellItemHandlerWithDnd,
} from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";
import { closeContextMenu, handleContextInput, openContextMenu } from "../../redux/contextSlice";
import { IoIosInfinite } from "react-icons/io";

const InventorySlotComponent = ({ item, inventory }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { slotBg, slotBorderColor, slotBorderRound } = useSelector((state) => state.customizeSec);
  const { selectedItems } = useSelector((state) => state.context);
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const { type, type2, maxWeight, identifier } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  // const [inputAmount, setInputAmount] = useState({});

  // useEffect(() => {
  //   const number = selectedItems.find(
  //     (x) =>
  //       x?.identifier === invFromContext?.identifier &&
  //       x?.name === invFromContext?.item?.name &&
  //       x.slot === invFromContext?.item?.slot
  //   );
  //   setInputAmount(number);
  // }, [selectedItems, inventory]);

  // console.log(inputAmount?.selectedAmount);

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
    const { items, ...restOfInventory } = inventory;
    setIsRightButtonClick(!isRightButtonClick);
    if (
      item?.name &&
      (inventoryType === "playerinventory" ||
        inventoryType === "shop" ||
        inventoryType === "crafting")
    ) {
      dispatch(
        openContextMenu({
          inventory: { ...restOfInventory, item },
          coords: { x: event.clientX, y: event.clientY },
        })
      );
      dispatch(handleContextInput(0));
    } else {
      dispatch(closeContextMenu());
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
          image: item?.name && `url(./images/${item?.name + ".png" || "none"})`,
        };
      },
      canDrag: Boolean(item.name) && inventoryType != "crafting",
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
        };
        const source = { ...main, type: main.type };

        // initially store and set data to redux(localhost) without shop inventory//

        dispatch(changeSlot({ source, targetInventory }));

        // conditionally pass data for server //
        if (source.type === targetInventory.type) {
          // for passing data to server same inventory //
          const changeSlotData = {
            identifier: source.identifier,
            fromSlot: source.item.slot,
            fromSlotData:
              targetInventory?.item?.name && targetInventory?.item?.name !== source?.item?.name
                ? {
                    ...targetInventory.item,
                    slot: source.item.slot,
                  }
                : {},
            toSlot: targetInventory.item.slot,
            toSlotData: {
              ...source.item,
              slot: targetInventory.item.slot,
              amount:
                targetInventory?.item?.name === source?.item?.name
                  ? Number(targetInventory.item.amount) + Number(source.item.amount)
                  : source.item.amount,
            },
          };

          UpdateDataToServer(changeSlotData);
        } else {
          // for passing data to server dif inventory //
          const transferSlotData = {
            fromInv: {
              identifier: source.identifier,
              slot: source.item.slot,
              slotData:
                targetInventory?.item?.name && targetInventory?.item?.name !== source?.item?.name
                  ? {
                      ...targetInventory.item,
                      slot: source.item.slot,
                    }
                  : {},
            },
            toInv: {
              identifier: targetInventory.identifier,
              slot: targetInventory.item.slot,
              slotData: {
                ...source.item,
                slot: targetInventory.item.slot,
                amount:
                  targetInventory?.item?.name === source?.item?.name
                    ? Number(targetInventory.item.amount) + Number(source.item.amount)
                    : source.item.amount,
              },
            },
          };

          UpdateDataToServer(transferSlotData);
        }
      },
      canDrop: (source) => {
        if (source.item.slot !== item.slot || source.type !== inventoryType) {
          // condition for backpack transfer in backpack inventory //
          if (inventoryType === "smallBackpack" || inventoryType === "largeBackpack") {
            if (source.item.type === "backpack") {
              return false;
            }
          }
          // condition for buy products //
          if (source.type === "shop" && !source.item.info.buyPrice) {
            return false;
          }
          if (source.type === "shop" && source.item.info.buyPrice) {
            const buyData = {
              fromInv: {
                identifier: source.identifier,
                slot: source.item.slot,
                slotData: source.item,
              },
              toInv: {
                identifier: inventory.identifier,
                slot: item.slot,
                slotData: item,
              },
            };
            if (inventoryType === "shop") {
              return false;
            }
            if (!item?.name || source.item.name === item.name) {
              buyItemHandlerWithDnd(buyData);
            }
            return false;
          }

          // condition for amount based dnd //
          const inputAmount = selectedItems.find(
            (x) =>
              x?.identifier === source?.identifier &&
              x?.name === source?.item?.name &&
              x.slot === source?.item?.slot
          );

          if (inputAmount?.selectedAmount) {
            console.log(inputAmount?.selectedAmount);
            return false;
          }

          // condition for sell products //
          if (source.type === "playerinventory" && inventoryType === "shop") {
            const sellData = {
              fromInv: {
                identifier: source.identifier,
                slot: source.item.slot,
                slotData: source.item,
              },
              toInv: {
                identifier: inventory.identifier,
                slot: item.slot,
                slotData: item,
              },
            };
            if (source.item.name === item.name && item.info.sellPrice) {
              sellItemHandlerWithDnd(sellData);
            }
            return false;
          }

          // condition for crafting inventory //
          if (inventoryType === "crafting") {
            return false;
          }

          // condition for weight based transfer //
          if (source.type !== inventoryType) {
            return (
              source.item.weight * source.item.amount + state[inventoryType].weight <= maxWeight
            );
          } else {
            return state[inventoryType].weight <= maxWeight;
          }
        }
      },
    }),

    [inventoryType, item, state[inventoryType]?.weight, selectedItems]
  );

  const connectRef = (element) => drag(drop(element));
  const refs = useMergeRefs([connectRef]);

  return (
    <div
      className="relative"
      style={{
        userSelect: "none",
        opacity: isDragging ? 0.4 : 1.0,
        border: `$1px dashed ${isOver ? { slotBorderColor } : "transparent"}`,
        borderRadius: slotBorderRound,
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
        <div
          className="slot relative"
          style={{ backgroundColor: slotBg, borderRadius: slotBorderRound }}
        >
          <div
            className="flex items-center justify-between flex-col w-full h-full"
            style={{ opacity: isDragging ? 0.5 : 1 }}
          >
            <div className="flex items-center justify-between w-full px-2">
              {item?.amount && (
                <span className="flex items-center justify-center">
                  {inventoryType === "shop" && item?.amount === -1 ? (
                    <IoIosInfinite className="mb-[-3px] text-[16px]" />
                  ) : (
                    item?.amount + "x"
                  )}
                </span>
              )}
              {item?.weight && <span className="">{gramsToKilograms(item?.weight)}kg</span>}
            </div>
            <img
              src={`./images/${item?.name}.png`}
              alt=""
              className="img-fluid slotImg mb-[12px]"
            />
            {item?.quality && inventoryType != "shop" && inventoryType != "crafting" && (
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

            {inventoryType === "shop" && item?.info?.sellPrice && (
              <div className="absolute bottom-6 left-0 ms-2 text-[#faff00]">
                ${item.info.sellPrice}
              </div>
            )}
            {inventoryType === "shop" && item?.info?.buyPrice && (
              <div className="absolute bottom-6 right-0 me-2 text-[#00ff5f]">
                ${item.info.buyPrice}
              </div>
            )}

            {item?.label && (
              <div
                className="slotItemLabel border mt-[-6px]  w-full text-center"
                style={{ borderColor: slotBorderColor }}
              >
                <span>{item?.label}</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* tooltip section */}
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
