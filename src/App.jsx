import { useDispatch } from "react-redux";
import "./App.css";
import { showRoot, hideRoot } from "./utilities/utilis";
import { fetchNui } from "./utilities/fetchNui";
import Inventory from "./components/Inventory/Inventory";
import { setupInventory } from "./redux/inventorySlice";
import {
  primaryInvDummyData,
  secondaryInvDummyData,
  smallBackpackDummyData,
  largeBackpackDummyData,
  dropInvDummyData,
} from "./dummyData";

import { useEffect, useState } from "react";
import DragPreview from "./components/sub-components/DragPreview";


function App() {
  const dispatch = useDispatch();

  const [primaryInv, setPrimaryInv] = useState(!window.invokeNative ? primaryInvDummyData : null);
  const [secondaryInv, setSecondaryInv] = useState(
    !window.invokeNative ? secondaryInvDummyData : null
  );
  const [dropInv, setDropInv] = useState(!window.invokeNative ? dropInvDummyData : null);
  const [smallBackpack, setSmallBackpack] = useState(
    !window.invokeNative ? smallBackpackDummyData : null
  );
  const [largeBackpack, setLargeBackpack] = useState(null);

  useEffect(() => {
    dispatch(setupInventory({ type: primaryInv?.type, item: primaryInv }));
  }, [primaryInv]);

  useEffect(() => {
    dispatch(setupInventory({ type: secondaryInv?.type, item: secondaryInv }));
  }, [secondaryInv]);

  useEffect(() => {
    dispatch(setupInventory({ type: dropInv?.type, item: dropInv }));
  }, [dropInv]);

  useEffect(() => {
    dispatch(setupInventory({ type: smallBackpack?.type, item: smallBackpack }));
  }, [smallBackpack]);

  useEffect(() => {
    dispatch(setupInventory({ type: largeBackpack?.type, item: largeBackpack }));
  }, [largeBackpack]);

  useEffect(() => {
    fetchNui("loaded")
      .then((retData) => {})
      .catch((e) => {});
    const EventListener = function (event) {
      if (event.data.action == "open") {
        showRoot();
        setPrimaryInv(event.data.primaryInv);
        setSecondaryInv(event.data.secondaryInv);
        setSmallBackpack(event.data.smallBackpack);
        setLargeBackpack(event.data.largeBackpack);
        setDropInv(event.data.dropInv);
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
    document.onkeyup = function (data) {
      if (data.which == 27) {
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
