import axios from "axios";
import RemoveSourceAndLayerFromMap from "./RemoveSourceAndLayer";
import createPointGeojson from "./geojsontemp";

function AddLayerAndSourceToMap({
  // @ts-ignore
  map,
  // @ts-ignore
  layerId,
  // @ts-ignore
  sourceId,
  // @ts-ignore
  url,
  // @ts-ignore
  source_layer,
  // @ts-ignore
  showPopup,
  // @ts-ignore
  style,
  // @ts-ignore
  zoomToLayer,
  // @ts-ignore
  center,
  // @ts-ignore
  fillType,
  // @ts-ignore
  trace,
  // @ts-ignore
  component,
}) {
  // Rest of your component code remains unchanged

  if (zoomToLayer) {
    axios
      .get(`${import.meta.env.VITE_API_MAP_URL}/${source_layer}`)
      .then(function (response) {
        const bounds = response.data.bounds;
        if (bounds && bounds.length === 4) {
          map.flyTo({ center: center });
        }
      })
      .catch(function () {});
  }

  const newSource = {
    type: "vector",
    tiles: [url],
  };

  map.addSource(sourceId, newSource);

  if (fillType && fillType === "point") {
    const newLayer = {
      id: layerId,
      type: "circle",
      source: sourceId,
      "source-layer": source_layer,
      layout: {},
      paint: {
        "circle-color": style.fill_color,
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "black",
      },
      cluster: true,
    };
    map.addLayer(newLayer);
    // map.moveLayer(layerId, "gl-draw-polygon-fill-inactive.cold");
  } else {
    const newLayer = {
      id: layerId,
      type: "fill",
      source: sourceId,
      "source-layer": source_layer,
      layout: {},
      paint: {
        "fill-color": style.fill_color,
        "fill-opacity": style.fill_opacity,
        "fill-outline-color": style.stroke_color,
      },
    };
    map.addLayer(newLayer);
    // map.moveLayer(layerId, "gl-draw-polygon-fill-inactive.cold");
  }

  if (showPopup) {
    map.on("click", layerId, (e: any) => {
      const features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      }
      const feature = features[0];
      const long = component + "_" + "long";
      const lat = component + "_" + "lat";
      const geojson = createPointGeojson(
        [
          parseFloat(feature.properties[long]),
          parseFloat(feature.properties[lat]),
        ],
        feature.properties
      );

      if (map.getSource("point") && map.getLayer("point-layer")) {
        const source = map.getSource("point");
        console.log(source, "source");
        // Update the data property of the source with the new URL
        source.setData(geojson);
        map.setLayoutProperty("point-layer", "visibility", "visible");

        map.flyTo({
          center: [
            parseFloat(feature.properties[long]),
            parseFloat(feature.properties[lat]),
          ],
        });
      }
      console.log(map);

      const popup_index = map._controls.indexOf("PopupControl");
      console.log(popup_index);

      if (popup_index) {
        map._controls[map._controls.length - 1].updatepopup(
          feature.properties,
          trace
        );
      }
    });
  }
}

export default AddLayerAndSourceToMap;
