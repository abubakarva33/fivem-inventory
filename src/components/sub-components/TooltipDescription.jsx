import { useSelector } from "react-redux";

const TooltipDescription = ({ item }) => {
  const { textColor } = useSelector((state) => state.customizeSec);
  return (
    <>
      {item?.name && (
        <div
          className="flex flex-col  border leading-tight"
          style={{ width: 150, color: textColor, fontSize: 14 }}
        >
          <h5 className="border-b py-[2px] text-center"> {item?.label}</h5>
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
          <p className="border-t text-center py-[2px] text-[12px]">{item?.description}</p>
        </div>
      )}
    </>
  );
};

export default TooltipDescription;
