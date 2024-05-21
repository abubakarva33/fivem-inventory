import { ConfigProvider, Progress, Radio } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const options = [
  {
    label: "Glove Box",
    value: "glove",
  },
  {
    label: "Ground",
    value: "ground",
  },
];

const SecondaryArea = ({ renderSlots, ground }) => {
  const { slotBg, slotBorder } = useSelector((state) => state.customizeSec);
  const [value3, setValue3] = useState("glove");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };
  return (
    <div className="secondaryArea ">
      <div className="secondaryAreaTop">
        <Progress
          percent={50}
          showInfo={false}
          size={["100%", 35]}
          strokeColor={slotBorder}
          trailColor="#555"
        />
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: slotBg,
                buttonColor: "white",
                buttonSolidCheckedColor: "white",
                buttonSolidCheckedBg: slotBorder,
                buttonSolidCheckedActiveBg: slotBorder,
                buttonSolidCheckedHoverBg: slotBorder,
              },
            },
          }}
        >
          <Radio.Group
            className="w-full my-2 mt-4"
            size="large"
            options={options}
            onChange={onChange3}
            value={value3}
            optionType="button"
            buttonStyle="solid"
            style={{ border: "none" }}
          />
        </ConfigProvider>
      </div>
      <div className="border py-2 rounded-[20px] px-3" style={{ borderColor: slotBorder }}>
        <div className="section">{renderSlots(ground)}</div>
      </div>
    </div>
  );
};

export default SecondaryArea;
