import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateDataToServer,
  addWeaponComponentToServer,
  buyItemHandlerWithDnd,
  calculateRGB,
  checkTypeIncluded,
  gramsToKilograms,
  isIncludedType,
  isObjMatched,
  removeWeaponComponentToServer,
  sellItemHandlerWithDnd,
  updateWeaponComponentToServer,
} from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";
import { closeContextMenu, handleContextInput, openContextMenu } from "../../redux/contextSlice";
import { IoIosInfinite } from "react-icons/io";
import { FaExpand } from "react-icons/fa";
import WeaponExpandSection from "./WeaponExpandSection";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { closeTooltip, openTooltip } from "../../redux/tooltipSlice";
const InventorySlotComponent = ({
  item,
  inventory,
  ind,
  weaponExpand,
  setWeaponExpand,
  weaponItems,
  setWeaponItems,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { slotBg, slotBorderColor, slotBorderRound, textColor, hudBg } = useSelector(
    (state) => state.customizeSec
  );
  const { selectedItems } = useSelector((state) => state.context);
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const { type, type2, maxWeight, identifier } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const tooltipRef = useRef(null);
  const mainDivRef = useRef(null);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    // if (!hoverTimer) {
    //   const timer = setTimeout(() => {
    //     setShowTooltip(true);
    //   }, 1000); // 1 second delay
    //   setHoverTimer(timer);
    // }

    timerRef.current = window.setTimeout(() => {
      dispatch(openTooltip({ item, inventoryType }));
    }, 500);
  };

  const handleMouseLeave = () => {
    // if (hoverTimer) {
    //   clearTimeout(hoverTimer);
    //   setHoverTimer(null);
    // }
    // setShowTooltip(false);

    dispatch(closeTooltip());
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const handleDocumentMouseMove = (event) => {
      if (tooltipRef.current && mainDivRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const mainDivRect = mainDivRef.current.getBoundingClientRect();
        const isInsideTooltip =
          event.clientX >= tooltipRect.left &&
          event.clientX <= tooltipRect.right &&
          event.clientY >= tooltipRect.top &&
          event.clientY <= tooltipRect.bottom;
        const isInsideMainDiv =
          event.clientX >= mainDivRect.left &&
          event.clientX <= mainDivRect.right &&
          event.clientY >= mainDivRect.top &&
          event.clientY <= mainDivRect.bottom;

        if (!isInsideTooltip && !isInsideMainDiv) {
          setShowTooltip(false);

          const timer = setTimeout(() => {
            setShowTooltip(true);
          }, 1000); // 1 second delay
          setHoverTimer(timer);
        }
      }
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, []);

  const handleRightButtonClick = (event) => {
    event.preventDefault();
    const { items, ...restOfInventory } = inventory;
    setIsRightButtonClick(!isRightButtonClick);
    if (
      item?.name &&
      (inventoryType === "playerinventory" ||
        inventoryType === "shop" ||
        inventoryType === "crafting" ||
        inventoryType === "drop")
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
        if (
          source.type === targetInventory.type &&
          (source.type !== "weapon" ||
            (source.type === "playerinventory" && targetInventory.type === "weapon"))
        ) {
          // for passing data to server same inventory //

          const fromSlotData =
            targetInventory?.item?.name &&
            targetInventory?.item?.name === source?.item?.name &&
            isObjMatched(source?.item?.info, targetInventory?.item?.info)
              ? {}
              : !targetInventory?.item?.name
              ? {}
              : targetInventory?.item?.name !== source?.item?.name
              ? {
                  ...targetInventory.item,
                  slot: source.item.slot,
                }
              : {
                  ...targetInventory.item,
                  slot: source.item.slot,
                };
          const changeSlotData = {
            identifier: source.identifier,
            fromSlot: source.item.slot,
            fromSlotData,

            toSlot: targetInventory.item.slot,
            toSlotData: {
              ...source.item,
              slot: targetInventory.item.slot,
              amount:
                targetInventory?.item?.name === source?.item?.name &&
                isObjMatched(source?.item?.info, targetInventory?.item?.info)
                  ? Number(targetInventory.item.amount) + Number(source.item.amount)
                  : source.item.amount,
            },
          };
          UpdateDataToServer(changeSlotData);
        } else {
          // for passing data to server dif inventory //

          const slotData =
            targetInventory?.item?.name &&
            targetInventory?.item?.name === source?.item?.name &&
            isObjMatched(source?.item?.info, targetInventory?.item?.info)
              ? {}
              : !targetInventory?.item?.name
              ? {}
              : targetInventory?.item?.name !== source?.item?.name
              ? {
                  ...targetInventory.item,
                  slot: source.item.slot,
                }
              : {
                  ...targetInventory.item,
                  slot: source.item.slot,
                };

          const transferSlotData = {
            fromInv: {
              identifier: source.identifier,
              slot: source.item.slot,
              slotData,
            },
            toInv: {
              identifier: targetInventory.identifier,
              slot: targetInventory.item.slot,
              slotData: {
                ...source.item,
                slot: targetInventory.item.slot,
                amount:
                  targetInventory?.item?.name === source?.item?.name &&
                  isObjMatched(source?.item?.info, targetInventory?.item?.info)
                    ? Number(targetInventory.item.amount) + Number(source.item.amount)
                    : source.item.amount,
              },
            },
          };
          if (source.type !== "weapon" && inventoryType !== "weapon")
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
          // condition for weapon expand slots //
          if (
            (source?.type === "weapon" && inventoryType === "playerinventory") ||
            (source?.type === "playerinventory" && inventoryType === "weapon") ||
            (source?.type === "weapon" && inventoryType === "weapon")
          ) {
            if (source?.type === "weapon" && inventoryType === "weapon") {
              const { ind, items, weightPercent, slots, ...restOfWeapon } = state.weapon;
              const components = item?.name
                ? {
                    ...restOfWeapon.info.components,
                    [source?.item?.name]: {
                      ...restOfWeapon.info.components[source?.item?.name],
                      slot: item?.slot,
                    },
                    [item?.name]: {
                      ...restOfWeapon.info.components[item?.name],
                      slot: source?.item?.slot,
                    },
                  }
                : {
                    ...restOfWeapon.info.components,
                    [source?.item?.name]: {
                      ...restOfWeapon.info.components[source?.item?.name],
                      slot: item?.slot,
                    },
                  };
              const updatedData = {
                ...restOfWeapon,
                info: { ...restOfWeapon.info, components },
              };
              updateWeaponComponentToServer(updatedData);
              return true;
            }
            if (
              !isIncludedType(source?.item?.type) ||
              (source?.type === "playerinventory" &&
                inventoryType === "weapon" &&
                checkTypeIncluded(inventory?.items, source?.item?.type)) ||
              item?.name ||
              item?.type === "weapon"
            ) {
              return false;
            }
            const weapon = {
              name: state?.weapon?.name,
              slot: state?.weapon?.slot,
            };
            if (isIncludedType(source?.item?.type)) {
              if (source?.type === "weapon") {
                const removeComponent = {
                  weapon: { ...weapon },
                  component: {
                    name: source?.item?.name,
                    slot: item?.slot,
                    info: source?.item?.info,
                  },
                };
                removeWeaponComponentToServer(removeComponent);
                return true;
              } else {
                const addComponent = {
                  weapon: { ...weapon },
                  component: {
                    ...source?.item,
                    slot: item?.slot,
                    fromSlot: source?.item?.slot,
                  },
                };
                addWeaponComponentToServer(addComponent);
                return true;
              }
            }
          }
          // condition for amount based dnd //
          const inputAmount = selectedItems.find(
            (x) =>
              x?.identifier === source?.identifier &&
              x?.name === source?.item?.name &&
              x.slot === source?.item?.slot
          );

          // condition for buy products //
          if (source.type === "shop" && !source.item.info.buyPrice) {
            return false;
          }
          if (source.type === "shop" && source.item.info.buyPrice) {
            const buyData = {
              fromInv: {
                identifier: source.identifier,
                slot: source.item.slot,
                slotData: { ...source.item, amount: inputAmount?.selectedAmount || 1 },
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
          const amount =
            source?.item?.name === item?.name
              ? Number(item.amount) + inputAmount?.selectedAmount
              : inputAmount?.selectedAmount;
          const dynamicAmountData = {
            fromInv: {
              identifier: source.identifier,
              slot: source.item.slot,
              slotData: {
                ...source.item,
                amount: source?.item?.amount - inputAmount?.selectedAmount,
              },
            },
            toInv: {
              identifier: inventory.identifier,
              slot: item.slot,
              slotData:
                source?.item?.name === item?.name
                  ? {
                      ...item,
                      amount,
                    }
                  : { ...source.item, slot: item.slot, amount: inputAmount?.selectedAmount },
            },
          };

          // condition for sell products //
          if (source.type === "playerinventory" && inventoryType === "shop") {
            const sellData = {
              fromInv: {
                identifier: source.identifier,
                slot: source.item.slot,
                slotData: {
                  ...source.item,
                  amount: inputAmount?.selectedAmount || source.item.amount,
                },
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

          if (inputAmount?.selectedAmount) {
            UpdateDataToServer(dynamicAmountData);
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

    [inventoryType, item, state[inventoryType]?.weight, selectedItems, state?.weapon]
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
        gridColumn:
          weaponExpand && weaponItems?.ind === ind && item?.type === "weapon" && (ind + 1) % 6 !== 0
            ? "span 2"
            : "",
        gridRow:
          weaponExpand && weaponItems?.ind === ind && item?.type === "weapon" && (ind + 1) % 6 !== 0
            ? "span 2"
            : "",
      }}
      ref={mainDivRef}
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

      {true && inventoryType != "weapon" && (
        <div
          className="slot relative h-full"
          style={{
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
            color: textColor,
          }}
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
                  ) : item?.type === "account" ? (
                    <>
                      <FaMoneyCheckDollar className="me-1" /> {item?.amount}
                    </>
                  ) : (
                    item?.amount + "x"
                  )}
                </span>
              )}
              {item?.weight != 0 && item?.weight && item?.type != "account" && (
                <span className={item?.weight === 0 ? "hidden" : ""}>
                  {gramsToKilograms(item?.weight)}kg
                </span>
              )}
            </div>
            <img
              src={`./images/${item?.name}.png`}
              alt=""
              className="img-fluid slotImg mb-[12px]"
            />
            {item?.info?.quality != 0 &&
              item?.info?.quality &&
              inventoryType != "shop" &&
              inventoryType != "crafting" && (
                <div className="slotQuality w-full mt-[-15px]">
                  <Progress
                    percent={item?.info?.quality}
                    showInfo={false}
                    size={["100%", 4]}
                    strokeColor={calculateRGB(Number(item?.info?.quality))}
                    trailColor={hudBg}
                  />
                </div>
              )}

            {item?.type === "weapon" && weaponExpand && ind === weaponItems?.ind ? (
              <WeaponExpandSection
                {...{ ind, inventoryType, item, drop, drag, refs, setWeaponExpand, weaponExpand }}
              />
            ) : (
              ""
            )}

            {item?.type === "weapon" && inventoryType === "playerinventory" && (
              <div className={`absolute bottom-7 right-2 z-40`}>
                <FaExpand
                  className="text-[20px] "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (weaponExpand && ind === weaponItems?.ind) {
                      setWeaponExpand(false);
                      setWeaponItems(null);
                    } else {
                      setWeaponExpand(true);
                      setWeaponItems({ ...item, ind });
                    }
                  }}
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
                className="slotItemLabel border-t mt-[-6px]  w-full text-center"
                style={{ borderColor: slotBorderColor }}
              >
                <span>{item?.label}</span>
              </div>
            )}
          </div>
        </div>
      )}
      {true && inventoryType === "weapon" && (
        <div
          className="flex items-center justify-center "
          style={{
            height: 58,
            width: 58,
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
          }}
        >
          <img src={`./images/${item?.name}.png`} alt="" className="" />
        </div>
      )}
      {/* tooltip section */}
      {showTooltip && item?.name && !isRightButtonClick && !weaponExpand && (
        <div
          ref={tooltipRef}
          className={`flex flex-col absolute top-24 ${
            inventoryType != "playerinventory" && (ind + 1) % 4 === 0
              ? "right-24"
              : inventoryType != "playerinventory" && (ind - 2) % 4 === 0
              ? "left-5"
              : inventoryType === "playerinventory" && (ind - 4) % 6 === 0
              ? "left-14"
              : inventoryType === "playerinventory" && (ind + 1) % 6 === 0
              ? "right-24"
              : "left-24"
          } z-[500] bg-slate-800 border w-[200px] p-2`}
        >
          <h5> {item?.label}</h5>
          <div className="flex flex-col">
            <span> Amount: {item?.amount} </span>
            <span> Weight: {item?.weight} </span>
            {Object.keys(item?.info || {}).map((key, index) => {
              const value = item.info[key];
              if (typeof value === "object" && !Array.isArray(value)) return null;
              if (Array.isArray(value)) return null;
              return (
                <span key={index}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </span>
              );
            })}
          </div>
          <p>{item?.description}</p>
        </div>
      )}
    </div>
  );
};

const InventorySlot = React.memo(InventorySlotComponent);
export default InventorySlot;
