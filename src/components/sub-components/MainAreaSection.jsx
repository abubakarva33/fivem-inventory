import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";

const MainAreaSection = ({ renderSlots, mainArea }) => {
  return (
    <div className="mainArea">
      <div className="mainAreaTop">
        <div className="mb-3">
          <div className="flex items-center	w-2/5">
            <div className="border rounded-full p-2 text-xl me-2">
              <BsBoxes />
            </div>
            <p className="border px-4 text-lg rounded-lg">Menan AK47</p>
          </div>
          <Progress percent={50} showInfo={false} size={["100%", 30]} />
          <div className="border rounded-full p-2 text-xl">
            <BsBoxes />
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
              <BsBoxes className="me-2" />
              <span>95%</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
              <BsBoxes className="me-2" />
              <span>9565465</span>
            </div>
            <div className="flex items-center border me-2 px-2 py-1 rounded-xl">
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
