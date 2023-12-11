import { useState } from "react";

function BaseMapSwitch() {
  const [selectedView, setSelectedView] = useState("satellite");
  const [showViews, setShowViews] = useState(false);

  return (
    <div className="relative flex gap-2  items-center justify-center transition-all ease-in-out scale-75">
      <div className="flex rounded-xl  gap-3 bg-white  border-2 border-darkGreen px-3 py-2 h-[50px]">
        <img className="cursor-pointer " src="mapzoomin.svg" alt="" />
        <div className="border-r-2 border-r-mapDivider"></div>
        <img className="cursor-pointer" src="mapzoomout.svg" alt="" />
      </div>
      <div
        onClick={() => setShowViews(!showViews)}
        className="h-[55px] cursor-pointer"
      >
        <img className="scale-105" src="mapselectview.svg" alt="" />
      </div>
      <div className="border-2 border-darkGreen rounded-xl cursor-pointer">
        <img className="scale-105" src="mapruler.svg" alt="" />
      </div>
      <div className="border-2 cursor-pointer border-darkGreen rounded-xl">
        <img className="scale-105 " src="mapfullscreen.svg" alt="" />
      </div>
      {/* div that opens up */}
      <div
        className={`${
          showViews ? "flex" : "hidden"
        } absolute items-center gap-3 rounded-xl bg-white p-3 transition-all ease-in-out transform -translate-x-[42%] translate-y-[75%]`}
      >
        <div
          onClick={() => setSelectedView("opensteet")}
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <img
            className={`${selectedView === "opensteet" ? "" : ""}`}
            src="openstreet.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "opensteet"
                ? "text-darkGreen font-bold"
                : "text-homeSubText"
            }`}
          >
            Openstreet
          </p>
        </div>
        <div
          onClick={() => setSelectedView("satellite")}
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <img
            className={`${selectedView === "satellite" ? "" : ""}`}
            src="satellite.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "satellite"
                ? "text-darkGreen font-bold"
                : "text-homeSubText"
            }`}
          >
            Satellite
          </p>
        </div>
        <div
          onClick={() => setSelectedView("terrain")}
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <img
            className={`${selectedView === "terrain" ? "" : ""}`}
            src="terrain.png"
            alt=""
          />
          <p
            className={`${
              selectedView === "terrain"
                ? "text-darkGreen font-bold  "
                : "text-homeSubText"
            }`}
          >
            Terrain
          </p>
        </div>
      </div>
    </div>
  );
}

export default BaseMapSwitch;
