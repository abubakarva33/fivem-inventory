import { useDispatch } from "react-redux";
import "./App.css";
import Inventory from "./components/Inventory/Inventory";
import { setupInventory } from "./redux/inventorySlice";
import { primaryInvDummyData, secondaryInvDummyData, smallBackpackDummyData } from "./dummyData";

function App() {
  const dispatch = useDispatch();
  dispatch(
    setupInventory({
      backpackInventory: smallBackpackDummyData,
      primaryInventory: primaryInvDummyData,
      secondaryInventory: secondaryInvDummyData,
    })
  );

  return <Inventory />;
}

export default App;
