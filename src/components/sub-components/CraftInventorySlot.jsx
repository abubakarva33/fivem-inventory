import { IoIosInfinite } from "react-icons/io";
import { gramsToKilograms } from "../../utilities/utilis";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeContextMenu, openContextMenu } from "../../redux/contextSlice";
import { Spin } from "antd";

const CraftInventorySlot = ({ item, inventory }) => {
  const { type, type2 } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const dispatch = useDispatch();
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const [boxSize, setBoxSize] = useState(110);
  const { slotBg, slotBorderColor, slotBorderRound, textColor } = useSelector(
    (state) => state.customizeSec
  );

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
    } else {
      dispatch(closeContextMenu());
    }
  };

  const timer = 20000 / 20;

  useEffect(() => {
    const interval = setInterval(() => {
      if (boxSize > 0) {
        setBoxSize((prevSize) => prevSize - 5);
      } else {
        clearInterval(interval);
      }
    }, timer);

    return () => clearInterval(interval);
  }, [boxSize]);

  return (
    <div
      className="slot relative p-2"
      style={{
        backgroundColor: slotBg,
        border: `1px solid ${slotBorderColor}`,
        borderRadius: slotBorderRound,
      }}
      onContextMenu={handleRightButtonClick}
    >
      {item?.name && (
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div
            className="relative flex items-center justify-center h-full flex-col"
            style={{ border: `1px solid ${slotBorderColor}`, borderRadius: 10, color: textColor }}
          >
            <div
              className="absolute flex items-center justify-center bg-neutral-900 transition-all duration-500"
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
              }}
            >
              <Spin spinning={true}> </Spin>
            </div>
            <div className="flex items-center justify-between w-full px-2">
              {item?.amount && (
                <span className="flex items-center justify-center">
                  {item?.amount === -1 ? (
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

            {item?.label && (
              <div
                className="slotItemLabel border-t mt-[-6px]  w-full text-center"
                style={{ borderColor: slotBorderColor }}
              >
                <span>{item?.label}</span>
              </div>
            )}
          </div>

          {item?.info?.required && (
            <div className="flex flex-col justify-center" style={{ color: textColor }}>
              {Object.entries(item?.info.required).map(([key, value]) => (
                <div className="flex text-[14px]" key={key}>
                  <img src={`./images/${key}.png`} alt="" style={{ height: 22, width: 30 }} />
                  <span className="mx-2">{value.label}:</span>
                  <span>x{value.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CraftInventorySlot;
