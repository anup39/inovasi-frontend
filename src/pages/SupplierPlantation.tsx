import { useEffect, useState } from "react";
import Layout from "../components/commoncomp/Layout";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import axios from "axios";
import TableComp from "../components/commoncomp/TableComp";
import { useSelector, useDispatch } from "react-redux";
import { settabledata } from "../reducers/SupplierPlantation";

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
  // const optionsReporting = ["Metric", "Mill Supplier"];
  const dispatch = useDispatch();
  const estateids = localStorage.getItem("estateids");
  const mill_id = localStorage.getItem("mill_id");
  const mill_long = localStorage.getItem("mill_long");
  const mill_lat = localStorage.getItem("mill_lat");

  // const [tabledata, settabledata] = useState([]);
  const [tablecolumn, settablecolumn] = useState([]);
  const tableData = useSelector((state) => state.supplierPlantation.tabledata);

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        // map.flyTo({ center: [103.05, 2.25] });
        map.flyTo({ center: [103.05, 2.25], zoom: 15 });

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
            fill_color: "green",
            fill_opacity: "0",
            stroke_color: "black",
          },
          zoomToLayer: false,
          center: [103.8574, 2.2739],
          fillType: "fill",
          trace: false,
          component: "agriplot",
        });
        AddLayerAndSourceToMap({
          map: map,
          layerId: "mill-layer-single",
          sourceId: "mill-single",
          url: `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_mill_by_millid/{z}/{x}/{y}?millid=${mill_id}`,
          source_layer: "function_zxy_query_app_mill_by_millid",
          showPopup: true,
          style: {
            fill_color: "blue",
            fill_opacity: "0",
            stroke_color: "",
          },
          zoomToLayer: false,
          center: [103.8574, 2.2739],
          fillType: "point",
          trace: false,
          component: "mill",
        });
      });
    }
  }, [map, estateids, mill_lat, mill_long, mill_id]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_DASHBOARD_URL
        }/agriplot-result/?estateids=${estateids}`
      )
      .then((res) => {
        dispatch(settabledata(res.data));
      });
  }, [estateids, dispatch]);

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
          tableData={tableData}
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
