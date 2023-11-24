import { useRef, useEffect } from "react";
import maplibregl, { Map, IControl, GeoJSONSourceOptions } from "maplibre-gl";
import "../css/map/Map.scss";
import SelectDataFormatControl from "./SelectDataFormatControl";
// import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
// import GeocoderApi from "../maputils/GeocoderApi";
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
    if (component === "mill") {
      const selectDataformat_control: IControl = new SelectDataFormatControl();
      map_.addControl(selectDataformat_control, "top-right");
    }

    // Point on click
    map_.on("load", () => {
      const popup_control: IControl = new PopupControl();
      map_.addControl(popup_control, "bottom-left");
      map_.addSource("point", {
        type: "geojson",
        data: geojson,
      } as GeoJSONSourceOptions);
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
    <div className="relative h-full">
      <div
        ref={mapContainer}
        id="map"
        className="rounded-lg flex-grow mx-10 border-[10px] border-white h-full"
      />
    </div>
  );
}
