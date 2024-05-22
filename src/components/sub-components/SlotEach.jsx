import { useSelector } from "react-redux";
import { gramsToKilograms } from "../../utilities/utilis";
import { Progress } from "antd";

const SlotEach = ({ data, ind }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  console.log(ind);

  return (
    <div className="slot rounded-md" style={{ backgroundColor: slotBg }}>
      <div className="flex items-center justify-between flex-col w-full h-full">
        <div className="flex items-center justify-between w-full px-2">
          {data?.amount && <span className="">{data?.amount}x</span>}
          {data?.weight && <span className="">{gramsToKilograms(data?.weight)}kg</span>}
        </div>
        <img src={`/images/${data?.name}.png`} alt="" className="img-fluid slotImg" />
        {data?.quality && (
          <div className="slotQuality w-full mt-[-18px]">
            <Progress
              percent={data?.quality}
              showInfo={false}
              size={["100%", 2]}
              strokeColor={slotBorder}
              trailColor="#555"
            />
          </div>
        )}
        {data?.label && (
          <div
            className="slotItemLabel border  w-full text-center"
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
