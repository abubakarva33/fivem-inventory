import React, { useRef } from "react";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";
// import { canCraftItem, canPurchaseItem, getItemUrl, isSlotWithItem } from "../../helpers";
// import useNuiEvent from "../../hooks/useNuiEvent";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { gramsToKilograms, inventoryTypeChange } from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";
// import { onDrop } from "../../dnd/onDrop";

const InventorySlot = ({ item, inventoryId, inventoryType }, ref) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  // const manager = useDragDropManager();
  const dispatch = useDispatch();
  // const timerRef = useRef(null);

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

  // useNuiEvent("refreshSlots", (data) => {
  //   if (!isDragging && !data.items) return;
  //   if (!Array.isArray(data.items)) return;

  //   const itemSlot = data.items.find(
  //     (dataItem) => dataItem.item.slot === item.slot && dataItem.inventory === inventoryId
  //   );

  //   if (!itemSlot) return;

  //   manager.dispatch({ type: "dnd-core/END_DRAG" });
  // });

  const connectRef = (element) => drag(drop(element));

  // const handleContext = (event) => {
  //   event.preventDefault();
  //   if (inventoryType !== "player" || !isSlotWithItem(item)) return;

  //   dispatch(openContextMenu({ item, coords: { x: event.clientX, y: event.clientY } }));
  // };

  // const handleClick = (event) => {
  //   // dispatch(closeTooltip());
  //   if (timerRef.current) clearTimeout(timerRef.current);
  //   // if (
  //   //   event.ctrlKey &&
  //   //   isSlotWithItem(item) &&
  //   //   onDrop({ item: item, inventory: inventoryType });
  //   //   inventoryType !== "shop" &&
  //   //   inventoryType !== "crafting"
  //   // ) {
  //   // } else if (event.altKey && isSlotWithItem(item) && inventoryType === "player") {
  //   //   onUse(item);
  //   // }
  // };

  const refs = useMergeRefs([connectRef, ref]);

  return (
    <div
      // onContextMenu={handleContext}
      // onClick={handleClick}
      className="relative"
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

export default React.memo(React.forwardRef(InventorySlot));
