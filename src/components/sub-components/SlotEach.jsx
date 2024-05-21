import { useSelector } from "react-redux";

const SlotEach = ({ data }) => {
  const { slotBg } = useSelector((state) => state.customizeSec);

  return (
    <div className="slot rounded-md" style={{ backgroundColor: slotBg }}>
      <img src={`/images/${data?.name}.png`} alt="" className="img-fluid" />
    </div>
  );
};

export default SlotEach;
