import React, { useRef, useState } from "react";
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
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = window.setTimeout(() => {
      dispatch(openTooltip({ item, inventoryType }));
    }, 1000);
  };

  const handleMouseLeave = () => {
    dispatch(closeTooltip());
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleRightButtonClick = (event) => {
    event.preventDefault();
    dispatch(closeTooltip());
    if (timerRef.current) clearTimeout(timerRef.current);
    const { items, ...restOfInventory } = inventory;
    setIsRightButtonClick(!isRightButtonClick);
    if (
      item?.name &&
      (inventoryType === "playerinventory" ||
        inventoryType === "shop" ||
        inventoryType === "crafting" ||
        inventoryType === "drop" ||
        type === "backpack")
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
        dispatch(closeTooltip());
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
            fromInvWeight: state[type].weight,
            toSlot: targetInventory.item.slot,
            toInvWeight: state[type].weight,
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
            fromInvWeight: state[source.type]?.weight - source?.item?.amount * source?.item?.weight,
            toInvWeight: state[inventoryType]?.weight + source?.item?.amount * source?.item?.weight,
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
          if (source.type !== "weapon" && inventoryType !== "weapon") console.log("eita");
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
            fromInvWeight:
              state[source.type]?.weight -
              (source?.item?.amount - inputAmount?.selectedAmount) * source?.item?.weight,
            toInvWeight:
              state[inventoryType]?.weight + inputAmount?.selectedAmount * source?.item?.weight,
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
                  {gramsToKilograms(item?.weight * item?.amount)}kg
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  style={{ cursor: "pointer", marginBottom: 5 }}
                  onClick={() => {
                    if (weaponExpand && ind === weaponItems?.ind) {
                      setWeaponExpand(false);
                      setWeaponItems(null);
                    } else {
                      setWeaponExpand(true);
                      setWeaponItems({ ...item, ind });
                    }
                  }}
                >
                  <image
                    id="Rectangle_1"
                    data-name="Rectangle 1"
                    width="200"
                    height="200"
                    xlinkHref="data:img/png;base64,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"
                  />
                </svg>
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
    </div>
  );
};

const InventorySlot = React.memo(InventorySlotComponent);
export default InventorySlot;
