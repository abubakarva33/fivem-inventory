import { FaExpand } from "react-icons/fa";
import { useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";

const WeaponExpandSection = ({
  ind,
  inventoryType,
  item,
  drop,
  drag,
  refs,
  setWeaponExpand,
  weaponExpand,
}) => {
  const state = useSelector((state) => state.inventory);
  const { slotBorderColor, slotBorderRound, slotBg, textColor } = useSelector(
    (state) => state.customizeSec
  );

  return (
    <div
      className={`absolute top-[-2px] ${
        inventoryType === "playerinventory" && (ind + 1) % 6 === 0 ? "right-[-2px]" : "left-[-2px]"
      }  bg-slate-600 z-50 p-2`}
      style={{
        height: 268,
        width: 268,
        borderRadius: slotBorderRound,
        border: `1px solid ${slotBorderColor}`,
      }}
    >
      <div className="flex">
        <div
          className="slot relative"
          style={{
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
            color: textColor,
            width: 177,
            height: 180,
          }}
        >
          <div
            ref={refs}
            onDrag={drag}
            onDrop={drop}
            className="absolute top-0 left-0 right-0 bottom-0 z-40"
          ></div>
          <div className="flex items-center justify-between flex-col h-full" style={{ width: 200 }}>
            <img
              src={`./images/${item?.name}.png`}
              alt=""
              className="img-fluid"
              style={{ height: 140 }}
            />

            {item?.type === "weapon" && (
              <div className={`absolute cursor-pointer bottom-10 right-3 z-50 `}>
                <FaExpand className="text-[24px] " onClick={() => setWeaponExpand(!weaponExpand)} />
              </div>
            )}

            {item?.label && (
              <div
                className="slotItemLabel border-t text-[18px]  w-full text-center"
                style={{ borderColor: slotBorderColor }}
              >
                <span>{item?.label}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col-reverse items-center ms-3 ">
          {Array.isArray(state?.weapon?.items) &&
            state?.weapon?.items?.slice(4, 7)?.map((i, ind) => (
              <div style={{ marginBottom: 5 }} key={`${item.type}-${item.id}-${i.slot}`}>
                <InventorySlot item={i} inventory={state?.weapon} ind={ind} />
              </div>
            ))}
        </div>
      </div>
      <div className="flex absolute bottom-0 left-0  ms-2 items-center mb-[8px]">
        {Array.isArray(state?.weapon?.items) &&
          state?.weapon?.items?.slice(0, 4)?.map((i, ind) => (
            <div style={{ marginRight: 5 }} key={`${item.type}-${item.id}-${i.slot}`}>
              <InventorySlot item={i} inventory={state?.weapon} ind={ind} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeaponExpandSection;
