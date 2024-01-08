import { useRef, useEffect, useState } from "react";
import maplibregl, { Map, IControl, GeoJSONSourceOptions } from "maplibre-gl";
import "../css/map/Map.scss";
// import SelectDataFormatControl from "./SelectDataFormatControl";
// import BufferControl from "./BufferControl";
// @ts-ignore
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import GeocoderApi from "../maputils/GeocoderApi";
import PopupControl from "./PopupControl";
import LegendControl from "./LegendControl";
import BaseMapSwitch from "../components/commoncomp/BaseMapSwitch";
// import LabelControl from "./LabelControl";
// import { createTheme } from "@mui/material/styles";
import { NavigationControl } from "maplibre-gl";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
  const [height, setHeight] = useState("min-h-[630px]");
  const showMapLoader = useSelector(
    (state: RootState) => state.displaySettings.showMapLoader
  );

  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map_ = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${
        import.meta.env.VITE_MAPTILER_TOKEN
      }`,
      center: [103.8574, 2.2739],
      zoom: 5,
      attributionControl: false,
    });

    // @ts-ignore
    const geocoder = new MaplibreGeocoder(GeocoderApi, {
      maplibregl: maplibregl,
      showResultsWhileTyping: true,
      flyTo: true,
    });
    map_.addControl(geocoder, "top-right");

    // geocoder.addTo(document.getElementById("geocoding-search"));
    // @ts-ignore
    geocoder.on("result", function (ev) {
      const coords = ev.result.geometry.coordinates;
      map_.flyTo({ center: coords });
    });

    const navigationcontrol = new NavigationControl();
    map_.addControl(navigationcontrol, "top-right");

    map_.addControl(new maplibregl.FullscreenControl());

    // // @ts-ignore
    // const geocoder = new MaplibreGeocoder(GeocoderApi, {
    //   maplibregl: maplibregl,
    //   showResultsWhileTyping: true,
    //   flyTo: true,
    // });
    // map_.addControl(geocoder, "top-right");

    // // geocoder.addTo(document.getElementById("geocoding-search"));
    // // @ts-ignore
    // geocoder.on("result", function (ev) {
    //   const coords = ev.result.geometry.coordinates;
    //   map_.flyTo({ center: coords });
    // });

    onSetMap(map_);
    // @ts-ignore
    window.mapglobal = map_;
    if (component === "dashboard") {
      setHeight("min-h-[630px]");
    }
    if (component === "mill" || component === "supplier-plantation") {
      setHeight("min-h-[464px]");
    }
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

    // }

    map_.on("load", () => {
      const legend_control: IControl = new LegendControl();
      map_.addControl(legend_control, "top-left");

      const popup_control: IControl = new PopupControl();
      map_.addControl(popup_control, "bottom-right");

      // Add satellite source
      map_.addSource("satellite_source", {
        type: "raster",
        tiles: [
          `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${
            import.meta.env.VITE_MAPTILER_TOKEN
          }`,
        ],
        tileSize: 256,
      });

      // Add satellite layer
      map_.addLayer(
        {
          id: "satellite_layer",
          type: "raster",
          source: "satellite_source",
        },
        "housenumber"
      );

      // Add streets source
      map_.addSource("basic_source", {
        type: "raster",
        tiles: [
          "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=l0YRm3kb0FVo9JhCP3Ia",
        ],
        tileSize: 256,
      });

      // Add satellite layer
      map_.addLayer(
        {
          id: "basic_layer",
          type: "raster",
          source: "basic_source",
        },
        "housenumber"
      );

      // Add dark source
      map_.addSource("dark_source", {
        type: "raster",
        tiles: [
          `https://cartodb-basemaps-d.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png`,
        ],
        tileSize: 256,
      });

      // Add dark layer
      map_.addLayer(
        {
          id: "dark_layer",
          type: "raster",
          source: "dark_source",
        },
        "housenumber"
      );

      if (
        map_.getSource("satellite_source") &&
        map_.getLayer("satellite_layer")
      ) {
        map_.setLayoutProperty("satellite_layer", "visibility", "none");
      }
      if (map_.getSource("basic_source") && map_.getLayer("basic_layer")) {
        map_.setLayoutProperty("basic_layer", "visibility", "none");
      }
      if (map_.getSource("dark_source") && map_.getLayer("dark_layer")) {
        map_.setLayoutProperty("dark_layer", "visibility", "none");
      }

      // Point Table layer
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

      // Polygon Table Layer
      map_.addSource("polygon-table", {
        type: "geojson",
        data: geojson_polygon,
      } as GeoJSONSourceOptions);
      map_.addLayer({
        id: "polygon-table-layer",
        type: "line",
        source: "polygon-table",
        paint: {
          "line-color": "red",
          "line-width": 4,
          "line-dasharray": [1, 1],
        },
      });

      // Radius of the circle layer
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
          "fill-opacity": 0.1,
          "fill-outline-color": "red",
        },
      });

      map_.setLayoutProperty("point-table-layer", "visibility", "none");
      map_.setLayoutProperty("polygon-table-layer", "visibility", "none");
      map_.setLayoutProperty("polygon-radius-layer", "visibility", "none");
    });

    return () => {
      map_.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      id="map"
      className={`map rounded-[20px] relative w-full ${height} `}
    >
      {showMapLoader ? (
        <div className="absolute top-1/2 right-1/2  md:right-1/2 z-10 bg-white h-24 w-24 rounded-xl">
          <CircularProgress
            color="success"
            sx={{ color: "#37CC7D", marginTop: "25%", marginLeft: "25%" }}
          />
          <p style={{ color: "black", marginLeft: "15%" }}>Loading..</p>
        </div>
      ) : null}

      <div
        style={{ zIndex: 1 }}
        className="absolute top- right-[25px] md:right-12 "
      >
        <BaseMapSwitch />
      </div>
    </div>
  );
}
