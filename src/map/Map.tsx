import { useRef, useEffect, useState } from "react";
import maplibregl, { Map } from "maplibre-gl"; // Import 'Map' type from 'maplibre-gl'
import "../css/map/Map.scss";
// @ts-ignore
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import GeocoderApi from "../maputils/GeocoderApi";
// import { useDispatch } from "react-redux";

interface MapProps {
  refObj: React.RefObject<HTMLDivElement>;
}

export default function MapComponent({ refObj }: MapProps) {
  // const dispatch = useDispatch();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${
        import.meta.env.VITE_MAPTILER_TOKEN
      }`,
      center: [103.8574, 2.2739],
      zoom: 10,
    });

    // window.map_global = map;
    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      const geocoder = new MaplibreGeocoder(GeocoderApi, {
        maplibregl: maplibregl,
        showResultsWhileTyping: true,
        flyTo: true,
      });

      geocoder.addTo(refObj.current!);
      geocoder.on("result", function (ev 
        :any) {
        const coords = ev.result.geometry.coordinates;
        map.flyTo({ center: coords });
      });
    }
  }, [map, refObj]);

  return <div ref={mapContainer} id="map" className="map" />;
}
