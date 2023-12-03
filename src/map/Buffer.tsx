import React, { useState } from "react";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import RemoveSourceAndLayerFromMap from "../maputils/RemoveSourceAndLayer";
import { GeoJSONSource, SourceSpecification } from "maplibre-gl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { settabledata } from "../reducers/SupplierPlantation";
import { Map } from "maplibre-gl";
import { ChangeEvent } from "react";
import convertCoordinatesToWKT from "../maputils/convertGeojsonToWkt";
import makeRadiusfrompoint from "../maputils/makeRadiusfrompoint";

interface BufferProps {
  map: Map;
}


const Buffer = ({ map }: BufferProps) => {
  const dispatch = useDispatch();
  const estateids = localStorage.getItem("estateids");
  const mill_name: string | null = localStorage.getItem("mill_name");
  const mill_lat: string = localStorage.getItem("mill_lat")!;
  const mill_long: string = localStorage.getItem("mill_long")!;
  const [radius, setradius] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    const buffered = makeRadiusfrompoint(
      [parseFloat(mill_long), parseFloat(mill_lat)],
      radius * 1000
    );
    if (
      map.getSource("polygon-radius") &&
      map.getLayer("polygon-radius-layer")
    ) {
      const source = map.getSource("polygon-radius") as GeoJSONSource;
      source.setData(buffered);

      map.setLayoutProperty("polygon-radius-layer", "visibility", "visible");
      const wkt_final = convertCoordinatesToWKT(buffered);
      axios
        .get(
          `${
            import.meta.env.VITE_API_DASHBOARD_URL
          }/agriplot-result-wkt/?estateids=${estateids}&geometry_wkt=${wkt_final}`
        )
        .then((res) => {
          dispatch(settabledata(res.data));
        });
      if (map.getSource("agriplot-wkt") && map.getLayer("agriplot-wkt-layer")) {
        const source = map.getSource("agriplot-wkt") as SourceSpecification;
        // @ts-ignore
        source.setTiles([
          `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_agriplot_by_estateids_and_wkt/{z}/{x}/{y}?estateids=${estateids}&geometry_wkt=${wkt_final}`,
        ]);
      } else {
        AddLayerAndSourceToMap({
          map: map,
          layerId: "agriplot-wkt-layer",
          sourceId: "agriplot-wkt",
          url: `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_agriplot_by_estateids_and_wkt/{z}/{x}/{y}?estateids=${estateids}&geometry_wkt=${wkt_final}`,

          source_layer: "function_zxy_query_app_agriplot_by_estateids_and_wkt",
          showPopup: true,
          style: {
            fill_color: "white",
            fill_opacity: "0",
            stroke_color: "black",
          },
          zoomToLayer: false,
          center: [103.8574, 2.2739],
          fillType: "fill",
          trace: false,
          component: "agriplot",
        });
      }

      RemoveSourceAndLayerFromMap({
        map,
        layerId: "agriplot-layer",
        sourceId: "agriplot",
      });
    }
  };

  const handlePlantedOutside = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      AddLayerAndSourceToMap({
        map: map,
        layerId: "plantedoutsidelandregistration-layer",
        sourceId: "plantedoutsidelandregistration",
        url: `${
          import.meta.env.VITE_API_MAP_URL
        }/app_plantedoutsidelandregistration/{z}/{x}/{y}`,

        source_layer: "app_plantedoutsidelandregistration",
        showPopup: true,
        style: {
          fill_color: "red",
          fill_opacity: "0",
          stroke_color: "black",
        },
        zoomToLayer: false,
        center: [103.8574, 2.2739],
        fillType: "fill",
        trace: false,
        component: "plantedoutside",
      });
    } else {
      RemoveSourceAndLayerFromMap({
        map,
        sourceId: "plantedoutsidelandregistration",
        layerId: "plantedoutsidelandregistration-layer",
      });
    }
  };

  const handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setradius(parseInt(event.target.value));
  };

  const [isVisible, setIsVisible] = useState(false);
  const handleToggleForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleToggleForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {isVisible && (
        <form
          className="flex flex-col gap-0 lg:gap-2 bg-white p-2 max-w-sm rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="text-black text-lg pl-0 ">
            Plots for : <span className="font-semibold">{mill_name}</span>
          </div>

          <div className="text-black text-lg ">
            Buffer Agriplot(km) :
            <input
              onChange={handleRadiusChange}
              required
              min={1}
              max={500}
              type="number"
              placeholder="Enter Number"
              className="rounded-md text-black border-2 border-black font-semibold w-full placeholder:text-black placeholder:font-normal placeholder:text-center"
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="text-white font-bold font-mono text-sm hover:cursor-pointer p-1 rounded-lg my-1 w-full bg-darkGreen">
              Apply Buffer
            </button>
          </div>
          <div className="bg-white flex items-center justify-start">
            <label className="text-black text-lg">PlantedOutside</label>
            <input
              type="checkbox"
              onChange={handlePlantedOutside}
              className="hover:cursor-pointer ml-2"
            ></input>
          </div>
          <div className="text-white text-lg">
            <button
              onClick={() => window.location.reload()}
              className=" bg-darkGreen px-4 py-1 text-white font-mono rounded-lg hover:cursor-pointer"
            >
              Reset Map
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Buffer;
