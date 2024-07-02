import { useDispatch } from "react-redux";
import "./App.css";
import { showRoot, hideRoot, keyMap } from "./utilities/utilis";
import { fetchNui } from "./utilities/fetchNui";
import Inventory from "./components/Inventory/Inventory";
import { clearInventory, setupInventory } from "./redux/inventorySlice";
import {
  primaryInvDummyData,
  smallBackpackDummyData,
  largeBackpackDummyData,
  dropInvDummyData,
  craftingInvDummyData,
} from "./dummyData";

import { useEffect, useState } from "react";
import DragPreview from "./components/sub-components/DragPreview";
import { closeContextMenu } from "./redux/contextSlice";
import { closeTooltip } from "./redux/tooltipSlice";
import ItemAction from "./components/sub-components/ItemAction";

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

  const [secondaryInv, setSecondaryInv] = useState(
    !window.invokeNative ? craftingInvDummyData : null
  );
  const [dropInv, setDropInv] = useState(!window.invokeNative ? dropInvDummyData : null);
  const [smallBackpack, setSmallBackpack] = useState(
    !window.invokeNative ? smallBackpackDummyData : null
  );
  const [largeBackpack, setLargeBackpack] = useState(
    !window.invokeNative ? largeBackpackDummyData : null
  );

  const [itemsAction, setItemsAction] = useState([]);

  const addItemAction = (item, action) => {
    //  item= {item data}, action = pass action type like "Added" or "Removed" like this //
    const itemData = { ...item, action: action };
    setItemsAction((prevItems) => [...prevItems, itemData]);

    setTimeout(() => {
      setItemsAction((prevItems) => prevItems.filter((prevItem) => prevItem !== itemData));
    }, 5000 + itemsAction.length * 1000);
  };

  useEffect(() => {
    if (primaryInv) dispatch(setupInventory({ type: primaryInv?.type, item: primaryInv }));
  }, [primaryInv]);

  useEffect(() => {
    if (secondaryInv?.type === "playerinventory") {
      dispatch(
        setupInventory({
          type: "otherPlayerInv",
          item: { ...secondaryInv, type: "otherPlayerInv" },
        })
      );
    } else {
      dispatch(setupInventory({ type: secondaryInv?.type, item: secondaryInv }));
    }
  }, [secondaryInv]);

  useEffect(() => {
    dispatch(setupInventory({ type: dropInv?.type || "drop", item: dropInv }));
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
      } else if (event.data.action == "close") {
        dispatch(clearInventory());
        dispatch(closeContextMenu());
        dispatch(closeTooltip());
        isOpen = false;
        hideRoot();
        fetchNui("invClosed")
          .then((retData) => {})
          .catch((e) => {});
      } else if (event.data.action == "setLocaleConfig") {
        // eslint-disable-next-line no-undef
        setLocale(event.data.locale);
      } else if (event.data.action == "addItemAction") {
        addItemAction(event.data.item)
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
        dispatch(clearInventory());
        dispatch(closeContextMenu());
        dispatch(closeTooltip());
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
    <div className="relative">
      <Inventory />
      <DragPreview />
      {itemsAction?.length && (
        <div className="flex items-center justify-center w-full absolute bottom-10">
          {itemsAction?.map((item, ind) => (
            <ItemAction key={ind} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
