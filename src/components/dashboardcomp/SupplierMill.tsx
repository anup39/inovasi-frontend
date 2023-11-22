import { useEffect } from "react";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import MapSection from "../../pages/MapSection";
import DashPieItem from "./DashPieItem";

import Layout from "../commoncomp/Layout";
// import SimpleTable from "./Table";
import TableComp from "./TableComp";
// import MapSection from '../../pages/MapSection';
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'
import { useSelector } from "react-redux";

interface SupplierMillProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const SupplierMill: React.FC<SupplierMillProps> = ({ map, onSetMap }) => {
  const selectedDataFormat = useSelector(
    (state) => state.displaySettings.selectedDataFormat
  );

  console.log(selectedDataFormat, "selected data format");
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
      <div className="mt-4 mb-2">
        <MapSection map={map} onSetMap={onSetMap} component={"mill"} />
      </div>
      {selectedDataFormat && selectedDataFormat === "Supplier Mill" ? (
        <TableComp />
      ) : (
        <DashPieItem />
      )}
    </Layout>
  );
};
export default SupplierMill;
