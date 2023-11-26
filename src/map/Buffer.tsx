import React, { useState } from "react";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import RemoveSourceAndLayerFromMap from "../maputils/RemoveSourceAndLayer";
import * as turf from "@turf/turf";

function makeRadius(lngLatArray, radiusInMeters) {
  var point = turf.point(lngLatArray);
  var buffered = turf.buffer(point, radiusInMeters, { units: "meters" });
  return buffered;
}
const Buffer: React.FC = ({ map }) => {
  const mill_name: string | null = localStorage.getItem("mill_name");
  const mill_lat = localStorage.getItem("mill_lat");
  const mill_long = localStorage.getItem("mill_long");
  const [radius, setradius] = useState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    // console.log(radius, "radius");
    const buffered = makeRadius(
      [parseFloat(mill_long), parseFloat(mill_lat)],
      radius * 1000
    );
    console.log(buffered, "buffered");
  };

  const handlePlantedOutside = (event) => {
    console.log(event);
    if (event.target.checked) {
      console.log("checked");
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

  const handleRadiusChange = (event) => {
    setradius(event.target.value);
  };

  return (
    <form className="flex bg-white" onSubmit={handleSubmit}>
      <div className="text-black text-lg pl-0 ">Plots for : {mill_name}</div>
      <div className="text-black text-lg pl-5 ">
        Buffer Agriplot(km) :
        <input
          onChange={handleRadiusChange}
          required
          min={1}
          max={500}
          type="number"
          className="rounded-md text-black border-3 bg-yellow-200"
        />
      </div>
      <div className="text-white text-lg">
        <button className="text-black bg-red-100 hover:cursor-pointer">
          Apply Buffer
        </button>
      </div>
      <div className="bg-white pl-4">
        <label className="text-black text-lg">PlantedOutside</label>
        <input
          type="checkbox"
          onChange={handlePlantedOutside}
          className="hover:cursor-pointer"
        ></input>
      </div>
    </form>
  );
};

export default Buffer;
