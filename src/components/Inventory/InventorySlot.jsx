import React, { useRef } from "react";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";
// import { canCraftItem, canPurchaseItem, getItemUrl, isSlotWithItem } from "../../helpers";
import useNuiEvent from "../../hooks/useNuiEvent";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch } from "react-redux";
import { inventoryTypeChange } from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
// import { onDrop } from "../../dnd/onDrop";

const InventorySlot = ({ item, inventoryId, inventoryType }, ref) => {
  const manager = useDragDropManager();
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  // const canDrag = useCallback(() => {
  //   return (
  //     canPurchaseItem(item, { type: inventoryType, groups: inventoryGroups }) &&
  //     canCraftItem(item, inventoryType)
  //   );
  // }, [item, inventoryType, inventoryGroups]);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "SLOT",
      collect: (monitor) => {
        // console.log({ monitor, isDragging });
        return {
          isDragging: monitor.isDragging(),
        };
      },
      item: (a) => {
        // console.log({ a, inventoryType, item });
        return {
          inventory: inventoryType,
          item: {
            name: item.name,
            slot: item.slot,
          },
          image: item?.name && `url(${item?.name + ".png" || "none"})`,
        };
      },
      canDrag: true,
    }),
    [inventoryType, item]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "SLOT",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (main) => {
        const targetInventory = {
          inventory: inventoryTypeChange[inventoryType],
          item,
        };
        const source = { ...main, inventory: inventoryTypeChange[main.inventory] };
        dispatch(changeSlot({ source, targetInventory }));
        // console.log({ inventory: inventoryTypeChange[inventoryType] });
        // onDrop(source, { inventory: inventoryType, item: { slot: item.slot } });
        // switch (source.inventory) {
        //   case "shop":
        //     onBuy(source, { inventory: inventoryType, item: { slot: item.slot } });
        //     break;
        //   case "crafting":
        //     onCraft(source, { inventory: inventoryType, item: { slot: item.slot } });
        //     break;
        //   default:
        //     onDrop(source, { inventory: inventoryType, item: { slot: item.slot } });
        //     break;
        // }
      },
      canDrop: (source) =>
        (source.item.slot !== item.slot || source.inventory !== inventoryType) &&
        inventoryType !== "shop" &&
        inventoryType !== "crafting",
    }),
    [inventoryType, item]
  );

  useNuiEvent("refreshSlots", (data) => {
    if (!isDragging && !data.items) return;
    if (!Array.isArray(data.items)) return;

    const itemSlot = data.items.find(
      (dataItem) => dataItem.item.slot === item.slot && dataItem.inventory === inventoryId
    );

    if (!itemSlot) return;

    manager.dispatch({ type: "dnd-core/END_DRAG" });
  });

  const connectRef = (element) => drag(drop(element));

  const handleContext = (event) => {
    event.preventDefault();
    if (inventoryType !== "player" || !isSlotWithItem(item)) return;

    dispatch(openContextMenu({ item, coords: { x: event.clientX, y: event.clientY } }));
  };

  const handleClick = (event) => {
    // dispatch(closeTooltip());
    if (timerRef.current) clearTimeout(timerRef.current);
    // if (
    //   event.ctrlKey &&
    //   isSlotWithItem(item) &&
    //   onDrop({ item: item, inventory: inventoryType });
    //   inventoryType !== "shop" &&
    //   inventoryType !== "crafting"
    // ) {
    // } else if (event.altKey && isSlotWithItem(item) && inventoryType === "player") {
    //   onUse(item);
    // }
  };

  const refs = useMergeRefs([connectRef, ref]);

  return (
    <div
      ref={refs}
      onDrag={drag}
      onDrop={drop}
      onContextMenu={handleContext}
      onClick={handleClick}
      className="inventory-slot"
      style={{
        userSelect: "none",
        // filter:
        //   !canPurchaseItem(item, { type: inventoryType, groups: inventoryGroups }) ||
        //   !canCraftItem(item, inventoryType)
        //     ? "brightness(80%) grayscale(100%)"
        //     : undefined,
        opacity: isDragging ? 0.4 : 1.0,
        backgroundImage: `url(${item?.name + ".png"}`,
        border: isOver ? "1px dashed rgba(255,255,255,0.4)" : "",
      }}
    >
      {true && (
        <div
          className="item-slot-wrapper"
          style={{ backgroundColor: "green", margin: 5, height: 50 }}
          onMouseEnter={() => {
            timerRef.current = window.setTimeout(() => {
              // dispatch(openTooltip({ item, inventoryType }));
            }, 500);
          }}
          onMouseLeave={() => {
            // dispatch(closeTooltip());
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
        >
          <div>
            {inventoryType === "player" && item.slot <= 5 && (
              <div className="inventory-slot-number">{item.slot}</div>
            )}
            <div className="item-slot-info-wrapper">
              <p>
                {item.weight > 0
                  ? item.weight >= 1000
                    ? `${(item.weight / 1000).toLocaleString("en-us", {
                        minimumFractionDigits: 2,
                      })}kg `
                    : `${item.weight.toLocaleString("en-us", {
                        minimumFractionDigits: 0,
                      })}g `
                  : ""}
              </p>
              <p>{item.count ? item.count.toLocaleString("en-us") + `x` : ""}</p>
            </div>
          </div>
          <div>
            <div className="inventory-slot-label-box">
              <div className="inventory-slot-label-text">{item?.name} change</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(React.forwardRef(InventorySlot));
