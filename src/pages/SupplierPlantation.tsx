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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwitchComp from "../components/commoncomp/SwitchComp";
import {
  settoastType,
  settoastMessage,
  setshowToast,
} from "../reducers/DisplaySettings";
import Toast from "../components/commoncomp/Toast";
import Dropdown from "../components/commoncomp/Dropdown";
import Pagination from "../components/commoncomp/Pagination";

const lists = [
  { listTitle: "Managed Plantation", listValue: "2.300 ha", opacity: "1" },
  { listTitle: "3rd Party Plantation", listValue: "1.232 ha", opacity: "0.85" },
  { listTitle: "Scheme Smallholder", listValue: "2.311 ha", opacity: "0.7" },
  {
    listTitle: "Independent Smallholder",
    listValue: "120 ha",
    opacity: "0.55",
  },
  { listTitle: "POD", listValue: "374 ha", opacity: "0.4" },
  { listTitle: "3rd Party Mill", listValue: "231 ha", opacity: "0.25" },
];

const items = [
  {
    id: 1,
    name: "Mill Type",
    selected: false,
    distinct: "country",
    listColor: "#00AB71",
  },
  {
    id: 2,
    name: "Mill Certification",
    selected: false,
    distinct: "type_of_supplier",
    listColor: "#FFAD33B2",
  },
  // {
  //   id: 3,
  //   name: "Risk Assess Agriplot",
  //   selected: false,
  //   distinct: "risk_assess",
  // },
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
          image_path: "",
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
          image_path: "",
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
  function handleSwitchChange(checked: boolean) {
    setShowMap(checked);
  }
  function handleMetricChange(option: string) {
    if (option === "metric") {
      dispatch(setselectedDataFormat("Metric"));
    } else {
      dispatch(setselectedDataFormat("Table"));
    }
    setSelectedOption(option);
  }
  const [showMap, setShowMap] = useState(true);
  const [selectedOption, setSelectedOption] = useState("list");

  const theme = createTheme();

  return (
    <Layout>
      <Toast />
      <div className="flex flex-col h-[948px]">
        <div className="flex items-center justify-end px-5">
          <ThemeProvider theme={theme}>
            <SwitchComp
              label="Map"
              defaultChecked={showMap}
              // @ts-ignore
              onChange={handleSwitchChange}
            />
          </ThemeProvider>
        </div>
        {/* <div className={`my-1  ${showMap ? "block" : "hidden"} flex-1`}> */}
        <MapComponent
          map={map}
          onSetMap={onSetMap}
          component="supplier-plantation"
        />
        {/* </div> */}
        <div className="flex items-center justify-between">
          {/* div for the list/metric selector */}
          <div
            className={`flex my-2 p-2 gap-2 transition-all ease-in delay-100 ${
              showMap ? "block" : "hidden"
            }
          
          bg-white w-2/3 max-w-[330px] rounded-lg`}
          >
            <div
              onClick={() => handleMetricChange("metric")}
              className={`transition-all ease-in delay-75 rounded-lg ${
                selectedOption === "metric"
                  ? "w-2/3 bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white font-semibold"
                  : "w-1/2 bg-lightGray rounded-lg "
              } py-2 text-center  cursor-pointer`}
            >
              Metric
            </div>
            <div
              onClick={() => handleMetricChange("list")}
              className={` rounded-lg ${
                selectedOption === "list"
                  ? "w-2/3 bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white font-semibold"
                  : "w-1/2  bg-bgLightGray"
              } py-2 text-center cursor-pointer rounded-lg`}
            >
              List
            </div>
          </div>
          <div
            className={`${selectedOption === "metric" ? "block" : "hidden"}`}
          >
            <Dropdown options={["Actual", "Potential"]} placeholder="Actual" />
          </div>
          <div className={`${selectedOption === "list" ? "block" : "hidden"}`}>
            <Pagination />{" "}
          </div>
        </div>
        {selectedDataFormat && selectedDataFormat === "Table" ? (
          <>
            <TableComp
              tableColumn={tablecolumn}
              // @ts-ignore
              tableData={tableData}
              map={map}
              component={"agriplot"}
              height="300px"
              width="1569px"
              pageSize={4}
            />

            <div className=" flex m-3 justify-between items-center">
              <span className="bg-gray">
                Supplier : <b>200</b>
              </span>{" "}
              <Pagination />{" "}
            </div>

            <TableComp
              tableColumn={tablecolumn}
              // @ts-ignore
              tableData={tableData}
              map={map}
              component={"agriplot"}
              height="300px"
              width="1569px"
              pageSize={4}
            />
          </>
        ) : (
          <div className="flex flex-col lg:flex-row w-full my-1 items-center  gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white relative flex flex-col gap-4 p-3 w-full lg:w-1/2 rounded-xl"
              >
                <h1 className="text-semiBlackText font-bold min-w-fit">
                  {item.name}
                </h1>
                <img
                  className="absolute top-2 right-2"
                  src="moreinfo.svg"
                  alt=""
                />
                <div className="flex items-center justify-between w-full gap-2 md:gap-10 lg:gap-20 px-2 py-5">
                  <PieChartComp
                    params={params}
                    data={item}
                    width_={200}
                    height_={200}
                    params_include={false}
                    gradient_start={[159, 83]}
                  />
                  {/* div for those list */}
                  <div className="flex scale-50 md:scale-90 lg:scale-100 flex-col gap-2  w-full">
                    {lists.map((list) => (
                      <div
                        key={list.listTitle}
                        className="flex gap-4 justify-between"
                      >
                        <div className="flex  gap-3 items-center">
                          <div
                            style={{
                              backgroundColor: `${item.listColor}`,
                              opacity: `${Number(list.opacity)}`,
                            }}
                            className={`w-[10px] h-[10px] ]`}
                          ></div>
                          <h1>{list.listTitle}</h1>
                        </div>
                        <div>{list.listValue}</div>
                      </div>
                    ))}
                  </div>
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
