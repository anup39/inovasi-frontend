import { useRef, useEffect, useState } from "react";
import maplibregl, { Map, IControl, GeoJSONSourceOptions } from "maplibre-gl";
import "../css/map/Map.scss";
import SelectDataFormatControl from "./SelectDataFormatControl";
import BufferControl from "./BufferControl";
// import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
// import GeocoderApi from "../maputils/GeocoderApi";
import PopupControl from "./PopupControl";
// import LabelControl from "./LabelControl";
// import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [0, 0],
        type: "Point",
      },
    },
  ],
};

const geojson_polygon = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            [103.07963129020129, 2.2135193939425193],
            [103.07963129020129, 2.102400759033472],
            [103.19865174285263, 2.102400759033472],
            [103.19865174285263, 2.2135193939425193],
            [103.07963129020129, 2.2135193939425193],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};
interface MapProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
  component: string;
}

export default function MapComponent({ onSetMap, component }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map_ = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${
        import.meta.env.VITE_MAPTILER_TOKEN
      }`,
      center: [103.8574, 2.2739],
      zoom: 5,
    });

    onSetMap(map_);
    if (component === "mill" || component === "supplier-plantation") {
      const selectDataformat_control: IControl = new SelectDataFormatControl();
      map_.addControl(selectDataformat_control, "top-right");
    }
    if (component === "supplier-plantation") {
      // const label_control: IControl = new LabelControl();
      // map_.addControl(label_control, "top-left");
      const buffer_control: IControl = new BufferControl();
      map_.addControl(buffer_control, "top-left");
    }

    map_.on("load", () => {
      const popup_control: IControl = new PopupControl();
      map_.addControl(popup_control, "bottom-right");
      // Point on click

      // Points from Table
      map_.addSource("point-table", {
        type: "geojson",
        data: geojson,
      } as GeoJSONSourceOptions);
      map_.addLayer({
        id: "point-table-layer",
        type: "circle",
        source: "point-table",
        paint: {
          "circle-radius": 9,
          "circle-color": "red",
        },
      });

      // Polygon from Table
      map_.addSource("polygon-table", {
        type: "geojson",
        data: geojson_polygon,
      } as GeoJSONSourceOptions);
      map_.addLayer({
        id: "polygon-table-layer",
        type: "fill",
        source: "polygon-table",
        paint: {
          "fill-color": "red",
          "fill-opacity": 0.5,
        },
      });

      // Polygon from Table
      map_.addSource("polygon-radius", {
        type: "geojson",
        data: geojson_polygon,
      } as GeoJSONSourceOptions);
      map_.addLayer({
        id: "polygon-radius-layer",
        type: "fill",
        source: "polygon-radius",
        paint: {
          "fill-color": "red",
          "fill-opacity": 0.5,
        },
      });

      map_.setLayoutProperty("polygon-radius-layer", "visibility", "none");

      map_.setLayoutProperty("point-table-layer", "visibility", "none");
      map_.setLayoutProperty("polygon-table-layer", "visibility", "none");
    });

    return () => {
      map_.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (map) {
  //   }
  // }, [map]);
  const [showLegend, setShowLegend] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#42D272" : "#42D272",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const [popup, setPopup] = useState(false);
  return (
    <div ref={mapContainer} id="map" className="map h-full rounded-lg relative">
      <div
        onClick={() => setShowLegend(!showLegend)}
        className="scale-75 md:scale-100 absolute flex justify-center items-center bg-opacity-90 font-bold text-lg px-3 cursor-pointer aspect-square rounded-lg text-darkGreen border border-darkGreen bg-white top-2 left-2 z-10"
      >
        i
      </div>
      {/* popup */}
      <div
        className={`absolute bottom-2 right-1 lg:right-2 z-10 bg-white w-full px-2 md:w-1/3 lg:w-1/4 rounded-lg ${
          popup ? "h-4/5 " : ""
        } `}
      >
        <div className="flex relative items-center justify-between  p-3">
          <h1 className="font-bold uppercase hidden md:block">information</h1>
          <button className="border border-darkGreen w-full md:w-max  rounded-lg text-darkGreen font-semibold px-4 py-2 text-xs md:text-[8px] lg:text-xs">
            Trace to Plantation
          </button>
          <div
            onClick={() => setPopup(!popup)}
            className={`absolute w-7 transition-all ${
              popup ? "rotate-180" : ""
            } -top-4 md:-top-3 -translate-x-1/2 right-1/2 left-1/2 aspect-square rounded-full border-darkGreen border bg-white z-10 flex items-center justify-center cursor-pointer`}
          >
            <img className="" src="popuparrow.svg" alt="" />
          </div>
        </div>{" "}
      </div>
      {/* legend div */}
      <div
        className={`shadow p-3 transition-all ease-in-out delay-100 ${
          showLegend ? "flex" : "hidden"
        } rounded-lg flex-col gap-2 bg-white absolute z-10 top-2 left-10 h-full md:h-max w-2/3 md:w-1/3  lg:w-[250px]`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Legend</h1>
          {showMore ? (
            <p
              onClick={() => setShowMore(false)}
              className="underline cursor-pointer text-darkGreen"
            >
              See less
            </p>
          ) : (
            <p
              onClick={() => setShowMore(true)}
              className="underline cursor-pointer text-darkGreen"
            >
              See more
            </p>
          )}
        </div>
        <div className="h-[1px] items-center justify-start bg-legendDivider my-1"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="facilitieslegend.svg" alt="" />
            <p className="text-homeSubText">Facilities</p>
          </div>
          <AntSwitch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="refinerylegend.svg" alt="" />
            <p className="text-homeSubText">Refinery</p>
          </div>
          <AntSwitch />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="milllegend.svg" alt="" />
            <p className="text-homeSubText">Mill</p>
          </div>
          <AntSwitch />
        </div>
        {/* div that appears after see all */}
        {showMore ? (
          <div className="overflow-y-scroll flex gap-2 flex-col">
            <div className="h-[1px] items-center justify-start bg-legendDivider my-2"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-footerHeading"></div>
                <p className="">Actual registered supplier</p>
              </div>
              <AntSwitch />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-potentialSupp"></div>
                <p>Potential registered supplier</p>
              </div>
              <AntSwitch />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-potentialUnSupp"></div>
                <p>Potential unregistered supplier</p>
              </div>
              <AntSwitch />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
