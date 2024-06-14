import { FaExpand } from "react-icons/fa";
import { useSelector } from "react-redux";

const WeaponExpandSection = ({ item, weaponExpand, setWeaponExpand, refs, drag, drop }) => {
  const { slotBorderColor, slotBorderRound, slotBg, textColor } = useSelector(
    (state) => state.customizeSec
  );
  return (
    <div
      className=" absolute top-[-2px] left-[-1px]
                 bg-slate-600 z-50 p-2"
      style={{
        height: 266,
        width: 268,
        borderRadius: slotBorderRound,
        border: `1px solid ${slotBorderColor}`,
      }}
    >
      <div className="flex ">
        <div
          className="slot relative"
          style={{
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
            color: textColor,
            width: 170,
            height: 180,
          }}
        >
          <div
            ref={refs}
            onDrag={drag}
            onDrop={drop}
            className="absolute top-0 left-0 right-0 bottom-0 z-40"
          ></div>
          <div className="flex items-center justify-between flex-col w-full h-full">
            <img
              src={`./images/${item?.name}.png`}
              alt=""
              className="img-fluid slotImg mb-[12px]"
            />

            {item?.type === "weapon" && (
              <div className={`absolute bottom-7 right-2 z-50 `}>
                <FaExpand className="text-[20px] " onClick={() => setWeaponExpand(!weaponExpand)} />
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
        <div className="flex flex-col items-center ms-5 ">
          <div
            className="bg-slate-900 "
            style={{
              height: 57.5,
              marginBottom: 5,
              width: 58,
              backgroundColor: slotBg,
              borderRadius: slotBorderRound,
              border: `1px solid ${slotBorderColor}`,
            }}
          >
            <img src="/public/images/at_grip.png" alt="" />
          </div>
          <div
            className="bg-slate-900 "
            style={{
              height: 57.5,
              marginBottom: 5,
              width: 58,
              backgroundColor: slotBg,
              borderRadius: slotBorderRound,
              border: `1px solid ${slotBorderColor}`,
            }}
          ></div>
          <div
            className="bg-slate-900 "
            style={{
              height: 57.5,
              marginBottom: 5,
              width: 58,
              backgroundColor: slotBg,
              borderRadius: slotBorderRound,
              border: `1px solid ${slotBorderColor}`,
            }}
          ></div>
          <div
            className="bg-slate-900 "
            style={{
              height: 57.5,
              marginBottom: 5,
              width: 58,
              backgroundColor: slotBg,
              borderRadius: slotBorderRound,
              border: `1px solid ${slotBorderColor}`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex absolute bottom-0 left-0  ms-2 items-center mb-[8px]">
        <div
          className="bg-slate-900 "
          style={{
            height: 57.5,
            marginRight: 5,
            width: 58,
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
          }}
        ></div>
        <div
          className="bg-slate-900 "
          style={{
            height: 57.5,
            marginRight: 5,
            width: 58,
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
          }}
        ></div>
        <div
          className="bg-slate-900 "
          style={{
            height: 57.5,
            marginRight: 5,
            width: 58,
            backgroundColor: slotBg,
            borderRadius: slotBorderRound,
            border: `1px solid ${slotBorderColor}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default WeaponExpandSection;
