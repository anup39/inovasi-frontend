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
          if (fillType === "point") {
            map.flyTo({ center: center });
          } else {
            map.fitBounds(bounds);
          }
        }
      })
      .catch(function () {});
  }

  const newSource: SourceSpecification = {
    type: "vector",
    tiles: [url],
    promoteId: "id",
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
        "circle-stroke-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "red",
          "black",
        ],
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
        "fill-outline-color": style.stroke_color,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.5,
        ],
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

      if (features.length > 0) {
        const clickedFeature = features[0];
        // Implement your logic to highlight the feature
        // You may change its style or apply a visual effect
        // For example, change the outline color
        map.setFeatureState(
          {
            source: clickedFeature.source,
            id: clickedFeature.id,
            sourceLayer: source_layer,
          },
          { hover: true }
        );
        // }
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
