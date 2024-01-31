import axios from "axios";
import {
  Map,
  LngLatLike,
  SourceSpecification,
  SymbolLayerSpecification,
  LayerSpecification,
  IControl,
} from "maplibre-gl";

interface AddLayerProps {
  map: Map;
  layerId: string;
  sourceId: string;
  url: string;
  image_path: string;
  source_layer: string;
  showPopup: boolean;
  style: { fill_color: string; fill_opacity: string; stroke_color: string };
  zoomToLayer: boolean;
  center: LngLatLike;
  geomType: string;
  fillType: string;
  trace: boolean;
  component: string;
}

function AddLayerAndSourceToMap({
  map,
  layerId,
  sourceId,
  url,
  image_path,
  source_layer,
  showPopup,
  style,
  zoomToLayer,
  center,
  geomType,
  fillType,
  trace,
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

  if (geomType && geomType === "geojson") {
    const newSourceGeojson: SourceSpecification = {
      type: "geojson",
      data: url,
    };
    map.addSource(sourceId, newSourceGeojson);
  } else {
    const newSource: SourceSpecification = {
      type: "vector",
      tiles: [url],
      promoteId: "id",
    };

    map.addSource(sourceId, newSource);
  }

  if (fillType && fillType === "point") {
    map.loadImage(image_path, (error, image) => {
      if (error) throw error;

      if (image_path === "facilities.png") {
        // @ts-ignore
        map.addImage("facilities", image);
        const newLayer: SymbolLayerSpecification = {
          id: layerId,
          type: "symbol",
          source: sourceId,
          "source-layer": source_layer,
          layout: {
            "icon-image": "facilities",
            "icon-size": 1,
          },
        };
        map.addLayer(newLayer);
      }

      if (image_path === "refinery.png") {
        // @ts-ignore
        map.addImage("refinery", image);
        const newLayer: SymbolLayerSpecification = {
          id: layerId,
          type: "symbol",
          source: sourceId,
          "source-layer": source_layer,
          layout: {
            "icon-image": "refinery",
            "icon-size": 1,
          },
        };
        map.addLayer(newLayer);
      }

      if (image_path === "millnew.png") {
        // @ts-ignore
        map.addImage("millnew", image);
        const newLayer: SymbolLayerSpecification = {
          id: layerId,
          type: "symbol",
          source: sourceId,
          "source-layer": source_layer,
          layout: {
            "icon-image": "millnew",
            "icon-size": 1,
          },
          paint: {},
        };
        map.addLayer(newLayer);
      }
      if (image_path === "planted.png") {
        // @ts-ignore
        map.addImage("planted", image);
        const newLayer: SymbolLayerSpecification = {
          id: layerId,
          type: "symbol",
          source: sourceId,
          "source-layer": source_layer,
          layout: {
            "icon-image": "planted",
            "icon-size": 1,
          },
        };
        map.addLayer(newLayer);
      }

      // map.addLayer({
      //   id: "points",
      //   type: "symbol",
      //   source: "point",
      //   layout: {
      //     "icon-image": "cat",
      //     "icon-size": 0.25,
      //   },
      // });
    });

    // map.moveLayer(layerId, "gl-draw-polygon-fill-inactive.cold");
  } else {
    if (geomType && geomType === "geojson") {
      const newLayerGeojson: LayerSpecification = {
        id: layerId,
        type: "fill",
        source: sourceId,
        // "source-layer": source_layer,
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
      map.addLayer(newLayerGeojson);
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
    }
  }
  let hoveredStateId: null = null!;

  if (showPopup) {
    map.on("mousemove", layerId, (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      } else {
        const feature = features[0];
        const popup_name: string = "PopupControl";
        // @ts-ignore
        const popup_index = map._controls.indexOf(popup_name);

        if (popup_index) {
          const popup_control: IControl =
            map._controls[map._controls.length - 1];
          // @ts-ignore
          popup_control.updatePopup(feature.properties, trace, true);
        }
      }
      // @ts-ignore
      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.setFeatureState(
            {
              source: sourceId,
              id: hoveredStateId,
              // sourceLayer: source_layer,
            },
            { hover: false }
          );
        }
        // @ts-ignore
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          {
            source: sourceId,
            // @ts-ignore
            id: hoveredStateId,
            // sourceLayer: source_layer,
          },
          { hover: true }
        );
      }
    });

    map.on("mouseleave", layerId, () => {
      if (hoveredStateId) {
        map.setFeatureState(
          {
            source: sourceId,
            id: hoveredStateId,
            sourceLayer: source_layer,
          },
          { hover: false }
        );
      }
    });
  }
}

export default AddLayerAndSourceToMap;
