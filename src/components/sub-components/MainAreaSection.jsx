import { Progress } from "antd";
import { BsBoxes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { useEffect, useState } from "react";
import { calculateRGBRev } from "../../utilities/utilis";
import { setupInventory } from "../../redux/inventorySlice";

const MainAreaSection = ({ inventory, isModalOpen, setIsModalOpen, openBackpacks }) => {
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
            className="mainAreaTop pt-1 border-b pb-[6px]"
            style={{ borderBottom: `4px solid ${slotBg}`, color: textColor }}
          >
            <div className="flex items-center mb-3 pt-2">
              <div
                className="border rounded-full p-2 text-xl me-2"
                style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
              >
                <BsBoxes />
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                  <span>{hudData.health}%</span>
                </div>
                <div
                  className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
                  </svg>

                  <span>{hudData.armor}%</span>
                </div>
                <div
                  className="flex items-center border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6v0c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9v0c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>

                  <span>{hudData.hunger}%</span>
                </div>
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
                  </svg>

                  <span>{hudData.thirst}%</span>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                  <span>${hudData.cash}</span>
                </div>
                <div
                  className="flex items-center  border  me-2 px-4 py-1 rounded-[20px]"
                  style={{ backgroundColor: hudBg, borderColor: hudBorderColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ height: 28, marginRight: 8 }}
                  >
                    <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
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
                      openBackpacks,
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
