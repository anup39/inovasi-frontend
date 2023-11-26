import { useEffect, useState } from "react";
import Layout from "../components/commoncomp/Layout";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import axios from "axios";
import TableComp from "../components/commoncomp/TableComp";

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
  // const optionsReporting = ["Metric", "Mill Supplier"];
  const estateids = localStorage.getItem("estateids");
  const [tabledata, settabledata] = useState([]);
  const [tablecolumn, settablecolumn] = useState([]);

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        AddLayerAndSourceToMap({
          map: map,
          layerId: "agriplot-layer",
          sourceId: "agriplot",
          url: `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_agriplot_by_estateids/{z}/{x}/{y}?estateids=${estateids}`,

          source_layer: "function_zxy_query_app_agriplot_by_estateids",
          showPopup: true,
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
  }, [map, estateids]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_DASHBOARD_URL
        }/agriplot-result/?estateids=${estateids}`
      )
      .then((res) => {
        settabledata(res.data);
      });
  }, [estateids]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DASHBOARD_URL}/table-column/agriplot/`)
      .then((res) => {
        settablecolumn(res.data.columns);
      });
  }, []);
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

        <TableComp
          tableColumn={tablecolumn}
          tableData={tabledata}
          map={map}
          component={"agriplot"}
        />

        {/* <div className="mx-4 my-3 flex justify-between items-center">
          <Dropdown options={optionsReporting} placeholder="Metric" />
          <Pagination totalPages={50} />
        </div> */}
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
