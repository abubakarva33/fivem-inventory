import { useSelector } from "react-redux";

const ItemAction = ({ item }) => {
  const { slotBg, slotTextBg, slotBorderColor, slotBorderRound, textColor } = useSelector(
    (state) => state.customizeSec
  );
  return (
    <div
      className="flex items-center justify-between flex-col mx-2"
      style={{
        backgroundColor: slotBg,
        borderRadius: slotBorderRound,
        border: `1px solid ${slotBorderColor}`,
        color: textColor,
        width: 100,
        fontSize: 12,
      }}
    >
      {item?.action && (
        <div
          className="w-full text-center"
          style={{
            borderColor: slotBorderColor,
            backgroundColor: slotTextBg,
            borderTopLeftRadius: slotBorderRound,
            borderTopRightRadius: slotBorderRound,
          }}
        >
          <span className="capitalize">{item?.action}</span> <span>{item?.amount}x</span>
        </div>
      )}
      <img src={`./images/${item?.name}.png`} alt="" className="img-fluid slotImg mb-[12px] z-20" />

      {item?.label && (
        <div
          className="slotItemLabel border-t mt-[-6px]  w-full text-center"
          style={{
            borderColor: slotBorderColor,
            backgroundColor: slotTextBg,
            borderBottomLeftRadius: slotBorderRound,
            borderBottomRightRadius: slotBorderRound,
          }}
        >
          <span className="uppercase">{item?.label}</span>
        </div>
      )}
    </div>
  );
};

export default ItemAction;
