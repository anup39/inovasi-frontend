import axios from "axios";
import createPointGeojson from "./geojsontemp";
import {
  Map,
  LngLatLike,
  SourceSpecification,
  CircleLayerSpecification,
  LayerSpecification,
  GeoJSONSource,
  IControl,
} from "maplibre-gl";

interface AddLayerProps {
  map: Map;
  layerId: string;
  sourceId: string;
  url: string;
  source_layer: string;
  showPopup: boolean;
  style: { fill_color: string; fill_opacity: string; stroke_color: string };
  zoomToLayer: boolean;
  center: LngLatLike;
  fillType: string;
  trace: boolean;
  component: string;
}

function AddLayerAndSourceToMap({
  map,
  layerId,
  sourceId,
  url,
  source_layer,
  showPopup,
  style,
  zoomToLayer,
  center,
  fillType,
  trace,
  component,
}: AddLayerProps) {
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

  const newSource: SourceSpecification = {
    type: "vector",
    tiles: [url],
  };

  map.addSource(sourceId, newSource);

  if (fillType && fillType === "point") {
    const newLayer: CircleLayerSpecification = {
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
    };
    map.addLayer(newLayer);
    // map.moveLayer(layerId, "gl-draw-polygon-fill-inactive.cold");
  } else {
    const newLayer: LayerSpecification = {
      id: layerId,
      type: "fill",
      source: sourceId,
      "source-layer": source_layer,
      layout: {},
      paint: {
        "fill-color": style.fill_color,
        "fill-opacity": parseInt(style.fill_opacity),
        "fill-outline-color": style.stroke_color,
      },
    };
    map.addLayer(newLayer);
    // map.moveLayer(layerId, "gl-draw-polygon-fill-inactive.cold");
  }

  if (showPopup) {
    map.on("click", layerId, (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      }
      const feature = features[0];
      const long: string = component + "_" + "long";
      const lat: string = component + "_" + "lat";
      const geojson = createPointGeojson([
        parseFloat(feature.properties[long]),
        parseFloat(feature.properties[lat]),
      ]);

      if (map.getSource("point") && map.getLayer("point-layer")) {
        const source = map.getSource("point") as GeoJSONSource;
        source.setData(geojson);
        map.setLayoutProperty("point-layer", "visibility", "visible");
        map.flyTo({
          center: [
            parseFloat(feature.properties[long]),
            parseFloat(feature.properties[lat]),
          ],
        });
      }
      const popup_name: string = "PopupControl";
      // @ts-ignore
      const popup_index = map._controls.indexOf(popup_name);

      if (popup_index) {
        const popup_control: IControl = map._controls[map._controls.length - 1];
        // @ts-ignore
        popup_control.updatePopup(feature.properties, trace);
      }
    });
  }
}

export default AddLayerAndSourceToMap;
