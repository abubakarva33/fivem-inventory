import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";

const MainAreaSection = ({ renderSlots, mainArea }) => {
  return (
    <div className="mainArea">
      <div className="mainAreaTop">
        <div className="mb-3">
          <div className="flex items-center	w-[36%]">
            <div className="border rounded-full p-2 text-xl me-2 bg-[#555]">
              <BsBoxes />
            </div>
            <p className="border border-[#908c8c] px-5 py-1 bg-[#555] text-lg rounded-[20px]">
              Menan AK47
            </p>
          </div>
          <Progress
            percent={50}
            showInfo={false}
            size={["100%", 35]}
            strokeColor="#908c8c"
            trailColor="#666"
          />
          <div className="border rounded-full bg-[#555] p-2 text-xl">
            <BsBoxes />
          </div>
        </div>
        <div className="flex items-center text-xl justify-between mb-2">
          <div className="flex items-center">
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>9565465</span>
            </div>
            <div className="flex items-center bg-[#555] border border-[#908c8c] me-2 px-4 py-1 rounded-[20px]">
              <BsBoxes className="me-2" />
              <span>95655</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mainAreaSlot section">{renderSlots(mainArea)}</div>
    </div>
  );
};

export default MainAreaSection;
