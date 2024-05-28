import { useDispatch } from "react-redux";
import "./App.css";
import Inventory from "./components/Inventory/Inventory";
import { setupInventory } from "./redux/inventorySlice";
import {
  primaryInvDummyData,
  secondaryInvDummyData,
  smallBackpackDummyData,
  largeBackpackDummyData,
} from "./dummyData";

import { useEffect } from "react";
import DragPreview from "./components/sub-components/DragPreview";

function App() {
  const dispatch = useDispatch();

  // store all inventory data here //
  const inventoryData = [
    primaryInvDummyData,
    secondaryInvDummyData,
    smallBackpackDummyData,
    largeBackpackDummyData,
  ];

  useEffect(() => {
    inventoryData.map((item) => dispatch(setupInventory({ type: item.type, item })));
  }, [inventoryData]);

  return (
    <>
      <Inventory />
      <DragPreview />
    </>
  );
}

export default App;
