import { Progress, Radio } from "antd";
import { useState } from "react";

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
  const [value3, setValue3] = useState("glove");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };
  return (
    <div className="secondaryArea ">
      <div className="secondaryAreaTop">
        <Progress percent={50} showInfo={false} size={["100%", 30]} />
        <Radio.Group
          className="w-full my-2"
          size="large"
          options={options}
          onChange={onChange3}
          value={value3}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="section">{renderSlots(ground)}</div>
    </div>
  );
};

export default SecondaryArea;
