import { useEffect } from "react";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import MapSection from "../../pages/MapSection";
import Dropdown from "../commoncomp/Dropdown";
import Layout from "../commoncomp/Layout";
import SimpleTable from "./Table";
// import MapSection from '../../pages/MapSection';
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface SupplierMillProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const SupplierMill: React.FC<SupplierMillProps> = ({ map, onSetMap }) => {
  const optionsReporting = ["Metric", "Mill Supplier"];

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        AddLayerAndSourceToMap({
          map: map,
          layerId: "mill-layer",
          sourceId: "mill",
          url: `${import.meta.env.VITE_API_MAP_URL}/app_mill/{z}/{x}/{y}`,
          source_layer: "app_mill",
          showPopup: true,
          style: {
            fill_color: "blue",
            fill_opacity: 0,
            stroke_color: "",
          },
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          fillType: "point",
        });
      });
    }
  }, [map]);

  return (
    <Layout>
      <div className="mt-4">
        <MapSection map={map} onSetMap={onSetMap} />
      </div>
      <div className="mx-4 my-3">
        <Dropdown options={optionsReporting} placeholder="Metric" />
      </div>
      {/* <div className="space-x-4  flex">
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supply Mill Region</h1>
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Type</h1>
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">RSPO Certified</h1>
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Risk</h1>
        </div>
      </div> */}
      <SimpleTable />
    </Layout>
  );
};
export default SupplierMill;
