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
  const { slotBorderColor, slotBorderRound, slotBg, textColor, tooltipBg } = useSelector(
    (state) => state.customizeSec
  );

  return (
    <div
      className={`absolute top-[-1px] ${
        inventoryType === "playerinventory" && (ind + 1) % 6 === 0 ? "right-[-1px]" : "left-[-1px]"
      }  bg-slate-600 z-50 p-2`}
      style={{
        height: 267,
        width: 268,
        borderRadius: slotBorderRound,
        border: `1px solid ${slotBorderColor}`,
        backgroundColor: tooltipBg,
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  onClick={() => setWeaponExpand(!weaponExpand)}
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
