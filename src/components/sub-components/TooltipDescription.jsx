import { useSelector } from "react-redux";

const TooltipDescription = ({ item }) => {
  const { textColor, tooltipBorderColor } = useSelector((state) => state.customizeSec);
  return (
    <>
      {item?.name && (
        <div
          className="flex flex-col  border leading-tight"
          style={{ width: 150, color: textColor, fontSize: 14, borderColor: tooltipBorderColor }}
        >
          <h5 className="border-b py-[2px] text-center" style={{ borderColor: tooltipBorderColor }}>
            {item?.label}
          </h5>
          <div className="flex flex-col px-2 py-1 text-[12px]">
            {item?.amount && <span> Amount: {item?.amount} </span>}
            {item?.weight && <span> Weight: {item?.weight} </span>}
            {Object.keys(item?.info || {}).map((key, index) => {
              const value = item.info[key];
              if (typeof value === "object" && !Array.isArray(value)) return null;
              if (Array.isArray(value)) return null;
              return (
                <span key={index}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </span>
              );
            })}
          </div>
          {item?.info?.required && (
            <div className="px-2 pb-1">
              <span>Required:</span>
              {Object.entries(item?.info.required).map(([key, value]) => (
                <div className="flex justify-start items-center text-[12px] ps-2" key={key}>
                  <span>{value?.label}:</span>
                  <span className="ms-[4px]">{value.amount}x</span>
                </div>
              ))}
            </div>
          )}
          {item?.description && (
            <p
              className="border-t text-center py-[2px] text-[12px]"
              style={{ borderColor: tooltipBorderColor }}
            >
              {item.description}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default TooltipDescription;
