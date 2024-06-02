import { ColorPicker, Modal, Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeSlot } from "../../redux/customizeSlice";

const CustomizeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const {
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    slotBorderRound,
    btnColor,
  } = useSelector((state) => state.customizeSec);
  const [color, setColor] = useState({
    boxBg,
    boxBorderColor,
    boxBorderRound,
    slotBg,
    slotBorderColor,
    textColor,
    slotBorderRound,
    btnColor,
  });
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const colorHandler = (type, value) => {
    setColor((prevColor) => ({
      ...prevColor,
      [type]: value,
    }));
  };

  useEffect(() => {
    if (color?.slotBg?.metaColor) {
      const { r, g, b } = color?.slotBg?.metaColor || null;
      dispatch(customizeSlot(`rgba(${r?.toFixed(0)},${g?.toFixed(0)},${b?.toFixed(0)},0.50)`));
    }
  }, [color]);

  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="flex">
        <div className="w-full">
          <Slider defaultValue={30} />
          <div>
            <ColorPicker
              value={color?.slotBg}
              onChange={(value) => colorHandler("slotBg", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Slot Color</div>
            </ColorPicker>
            <ColorPicker
              value={color?.slotBorderColor}
              onChange={(value) => colorHandler("slotBorderColor", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Slot Border Color</div>
            </ColorPicker>
          </div>
        </div>
        <div className="w-full">
          <Slider defaultValue={30} />
          <div>
            <ColorPicker
              value={color?.boxBg}
              onChange={(value) => colorHandler("boxBg", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Inventory Color</div>
            </ColorPicker>
            <ColorPicker
              value={color?.boxBorderColor}
              onChange={(value) => colorHandler("boxBorderColor", value)}
              placement="top"
            >
              <div className="border rounded bg-slate-600 p-3">Inventory Border Color</div>
            </ColorPicker>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-full">
          <ColorPicker
            value={color?.textColor}
            onChange={(value) => colorHandler("textColor", value)}
            placement="top"
          >
            <div className="border rounded bg-slate-600 p-3">Text Color</div>
          </ColorPicker>
        </div>
        <div className="w-full">
          <ColorPicker
            value={color?.btnColor}
            onChange={(value) => colorHandler("btnColor", value)}
            placement="top"
          >
            <div className="border rounded bg-slate-600 p-3">button Color</div>
          </ColorPicker>
        </div>
      </div>
    </Modal>
  );
};

export default CustomizeModal;
