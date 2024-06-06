import { useDispatch } from "react-redux";
import "./App.css";
import { showRoot, hideRoot, keyMap } from "./utilities/utilis";
import { fetchNui } from "./utilities/fetchNui";
import Inventory from "./components/Inventory/Inventory";
import { setupInventory } from "./redux/inventorySlice";
import {
  primaryInvDummyData,
  secondaryInvDummyData,
  smallBackpackDummyData,
  largeBackpackDummyData,
  dropInvDummyData,
  shopInvDummyData,
} from "./dummyData";

import { useEffect, useState } from "react";
import DragPreview from "./components/sub-components/DragPreview";

let closeKey = "F2";
let isOpen = false;

function App() {
  if (!window.invokeNative) {
    let root = document.getElementById("root");
    root.style.backgroundImage = "url('./images/gamebg.png')";
    root.style.backgroundSize = "cover";
  }

  const dispatch = useDispatch();

  const [primaryInv, setPrimaryInv] = useState(!window.invokeNative ? primaryInvDummyData : null);

  const [secondaryInv, setSecondaryInv] = useState(!window.invokeNative ? shopInvDummyData : null);

  const [dropInv, setDropInv] = useState(!window.invokeNative ? dropInvDummyData : null);
  const [smallBackpack, setSmallBackpack] = useState(
    !window.invokeNative ? smallBackpackDummyData : null
  );
  const [largeBackpack, setLargeBackpack] = useState(
    !window.invokeNative ? largeBackpackDummyData : null
  );

  useEffect(() => {
    if (primaryInv) dispatch(setupInventory({ type: primaryInv?.type, item: primaryInv }));
  }, [primaryInv]);

  useEffect(() => {
    dispatch(setupInventory({ type: secondaryInv?.type, item: secondaryInv }));
  }, [secondaryInv]);

  useEffect(() => {
    if (dropInv) dispatch(setupInventory({ type: dropInv?.type, item: dropInv }));
  }, [dropInv]);

  useEffect(() => {
    if (smallBackpack)
      dispatch(setupInventory({ type: smallBackpack?.type2, item: smallBackpack }));
  }, [smallBackpack]);

  useEffect(() => {
    if (largeBackpack)
      dispatch(setupInventory({ type: largeBackpack?.type2, item: largeBackpack }));
  }, [largeBackpack]);

  useEffect(() => {
    fetchNui("loaded")
      .then((retData) => {})
      .catch((e) => {});
    const EventListener = function (event) {
      if (event.data.action == "open") {
        closeKey = event.data.closeKey;
        setPrimaryInv(event.data.primaryInv);
        setSecondaryInv(event.data.secondaryInv);
        setSmallBackpack(event.data.smallBackpack);
        setLargeBackpack(event.data.largeBackpack);
        setDropInv(event.data.dropInv);
        isOpen = true;
        showRoot();
      } else if (event.data.action == "setLocaleConfig") {
        setLocale(event.data.locale);
      } else if (event.data.action == "setPrimaryInv") {
        setPrimaryInv(event.data.primaryInv);
      } else if (event.data.action == "setSecondaryInv") {
        setSecondaryInv(event.data.secondaryInv);
      } else if (event.data.action == "setSmallBackpack") {
        setSmallBackpack(event.data.smallBackpack);
      } else if (event.data.action == "setLargeBackpack") {
        setLargeBackpack(event.data.largeBackpack);
      } else if (event.data.action == "setDropInv") {
        setDropInv(event.data.dropInv);
      }
    };
    document.onkeydown = function (data) {
      if (data.which == 27 || (isOpen && data.which == keyMap[closeKey])) {
        isOpen = false;
        hideRoot();
        fetchNui("invClosed")
          .then((retData) => {})
          .catch((e) => {});
      }
    };
    if (window.invokeNative) {
      hideRoot();
    }
    window.addEventListener("message", EventListener);
    return () => window.removeEventListener("message", EventListener);
  }, []);

  return (
    <>
      <Inventory />
      <DragPreview />
    </>
  );
}

export default App;
