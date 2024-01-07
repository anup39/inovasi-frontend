import { useState } from "react";
import { useSelector } from "react-redux";

function BaseMapSwitch() {
  const [selectedView, setSelectedView] = useState("basic");
  const [showViews, setShowViews] = useState(false);

  const selectedDashboardPage = useSelector(
    (state) => state.displaySettings.selectedDashboardPage
  );

  const handleBaseMapChange = (basemap: string) => {
    setSelectedView(basemap);
    // @ts-ignore
    const map = window.mapglobal;
    console.log(map, basemap);

    if (
      map.getSource(`${basemap}_source`) &&
      map.getLayer(`${basemap}_layer`)
    ) {
      map.moveLayer(`${basemap}_layer`, "housenumber");
      map.setLayoutProperty(`${basemap}_layer`, "visibility", "visible");
    }
  };

  return (
    <div className="relative scale-75 flex gap-0 md:gap-2  items-center justify-center transition-all ease-in-out ">
      <div
        style={{
          display:
            selectedDashboardPage === "supplierplantation" ? "flex" : "none",
        }}
        className="flex absolute top-12 -right-5 z-9 md:static scale-[0.6] md:scale-100 items-center rounded-xl bg-white gap-2  px-2 py-1 border-2 border-darkGreen text-grayText text-lg"
      >
        <h1 className="scale-90 md:scale-100">Radius</h1>
        <input
          style={{
            boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)",
          }}
          className="w-[80px] relative rounded-lg outline-none bg-white text-darkGreen px-3 py-1 font-normal ring-0 focus:ring-0 "
          type="name"
          name=""
          id=""
          value={50}
          disabled
        />
        <p>km</p>
        {/* <div className="hidden md:flex absolute  flex-col items-center w-12 px-4 scale-50 gap-2 left-32 bg-boxDivider">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#018C79"
            stroke="#018C79"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 22 22 22 12 2" />
          </svg>
          <div className="bg-testimonyBg h-1 w-full"></div>
          <svg
            className="rotate-180 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#018C79"
            stroke="#018C79"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 22 22 22 12 2" />
          </svg>
        </div> */}
      </div>

      {/* <div className="flex rounded-xl scale-[0.8] md:scale-100 gap-1 md:gap-2 bg-white  md:border border-darkGreen px-3 py-2 h-[48px]">
        <img className="cursor-pointer " src="mapzoomin.svg" alt="" />
        <div className="border-r-2 border-r-mapDivider"></div>
        <img className="cursor-pointer" src="mapzoomout.svg" alt="" />
      </div> */}
      <div
        // onMouseOver={() => setShowViews(true)}
        // onMouseOut={() => setShowViews(false)}
        onClick={() => setShowViews(!showViews)}
        className="h-[55px] cursor-pointer"
      >
        <img className="scale-90 md:scale-105" src="mapselectview.svg" alt="" />
      </div>
      {/* <div className="md:border border-darkGreen rounded-xl cursor-pointer">
        <img className="scale-90 md:scale-105" src="mapruler.svg" alt="" />
      </div>
      <div className="md:border cursor-pointer border-darkGreen rounded-xl">
        <img
          className="scale-90 md:scale-105 "
          src="mapfullscreen.svg"
          alt=""
        />
      </div> */}
      {/* div that opens up */}
      <div
        className={`${
          showViews ? "flex" : "hidden"
        } absolute items-center justify-center gap-2 h-[90px] rounded-xl bg-white px-2 py-0.5 transition-all ease-in-out transform  ${
          selectedDashboardPage === "supplierplantation"
            ? "-translate-x-[5%]"
            : "-translate-x-[42%]"
        }  translate-y-[78%]`}
      >
        <div
          onClick={() => handleBaseMapChange("basic")}
          className="flex flex-col items-center cursor-pointer "
        >
          <img
            className={`${selectedView === "basic" ? "" : ""} h-[50px]`}
            src="openstreet.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "basic"
                ? "text-darkGreen font-bold text-sm"
                : "text-homeSubText text-sm"
            }`}
          >
            Basic
          </p>
        </div>
        <div
          onClick={() => handleBaseMapChange("satellite")}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            className={`${selectedView === "satellite" ? "" : ""} h-[50px]`}
            src="satellite.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "satellite"
                ? "text-darkGreen font-bold text-sm"
                : "text-homeSubText text-sm"
            }`}
          >
            Satellite
          </p>
        </div>
        <div
          onClick={() => handleBaseMapChange("dark")}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            className={`${selectedView === "dark" ? "" : ""} h-[50px]`}
            src="terrain.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "dark"
                ? "text-darkGreen font-bold text-sm "
                : "text-homeSubText text-sm"
            }`}
          >
            Dark
          </p>
        </div>
      </div>
    </div>
  );
}

export default BaseMapSwitch;
