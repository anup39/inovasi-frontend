import { useRef, useEffect } from "react";
import maplibregl, { Map, IControl, GeoJSONSourceOptions } from "maplibre-gl";
import "../css/map/Map.scss";
// import SelectDataFormatControl from "./SelectDataFormatControl";
import BufferControl from "./BufferControl";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import GeocoderApi from "../maputils/GeocoderApi";
import PopupControl from "./PopupControl";
import LegendControl from "./LegendControl";
import BaseMapSwitch from "../components/commoncomp/BaseMapSwitch";
// import LabelControl from "./LabelControl";
// import { createTheme } from "@mui/material/styles";

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
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${
        import.meta.env.VITE_MAPTILER_TOKEN
      }`,
      center: [103.8574, 2.2739],
      zoom: 5,
      attributionControl: false,
    });

    const geocoder = new MaplibreGeocoder(GeocoderApi, {
      maplibregl: maplibregl,
      showResultsWhileTyping: true,
      flyTo: true,
    });

    // geocoder.addTo(document.getElementById("geocoding-search"));
    geocoder.on("result", function (ev) {
      const coords = ev.result.geometry.coordinates;
      map_.flyTo({ center: coords });
    });

    onSetMap(map_);
    // if (component === "mill" || component === "supplier-plantation") {
    //   const selectDataformat_control: IControl = new SelectDataFormatControl();
    //   map_.addControl(selectDataformat_control, "top-right");
    // }
    // if (component === "supplier-plantation") {
    //   // const label_control: IControl = new LabelControl();
    //   // map_.addControl(label_control, "top-left");
    //   const buffer_control: IControl = new BufferControl();
    //   map_.addControl(buffer_control, "top-left");
    // }

    // if (component === "dashboard") {
    const buffer_control: IControl = new LegendControl();
    map_.addControl(buffer_control, "top-left");
    // }

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

  return (
    <div
      ref={mapContainer}
      id="map"
      className=" map h-full rounded-lg relative  min-h-[550px]"
    >
      <div className="absolute top-0 -right-5 md:right-2 z-10">
        <BaseMapSwitch />
      </div>
    </div>
  );
}
