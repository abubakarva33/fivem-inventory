import { useSelector } from "react-redux";

const SlotEach = ({ data }) => {
  const { slotBg } = useSelector((state) => state.customizeSec);

  return (
    <div className="slot rounded-md" style={{ backgroundColor: slotBg }}>
      {data}
    </div>
  );
};

export default SlotEach;
