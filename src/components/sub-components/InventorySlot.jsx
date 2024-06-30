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
  openBackpackHandler,
  removeWeaponComponentToServer,
  sellItemHandlerWithDnd,
  updateWeaponComponentToServer,
} from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";
import { closeContextMenu, handleContextInput, openContextMenu } from "../../redux/contextSlice";
import { IoIosInfinite } from "react-icons/io";
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
  openBackpacks,
  setOpenBackpacks,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { slotBg, slotTextBg, slotBorderColor, slotBorderRound, textColor, hudBg } = useSelector(
    (state) => state.customizeSec
  );
  const { selectedItems } = useSelector((state) => state.context);
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const { type, type2, maxWeight, identifier } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const timerRef = useRef(null);
  const isBackpackOpen = openBackpacks?.some((x) => x.info.identifier === item?.info?.identifier);

  const glowStyle = {
    background: `radial-gradient(circle, ${textColor} 0%, ${textColor}00 50%)`,
    boxShadow: `0 0 50px 20px ${textColor}70`,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

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
            fromInvWeight: state[inventoryType]?.weight,
            toSlot: targetInventory.item.slot,
            toInvWeight: state[inventoryType]?.weight,
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
          weaponExpand && weaponItems?.ind === ind && item?.type === "weapon" && (ind + 1) % 6 === 0
            ? "5 / span 2"
            : weaponExpand && weaponItems?.ind === ind && item?.type === "weapon"
            ? "span 2"
            : "",
        gridRow:
          weaponExpand && weaponItems?.ind === ind && item?.type === "weapon" && (ind + 1) % 6 === 0
            ? Math.ceil((ind + 1) / 6)
            : weaponExpand && weaponItems?.ind === ind && item?.type === "weapon"
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
              className="img-fluid slotImg mb-[12px] z-20"
            />
            {item?.info?.quality != 0 &&
              item?.info?.quality &&
              inventoryType != "shop" &&
              inventoryType != "crafting" && (
                <div className={`slotQuality w-full`}>
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

            {inventoryType === "playerinventory" && item?.type === "backpack" && isBackpackOpen && (
              <div className={`absolute bottom-7 right-[6px] z-40`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  cursor="pointer"
                  onClick={() =>
                    openBackpackHandler(
                      item,
                      openBackpacks.some(
                        (backpack) => backpack.info?.identifier === item.info?.identifier
                      ),
                      dispatch,
                      setOpenBackpacks
                    )
                  }
                >
                  <image
                    id="Rectangle_1"
                    data-name="Rectangle 1"
                    x="8"
                    y="13"
                    width="187"
                    height="181"
                    xlinkHref="data:img/png;base64,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"
                  />
                </svg>
              </div>
            )}
            {inventoryType === "playerinventory" &&
              item?.type === "backpack" &&
              !isBackpackOpen && (
                <div className={`absolute bottom-7 right-[6px] z-40`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="20"
                    height="20"
                    viewBox="0 0 200 200"
                    style={{ marginBottom: 3 }}
                    cursor="pointer"
                    onClick={() =>
                      openBackpackHandler(
                        item,
                        openBackpacks.some(
                          (backpack) => backpack.info?.identifier === item.info?.identifier
                        ),
                        dispatch,
                        setOpenBackpacks
                      )
                    }
                  >
                    <image
                      id="Rectangle_1"
                      data-name="Rectangle 1"
                      x="6"
                      y="10"
                      width="187"
                      height="200"
                      xlinkHref="data:img/png;base64,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"
                    />
                  </svg>
                </div>
              )}
            {item?.type === "weapon" && inventoryType === "playerinventory" && (
              <div className={`absolute bottom-7 right-2 z-40`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="15"
                  height="15"
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
                style={{
                  borderColor: slotBorderColor,
                  backgroundColor: slotTextBg,
                  borderBottomLeftRadius: slotBorderRound,
                  borderBottomRightRadius: slotBorderRound,
                }}
              >
                <span className="uppercase">{item?.label}</span>
              </div>
            )}

            <div style={glowStyle}></div>
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
