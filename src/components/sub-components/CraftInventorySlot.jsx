import { IoIosInfinite } from "react-icons/io";
import { gramsToKilograms } from "../../utilities/utilis";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeContextMenu, handleDegInput, openContextMenu } from "../../redux/contextSlice";
import { fetchNui } from "../../utilities/fetchNui";

const CraftInventorySlot = ({ item, inventory }) => {
  const { type, type2 } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const dispatch = useDispatch();
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const { slotBg, slotBorderColor, slotBorderRound, textColor } = useSelector(
    (state) => state.customizeSec
  );
  const { deg } = useSelector((state) => state.context);
  useEffect(() => {
    const EventListener = function (event) {
      if (event.data.action == "setloading") {
        if (item.slot == event.data.slot) {
          dispatch(handleDegInput(360));

          const timeMS = 0.6;
          const time = item.info.duration;

          const totalIntervals = (time * 1000) / (timeMS * 100); // Convert time to milliseconds and calculate total intervals
          const decrementPerInterval = 360 / totalIntervals;

          const interval = setInterval(() => {
            dispatch(
              handleDegInput((prevDeg) => {
                const newDeg = prevDeg - decrementPerInterval;
                if (newDeg <= 0) {
                  clearInterval(interval);
                  fetchNui("craftFinish", item)
                    .then((retData) => {})
                    .catch((e) => {});
                  return 0;
                }
                return newDeg;
              })
            );
          }, timeMS * 100);
        }
      }
    };
    window.addEventListener("message", EventListener);
    return () => window.removeEventListener("message", EventListener);
  }, []);

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
            <div className="absolute container">
              <div
                className="progress"
                style={{
                  background: `conic-gradient(rgba(0, 0, 0, 0.582) ${deg}deg, transparent 0%)`,
                }}
              ></div>
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
            <div className="flex flex-col overflow-auto" style={{ color: textColor }}>
              {Object.entries(item?.info.required).map(([key, value]) => (
                <div className="flex justify-center items-center text-[14px] " key={key}>
                  <img src={`./images/${key}.png`} alt="" style={{ height: 30, width: 30 }} />
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
