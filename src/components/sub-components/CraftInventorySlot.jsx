import { IoIosInfinite } from "react-icons/io";
import { gramsToKilograms } from "../../utilities/utilis";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { closeContextMenu, handleContextInput, openContextMenu } from "../../redux/contextSlice";

const CraftInventorySlot = ({ item, inventory }) => {
  const { type, type2 } = inventory;
  const inventoryType = type === "backpack" ? type2 : type;
  const dispatch = useDispatch();
  const [isRightButtonClick, setIsRightButtonClick] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const { slotBg, slotBorderColor, slotBorderRound } = useSelector((state) => state.customizeSec);

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

  return (
    <div
      className="slot relative"
      style={{ backgroundColor: slotBg, borderRadius: slotBorderRound }}
      onContextMenu={handleRightButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center justify-between flex-col w-full h-full">
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
          <img src={`./images/${item?.name}.png`} alt="" className="img-fluid slotImg mb-[12px]" />

          {item?.label && (
            <div
              className="slotItemLabel border mt-[-6px]  w-full text-center"
              style={{ borderColor: slotBorderColor }}
            >
              <span>{item?.label}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span>items</span>
          <span>items</span>
          <span>items</span>
          <span>items</span>
          <span>items</span>
        </div>
      </div>
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

export default CraftInventorySlot;
