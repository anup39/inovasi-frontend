import { useEffect } from "react";
import Layout from "../components/commoncomp/Layout";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
  // const optionsReporting = ["Metric", "Mill Supplier"];

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        AddLayerAndSourceToMap({
          map: map,
          layerId: "agriplot-layer",
          sourceId: "agriplot",
          url: `${import.meta.env.VITE_API_MAP_URL}/app_agriplot/{z}/{x}/{y}`,

          source_layer: "app_agriplot",
          showPopup: false,
          style: {
            fill_color: "red",
            fill_opacity: "0",
            stroke_color: "black",
          },
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          fillType: "fill",
          trace: false,
          component: "agriplot",
        });
      });
    }
  }, [map]);

  return (
    <Layout>
      <div className="flex flex-col h-[90vh]">
        <div className="flex-1">
          <MapComponent
            map={map}
            onSetMap={onSetMap}
            component="supplier-plantation"
          />
        </div>

        {/* <div className="mx-4 my-3 flex justify-between items-center">
          <Dropdown options={optionsReporting} placeholder="Metric" />
          <Pagination totalPages={50} />
        </div> */}
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
