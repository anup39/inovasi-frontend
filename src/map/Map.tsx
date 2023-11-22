import { useRef, useEffect } from "react";
import maplibregl, { Map } from "maplibre-gl"; // Import 'Map' type from 'maplibre-gl'
import "../css/map/Map.scss";
import SelectDataFormatControl from "../components/dashboardcomp/SelectDataFormatControl";
// @ts-ignore
// import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
// import GeocoderApi from "../maputils/GeocoderApi";
// import { useDispatch } from "react-redux";
// import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";

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
    if (component === "mill supplier") {
      map_.addControl(new SelectDataFormatControl(), "top-left");
    }

    return () => {
      map_.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (map) {
  //     const geocoder = new MaplibreGeocoder(GeocoderApi, {
  //       maplibregl: maplibregl,
  //       showResultsWhileTyping: true,
  //       flyTo: true,
  //     });

  //     geocoder.addTo(refObj.current!);
  //     geocoder.on("result", function (ev: any) {
  //       const coords = ev.result.geometry.coordinates;
  //       map.flyTo({ center: coords });
  //     });
  //   }
  // }, [map, refObj]);

  return <div ref={mapContainer} id="map" className="map" />;
}
