import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TooltipDescription from "./TooltipDescription";

const Tooltip = () => {
  const hoverData = useSelector((state) => state.tooltip);
  const state = useSelector((state) => state.inventory);
  const { tooltipBg, tooltipBorderColor } = useSelector((state) => state.customizeSec);
  const { inventory } = useSelector((state) => state.context);
  const [tooltipStyle, setTooltipStyle] = useState({
    top: null,
    left: null,
  });

  const handleMouseMove = ({ clientX, clientY }) => {
    setTooltipStyle({ top: clientY + 10, left: clientX + 10 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {hoverData.item &&
        hoverData.inventoryType &&
        hoverData?.item?.slot !== inventory?.item?.slot &&
        hoverData?.item?.slot !== state?.weapon?.slot && (
          <div
            className="absolute bg-slate-900 z-[500000]"
            style={{ ...tooltipStyle, borderColor: tooltipBorderColor, backgroundColor: tooltipBg }}
          >
            <TooltipDescription item={hoverData.item} />
          </div>
        )}
    </>
  );
};

export default Tooltip;
