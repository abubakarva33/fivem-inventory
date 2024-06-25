import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { useEffect, useState } from "react";
import { calculateRGBRev } from "../../utilities/utilis";
import { setupInventory } from "../../redux/inventorySlice";

const MainAreaSection = ({ inventory, isModalOpen, setIsModalOpen }) => {
  const { boxBg, boxBorderColor, boxBorderRound, slotBg, textColor, hudBg, hudBorderColor } =
    useSelector((state) => state.customizeSec);
  const dispatch = useDispatch();

  const [weaponExpand, setWeaponExpand] = useState(false);
  const [weaponItems, setWeaponItems] = useState(null);

  useEffect(() => {
    if (weaponItems) {
      const modifiedWeaponItem = {
        ...weaponItems,
        slots: 7,
        items: Object.keys(weaponItems?.info?.components).map(
          (key) => weaponItems?.info?.components[key]
        ),
      };
      dispatch(setupInventory({ type: weaponItems?.type, item: modifiedWeaponItem }));
    }
  }, [weaponItems]); // add dependency here if needed //

  const [hudData, setHudData] = useState({
    health: 100,
    armor: 100,
    hunger: 100,
    thirst: 100,
    cash: 0,
    bank: 0,
  });

  useEffect(() => {
    const EventListener = function (event) {
      if (event.data.action == "sethud") {
        setHudData(event.data.hud);
      } else if (event.data.action == "setcomp") {
        setWeaponItems(event.data.comp);
      } else if (event.data.action == "invClosed") {
        setWeaponExpand(false);
        setWeaponItems(null);
      }
    };
    window.addEventListener("message", EventListener);
    return () => window.removeEventListener("message", EventListener);
  }, []);

  return (
    <>
      {inventory && (
        <div
          className="mainArea"
          style={{
            backgroundColor: boxBg,
            border: `1px solid ${boxBorderColor}`,
            borderRadius: boxBorderRound,
          }}
        >
          <div
            className="mainAreaTop pt-1 border-b pb-1"
            style={{ borderBottom: `4px solid ${slotBg}`, color: textColor }}
          >
            <div className="flex items-center mb-3 pt-2">
              <div
                className="border rounded-full p-2 text-xl me-2"
                style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
              >
                <BsBoxes />
                {inventory?.weight}
              </div>
              <div
                className={`${
                  inventory?.label?.length < 12
                    ? "w-[20%]"
                    : inventory?.label?.length < 25
                    ? "w-[30%]"
                    : "w-[45%]"
                } me-2  text-center`}
              >
                <p
                  className="border px-5 py-1  text-lg rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  {inventory?.label}
                </p>
              </div>
              <div className="w-[70%] me-2">
                <Progress
                  percent={Number(inventory?.weightPercent)}
                  showInfo={false}
                  size={["100%", 35]}
                  strokeColor={calculateRGBRev(Number(inventory?.weightPercent))}
                  trailColor={hudBg}
                  style={{ border: `2px solid ${hudBorderColor}`, borderRadius: 50 }}
                />
              </div>
              <div
                className="border rounded-full  p-2 text-xl cursor-pointer"
                style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
              >
                <BsBoxes onClick={() => setIsModalOpen(!isModalOpen)} />
              </div>
            </div>
            <div className="flex items-center text-xl justify-between mb-2">
              <div className="flex items-center">
                <div
                  className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>{hudData.health}%</span>
                </div>
                <div
                  className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>{hudData.armor}%</span>
                </div>
                <div
                  className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>{hudData.hunger}%</span>
                </div>
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>{hudData.thirst}%</span>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>${hudData.cash}</span>
                </div>
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <BsBoxes className="me-2" />
                  <span>${hudData.bank}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "calc(100% - 145px)", overflowY: "auto" }}>
            <div className="mainAreaSlot section">
              {Array.isArray(inventory?.items) &&
                inventory?.items?.map((item, ind) => (
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-${item.slot}`}
                    {...{
                      item,
                      inventory,
                      ind,
                      weaponExpand,
                      setWeaponExpand,
                      weaponItems,
                      setWeaponItems,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAreaSection;
