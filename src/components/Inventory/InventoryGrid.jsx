import { useEffect, useRef, useState } from "react";
import InventorySlot from "./InventorySlot";
import { useIntersection } from "../../hooks/useIntersection";
const PAGE_SIZE = 30;
const InventoryGrid = ({ inventory }) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  // const isBusy = useSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  // console.log({ containerRef, inventory });
  return (
    <>
      <div className="inventory-grid-wrapper">
        <div>
          <div className="inventory-grid-header-wrapper">
            <p>{inventory.label}</p>
          </div>
        </div>
        <div className="inventory-grid-container" ref={containerRef}>
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
