import "./Inventory.css";
import MainAreaSection from "../sub-components/MainAreaSection";
import SecondaryArea from "../sub-components/SecondaryArea";
import BackpackSection from "../sub-components/BackpackSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeContextMenu, handleSelectedItems } from "../../redux/contextSlice";
import { fetchNui } from "../../utilities/fetchNui";
import CustomizeInventory from "../CustomizeInventory/CustomizeInventory";
import {
  CraftItemHandler,
  buyItemHandlerWithClick,
  isBackpackFound,
  isIdentifierFound,
  isItemsFound,
  openBackpackHandler,
  sellItemHandlerWithClick,
} from "../../utilities/utilis";
import Tooltip from "../sub-components/Tooltip";

const Inventory = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.inventory);
  const { inventory, coords, selectedItems, deg } = useSelector((state) => state.context);
  const { tooltipBg, tooltipBorderColor, textColor } = useSelector((state) => state.customizeSec);
  const [openBackpacks, setOpenBackpacks] = useState([]);
  const [secondaryBackpacks, setSecondaryBackpacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState({});
  const maxAmount = inventory?.item?.amount || 0;

  const [copySuccess, setCopySuccess] = useState("Copy Serial");

  const copyToClipboard = async (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess("Serial copied!");
    setTimeout(() => {
      setCopySuccess("Copy Serial");
    }, 2000);
  };

  useEffect(() => {
    const number = selectedItems.find(
      (x) =>
        x?.identifier === inventory?.identifier &&
        x?.name === inventory?.item?.name &&
        x.slot === inventory?.item?.slot
    );
    setInputAmount(number);
  }, [selectedItems, inventory]);

  useEffect(() => {
    const inventoryKeys = Object.keys(state);
    const excludedTypes = ["largeBackpack", "smallBackpack", "playerinventory", "weapon"];
    const filteredInventory = inventoryKeys.filter((key) => !excludedTypes.includes(key));
    const filteredItems = filteredInventory.map((key) => {
      if (state[key]) {
        return state[key];
      } else {
        return null;
      }
    });
    if (filteredItems.length === 2 && filteredItems[0].type === "drop") {
      [filteredItems[0], filteredItems[1]] = [filteredItems[1], filteredItems[0]];
    }
    //  dynamically sets secondary backpacks data //
    setSecondaryBackpacks(filteredItems);
  }, [state]);

  useEffect(() => {
    const keyHandler = (e) => {
      if (!e.target.closest(".no-close")) {
        dispatch(closeContextMenu());
      }
    };

    window.addEventListener("click", keyHandler);
    return () => {
      window.removeEventListener("click", keyHandler);
    };
  }, []);
  const largeBackpackOpen = isBackpackFound(
    state?.playerinventory?.items,
    openBackpacks[0]?.info?.identifier
  );
  const smallBackpackOpen = isBackpackFound(
    state?.playerinventory?.items,
    openBackpacks[1]?.info?.identifier
  );
  const backpackToFind = openBackpacks?.map((item) => item.info.identifier);
  const otherItems = state?.playerinventory?.items
    ?.filter((item) => item?.type !== "backpack")
    ?.map((item) => item?.type);

  useEffect(() => {
    if (
      state?.playerinventory &&
      isItemsFound(state?.playerinventory?.items, otherItems) &&
      !largeBackpackOpen
    ) {
      if (openBackpacks[0]) {
        fetchNui("closeBackpack", openBackpacks[0].info)
          .then((retData) => {})
          .catch((e) => {});
      }

      const updatedOpenBackpacks = [...openBackpacks];
      updatedOpenBackpacks.shift();
      setOpenBackpacks(updatedOpenBackpacks);
    }
    if (
      state?.playerinventory &&
      isItemsFound(state?.playerinventory?.items, otherItems) &&
      !smallBackpackOpen
    ) {
      if (openBackpacks[1]) {
        fetchNui("closeBackpack", openBackpacks[1].info)
          .then((retData) => {})
          .catch((e) => {});
      }

      const updatedOpenBackpacks = [...openBackpacks];
      updatedOpenBackpacks.pop();
      setOpenBackpacks(updatedOpenBackpacks);
    }
  }, [state?.playerinventory?.items]);

  useEffect(() => {
    if (
      state?.playerinventory &&
      openBackpacks?.length &&
      !isIdentifierFound(state.playerinventory?.items, backpackToFind)
    ) {
      setOpenBackpacks([]);
    }
  }, [state?.playerinventory?.items]);

  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= maxAmount) {
      dispatch(handleSelectedItems(value));
    }
  };
  const dropHandler = (item) => {
    fetchNui("drop", item)
      .then((retData) => {})
      .catch((e) => {});
    dispatch(closeContextMenu());
  };
  const throwHandler = (item) => {
    fetchNui("throw", item)
      .then((retData) => {})
      .catch((e) => {});
    dispatch(closeContextMenu());
  };
  const useHandler = (item) => {
    fetchNui("use", item)
      .then((retData) => {})
      .catch((e) => {});
    dispatch(closeContextMenu());
  };
  const addHandler = (data) => {
    fetchNui("pickupOrTake", data)
      .then((retData) => {})
      .catch((e) => {});
    dispatch(closeContextMenu());
  };

  return (
    <div className="mainSection relative">
      <div className="inventory">
        {openBackpacks?.length != 0 && <BackpackSection openBackpacks={openBackpacks} />}

        <MainAreaSection
          inventory={state.playerinventory}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          openBackpacks={openBackpacks}
          setOpenBackpacks={setOpenBackpacks}
        />

        {secondaryBackpacks?.length > 0 && secondaryBackpacks?.length && !isModalOpen && (
          <SecondaryArea secondaryBackpacks={secondaryBackpacks} />
        )}
        {isModalOpen && <CustomizeInventory />}
      </div>
      <Tooltip />

      {/* // right click menu // */}
      {inventory?.item?.name && !deg && (
        <div
          className="absolute w-[140px] no-close z-[500]"
          onClick={(e) => e.stopPropagation()}
          style={{ top: coords?.y, left: coords?.x, fontSize: 14 }}
        >
          <div className="flex flex-col" style={{ backgroundColor: tooltipBg, color: textColor }}>
            <div className="flex">
              <button
                className=" rightBtn border py-1 border-b-0 w-1/4"
                style={{ borderColor: tooltipBorderColor }}
                disabled={(inputAmount?.selectedAmount || 0) <= 0}
                onClick={() =>
                  dispatch(handleSelectedItems((inputAmount?.selectedAmount || 0) - 1))
                }
              >
                -
              </button>
              <input
                type="number"
                className="w-1/2 text-center border-t outline-none "
                style={{
                  color: textColor,
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorderColor,
                }}
                value={inputAmount?.selectedAmount || 0}
                min={0}
                max={maxAmount}
                onChange={handleAmountChange}
              />
              <button
                className=" rightBtn border py-1 border-b-0 w-1/4"
                style={{ cursor: "pointer", borderColor: tooltipBorderColor, color: textColor }}
                disabled={
                  inventory?.item?.amount > 0 &&
                  inventory?.item?.amount <= inputAmount?.selectedAmount
                }
                onClick={() =>
                  dispatch(handleSelectedItems((inputAmount?.selectedAmount || 0) + 1))
                }
              >
                +
              </button>
            </div>
            {!inventory?.item?.name?.includes("backpack") &&
              inventory?.type === "playerinventory" && (
                <button
                  className=" rightBtn border py-1 border-b-0"
                  onClick={() => useHandler(inventory?.item)}
                  style={{ borderColor: tooltipBorderColor }}
                >
                  Use
                </button>
              )}

            {inventory?.item?.name?.includes("backpack") &&
              inventory?.type === "playerinventory" && (
                <button
                  className=" rightBtn border py-1 border-b-0"
                  style={{ borderColor: tooltipBorderColor }}
                  onClick={() =>
                    openBackpackHandler(
                      inventory?.item,
                      openBackpacks.some(
                        (backpack) => backpack.info?.identifier === inventory?.item.info?.identifier
                      ),
                      dispatch,
                      setOpenBackpacks
                    )
                  }
                >
                  {openBackpacks.some(
                    (backpack) => backpack.info?.identifier === inventory?.item.info?.identifier
                  )
                    ? "Close"
                    : "Open"}
                </button>
              )}
            {inventory?.type === "shop" && inventory?.item?.info?.buyPrice && (
              <button
                className=" rightBtn border py-1"
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  buyItemHandlerWithClick({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount: !inputAmount?.selectedAmount ? 1 : inputAmount?.selectedAmount,
                    },
                  })
                }
              >
                Buy
              </button>
            )}
            {inventory?.type === "shop" && inventory?.item?.info?.sellPrice && (
              <button
                className=" rightBtn border py-1"
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  sellItemHandlerWithClick({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount: !inputAmount?.selectedAmount ? 1 : inputAmount?.selectedAmount,
                    },
                  })
                }
              >
                Sell
              </button>
            )}

            {inventory?.type === "playerinventory" && (
              <button
                className=" rightBtn border py-1 border-b-0"
                style={{ borderColor: tooltipBorderColor }}
                onClick={() => dispatch(closeContextMenu())}
              >
                Give
              </button>
            )}
            {inventory?.type === "crafting" && (
              <button
                className=" rightBtn border py-1 "
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  CraftItemHandler({
                    ...inventory,
                    item: {
                      ...inventory?.item,
                      amount:
                        (!inputAmount?.selectedAmount ? 1 : inputAmount?.selectedAmount) *
                        inventory?.item?.amount,
                    },
                  })
                }
              >
                Craft
              </button>
            )}
            {inventory?.type === "playerinventory" && (
              <button
                className={`rightBtn border py-1 ${
                  inventory?.item?.info?.serial ? "border-b-0" : "border-b"
                } `}
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  dropHandler({
                    ...inventory?.item,
                    amount:
                      inputAmount?.selectedAmount === undefined
                        ? inventory?.item.amount
                        : inputAmount?.selectedAmount === 0
                        ? inventory?.item.amount
                        : inputAmount?.selectedAmount,
                  })
                }
              >
                Drop
              </button>
            )}

            {inventory?.type === "playerinventory" && (
              <button
                className={`rightBtn border ${
                  inventory?.item?.type === "weapon" ? "border-t" : "border-t-0"
                }  py-1`}
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  throwHandler({
                    ...inventory?.item,
                    amount:
                      inputAmount?.selectedAmount === undefined
                        ? inventory?.item.amount
                        : inputAmount?.selectedAmount === 0
                        ? inventory?.item.amount
                        : inputAmount?.selectedAmount,
                  })
                }
              >
                Throw
              </button>
            )}
            {inventory?.type === "drop" && (
              <button
                className={`rightBtn border py-1 border-b `}
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  addHandler({
                    identifier: inventory?.identifier,
                    item: {
                      ...inventory?.item,
                      amount:
                        inputAmount?.selectedAmount === undefined
                          ? inventory?.item.amount
                          : inputAmount?.selectedAmount === 0
                          ? inventory?.item.amount
                          : inputAmount?.selectedAmount,
                    },
                  })
                }
              >
                Pick Up
              </button>
            )}
            {inventory?.type === "backpack" && (
              <button
                className={`rightBtn border py-1 border-b `}
                style={{ borderColor: tooltipBorderColor }}
                onClick={() =>
                  addHandler({
                    identifier: inventory?.identifier,
                    item: {
                      ...inventory?.item,
                      amount:
                        inputAmount?.selectedAmount === undefined
                          ? inventory?.item.amount
                          : inputAmount?.selectedAmount === 0
                          ? inventory?.item.amount
                          : inputAmount?.selectedAmount,
                    },
                  })
                }
              >
                Take
              </button>
            )}

            {inventory?.type === "playerinventory" && inventory?.item?.info?.serial && (
              <button
                className=" rightBtn border border-t-0 py-1"
                style={{ borderColor: tooltipBorderColor }}
                onClick={() => copyToClipboard(inventory?.item?.info?.serial)}
              >
                {copySuccess}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
