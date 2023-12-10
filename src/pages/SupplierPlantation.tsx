import { useEffect, useState } from "react";
import Layout from "../components/commoncomp/Layout";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import axios from "axios";
import TableComp from "../components/commoncomp/TableComp";
import { useSelector, useDispatch } from "react-redux";
import { settabledata } from "../reducers/SupplierPlantation";
import PieChartComp from "../components/commoncomp/PieChartComp";
import { RootState } from "../store";
import { setpiechartfor } from "../reducers/Auth";
import { setselectedDataFormat } from "../reducers/DisplaySettings";
import {
  settoastType,
  settoastMessage,
  setshowToast,
} from "../reducers/DisplaySettings";
import Toast from "../components/commoncomp/Toast";

const items = [
  {
    id: 1,
    name: "Supply Base Region Agriplot",
    selected: false,
    distinct: "country",
  },
  {
    id: 2,
    name: "Supplier Type Agriplot",
    selected: false,
    distinct: "type_of_supplier",
  },
  {
    id: 3,
    name: "Risk Assess Agriplot",
    selected: false,
    distinct: "risk_assess",
  },
];

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

  // const piechartparams = useSelector((state) => state.auth.piechartparams);

  // const [tabledata, settabledata] = useState([]);
  const [tablecolumn, settablecolumn] = useState([]);
  const tableData = useSelector(
    (state: RootState) => state.supplierPlantation.tabledata
  );
  const selectedDataFormat = useSelector(
    (state: RootState) => state.displaySettings.selectedDataFormat
  );
  const params = {
    estateids: [],
    geometry_wkt: "",
  };

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
    if (!estateids) {
      dispatch(setshowToast(true));
      dispatch(
        settoastMessage(
          "No Mill selected . Trace the Mill to see the plot. Redirecting to Mill........."
        )
      );
      dispatch(settoastType("error"));
      setTimeout(() => {
        window.location.replace("/suppliermill");
      }, 5000);
    }
    dispatch(setpiechartfor("agriplot"));
    dispatch(setselectedDataFormat("Table"));
    axios
      .get(`${import.meta.env.VITE_API_DASHBOARD_URL}/table-column/agriplot/`)
      .then((res) => {
        settablecolumn(res.data.columns);
      });
  }, [dispatch, estateids, mill_id]);
  const pageHeight = `calc(100vh - 60px)`;

  return (
    <Layout>
      <Toast />
      <div className="flex flex-col" style={{ height: pageHeight }}>
        <div className="flex-1 py-2">
          <MapComponent
            map={map}
            onSetMap={onSetMap}
            component="supplier-plantation"
          />
        </div>
        {selectedDataFormat && selectedDataFormat === "Table" ? (
          <>
            <TableComp
              tableColumn={tablecolumn}
              // @ts-ignore
              tableData={tableData}
              map={map}
              component={"agriplot"}
            />
          </>
        ) : (
          <div className="flex flex-col lg:flex-row my-2 items-center justify-center gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white flex ">
                <div className="p-1">
                  <h1 className="text-black font-bold">{item.name}</h1>
                  <PieChartComp
                    params={params}
                    data={item}
                    width_={200}
                    height_={200}
                    params_include={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
