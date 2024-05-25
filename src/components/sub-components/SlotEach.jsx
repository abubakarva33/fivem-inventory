import { useSelector } from "react-redux";
import { gramsToKilograms } from "../../utilities/utilis";
import { Progress } from "antd";
import { useDrag } from "react-dnd";

const SlotEach = ({ data, ind }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const [{ isDragging }, drag] = useDrag({
    type: "SLOT_ITEM", // Add a type property here
    item: { id: data?.name, index: ind },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="slot rounded-md" style={{ backgroundColor: slotBg }}>
      <div
        className="flex items-center justify-between flex-col w-full h-full"

        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="flex items-center justify-between w-full px-2">
          {data?.amount && <span className="">{data?.amount}x</span>}
          {data?.weight && <span className="">{gramsToKilograms(data?.weight)}kg</span>}
        </div>
        <img src={`/images/${data?.name}.png`} alt="" className="img-fluid slotImg mb-[12px]" />
        {data?.quality && (
          <div className="slotQuality w-full mt-[-24px]">
            <Progress
              percent={data?.quality}
              showInfo={false}
              size={["100%", 4]}
              strokeColor={"green"}
              trailColor="#555"
            />
          </div>
        )}
        {data?.label && (
          <div
            className="slotItemLabel border mt-[-6px]  w-full text-center"
            style={{ borderColor: slotBorder }}
          >
            <span>{data?.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotEach;
