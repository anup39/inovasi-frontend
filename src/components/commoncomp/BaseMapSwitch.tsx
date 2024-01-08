import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent } from "react";
import makeRadiusfrompoint from "../../maputils/makeRadiusfrompoint";
import { GeoJSONSource } from "maplibre-gl";
import convertGeojsonToWKT from "../../maputils/convertGeojsonToWkt";
import {
  setCurrentRadiusWkt,
  setshowMapLoader,
} from "../../reducers/DisplaySettings";
import axios from "axios";
import { settabledataPotential } from "../../reducers/SupplierPlantation";

function BaseMapSwitch() {
  const dispatch = useDispatch();
  const [selectedView, setSelectedView] = useState("basic");
  const [showViews, setShowViews] = useState(false);
  const [radius, setradius] = useState<number>(50);
  const current_mill_coordinates = useSelector(
    (state) => state.displaySettings.current_mill_coordinates
  );

  const selectedDashboardPage = useSelector(
    (state) => state.displaySettings.selectedDashboardPage
  );
  const current_mill_eq_id = useSelector(
    (state) => state.displaySettings.current_mill_eq_id
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

  const handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setradius(parseInt(event.target.value));
  };

  const handleApplyBuffer = () => {
    if (current_mill_coordinates) {
      const { buffered, extent } = makeRadiusfrompoint(
        [
          parseFloat(current_mill_coordinates[0]),
          parseFloat(current_mill_coordinates[1]),
        ],
        radius * 1000
      );
      const map = window.mapglobal;
      const wkt_final = convertGeojsonToWKT(buffered);
      dispatch(setCurrentRadiusWkt(wkt_final));

      // fetch potential registered for table
      axios
        .get(
          `${
            import.meta.env.VITE_API_DASHBOARD_URL
          }/agriplot-result-wkt/?mill_eq_id=${current_mill_eq_id}&geometry_wkt=${wkt_final}`
        )
        .then((res) => {
          dispatch(settabledataPotential(res.data));
        });

      if (
        map.getSource("polygon-radius") &&
        map.getLayer("polygon-radius-layer")
      ) {
        const source = map.getSource("polygon-radius") as GeoJSONSource;
        source.setData(buffered);

        map.setLayoutProperty("polygon-radius-layer", "visibility", "visible");
        map.fitBounds(extent);
      }
      if (
        map.getSource("potential-agriplot-registered") &&
        map.getLayer("potential-agriplot-registered-layer")
      ) {
        const source = map.getSource(
          "potential-agriplot-registered"
        ) as GeoJSONSource;
        source.setData(
          `${
            import.meta.env.VITE_API_DASHBOARD_URL
          }/agriplot-geojson-wkt/?status=Registered&geometry_wkt=${wkt_final}&mill_eq_id=${current_mill_eq_id}`
        );
      }
      if (
        map.getSource("potential-agriplot-unregistered") &&
        map.getLayer("potential-agriplot-unregistered-layer")
      ) {
        const source = map.getSource(
          "potential-agriplot-unregistered"
        ) as GeoJSONSource;
        source.setData(
          `${
            import.meta.env.VITE_API_DASHBOARD_URL
          }/agriplot-geojson-wkt/?status=Unregistered&geometry_wkt=${wkt_final}&mill_eq_id=${current_mill_eq_id}`
        );
      }
      dispatch(setshowMapLoader(true));
      setTimeout(() => {
        dispatch(setshowMapLoader(false));
      }, 20000);
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
          onChange={handleRadiusChange}
          type="number"
          style={{
            boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)",
          }}
          className="w-[80px] relative rounded-lg outline-none bg-white text-darkGreen px-3 py-1 font-normal ring-0 focus:ring-0 "
          // name=""
          // id=""
          defaultValue={radius}
          min="50"
          max="100"
          // disabled
        />
        <p>km</p>
        <button
          onClick={handleApplyBuffer}
          className="bg-green-500 p-2 rounded text-white"
        >
          Apply
        </button>
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
        className="h-[55px] cursor-pointer mr-56"
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
            : "-translate-x-[100%]"
        }  translate-y-[81%]`}
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
