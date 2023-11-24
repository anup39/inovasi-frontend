import { useRef, useEffect } from "react";
import maplibregl, { Map } from "maplibre-gl"; // Import 'Map' type from 'maplibre-gl'
import "../css/map/Map.scss";
import SelectDataFormatControl from "./SelectDataFormatControl";
// @ts-ignore
// import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
// import GeocoderApi from "../maputils/GeocoderApi";
// import { useDispatch } from "react-redux";
// import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import PopupControl from "./PopupControl";

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
interface MapProps {
  map: Map | null;
  refObj: React.RefObject<HTMLDivElement>;
  onSetMap: (evmap: Map) => void;
  component: string;
}

// @ts-ignore
export default function MapComponent({
  refObj,
  map,
  onSetMap,
  component,
}: MapProps) {
  // const dispatch = useDispatch();
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
    if (component === "mill") {
      map_.addControl(new SelectDataFormatControl(), "top-right");
    }

    // Point on click
    map_.on("load", () => {
      map_.addControl(new PopupControl(), "bottom-left");
      map_.addSource("point", { type: "geojson", data: geojson });
      map_.addLayer({
        id: "point-layer",
        type: "circle",
        source: "point",
        paint: {
          "circle-radius": 9,
          "circle-color": "#233430",
        },
      });

      // Points from Table
      map_.addSource("point-table", { type: "geojson", data: geojson });
      map_.addLayer({
        id: "point-table-layer",
        type: "circle",
        source: "point-table",
        paint: {
          "circle-radius": 9,
          "circle-color": "red",
        },
      });
      map_.setLayoutProperty("point-layer", "visibility", "none");
      map_.setLayoutProperty("point-table-layer", "visibility", "none");
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
      className="rounded-lg flex-grow mx-10 border-[10px] border-white h-full"
    />
  );
}
