import { IoIosInfinite } from "react-icons/io";
import { gramsToKilograms } from "../../utilities/utilis";
import { useSelector } from "react-redux";

const CraftInventorySlot = ({ item }) => {
  const { slotBg, slotBorderColor, slotBorderRound } = useSelector((state) => state.customizeSec);

  return (
    <div
      className="slot relative"
      style={{ backgroundColor: slotBg, borderRadius: slotBorderRound }}
    >
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
    </div>
  );
};

export default CraftInventorySlot;
