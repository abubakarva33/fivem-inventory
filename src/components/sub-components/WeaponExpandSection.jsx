import { useSelector } from "react-redux";

const WeaponExpandSection = () => {
  const { slotBorderColor, slotBorderRound } = useSelector((state) => state.customizeSec);
  return (
    <div
      className=" absolute top-[-2px] left-[-1px]
                 bg-slate-600 z-50"
      style={{
        height: 266,
        width: 268,
        borderRadius: slotBorderRound,
        border: `1px solid ${slotBorderColor}`,
      }}
    >
      {" "}
    </div>
  );
};

export default WeaponExpandSection;
