import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TooltipDescription from "./TooltipDescription";

const Tooltip = () => {
  const hoverData = useSelector((state) => state.tooltip);
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
      {hoverData.item && hoverData.inventoryType && (
        <div className="absolute bg-slate-900 z-[500000]" style={{ ...tooltipStyle }}>
          <TooltipDescription item={hoverData.item} />
        </div>
      )}
    </>
  );
};

export default Tooltip;
