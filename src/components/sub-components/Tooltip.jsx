import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        <div
          className="absolute bg-slate-900 w-[150px] no-close z-[500]"
          onClick={(e) => e.stopPropagation()}
          style={{ ...tooltipStyle }}
        >
          {hoverData.item.label}
        </div>
      )}
    </>
  );
};

export default Tooltip;
