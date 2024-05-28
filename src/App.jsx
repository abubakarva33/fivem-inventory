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
import DragPreview from "./components/Inventory/DragPreview";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  // store all inventory data
  const inventoryData = [
    primaryInvDummyData,
    secondaryInvDummyData,
    smallBackpackDummyData,
    largeBackpackDummyData,
  ];

  useEffect(() => {
    inventoryData.map((item) => dispatch(setupInventory({ type: item.type, item })));
  }, [inventoryData]);

  // dispatch(
  //   setupInventory({
  //     backpackInventory: smallBackpackDummyData,
  //     primaryInventory: primaryInvDummyData,
  //     secondaryInventory: secondaryInvDummyData,
  //   })
  // );

  return (
    <>
      <Inventory />
      <DragPreview />
    </>
  );
}

export default App;
