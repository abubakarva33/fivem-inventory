import React from "react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { useMergeRefs } from "@floating-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { gramsToKilograms } from "../../utilities/utilis";
import { changeSlot } from "../../redux/inventorySlice";
import { Progress } from "antd";

const InventorySlotComponent = ({ item, inventoryType }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(() => {
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
          item: {
            name: item.name,
            slot: item.slot,
          },
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
        };
        const source = { ...main, inventory: main.inventory };
        dispatch(changeSlot({ source, targetInventory }));
      },
      canDrop: (source) => source.item.slot !== item.slot || source.inventory !== inventoryType,
    }),
    [inventoryType, item]
  );

  const connectRef = (element) => drag(drop(element));
  const refs = useMergeRefs([connectRef]);

  return (
    <div
      className="relative"
      style={{
        userSelect: "none",
        opacity: isDragging ? 0.4 : 1.0,
        backgroundImage: `url(${item?.name + ".png"}`,
        border: `1px dashed ${isOver ? " rgba(255,255,255,0.4)" : "transparent"}`,
      }}
    >
      <DragPreviewImage connect={preview} src={item?.name} />
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

// export default React.memo(React.forwardRef(InventorySlot));

const InventorySlot = React.memo(React.forwardRef(InventorySlotComponent));
export default InventorySlot;
