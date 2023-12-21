import { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import MapComponent from "../map/Map";
import Layout from "../components/commoncomp/Layout";
import TableComp from "../components/commoncomp/TableComp";
import { Map } from "maplibre-gl";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Toast from "../components/commoncomp/Toast";
import { RootState } from "../store";
import { setmilltabledata } from "../reducers/SupplierPlantation";
import { setpiechartfor } from "../reducers/Auth";
import { setselectedDataFormat } from "../reducers/DisplaySettings";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwitchComp from "../components/commoncomp/SwitchComp";
import PieChartComp from "../components/commoncomp/PieChartComp";
import Pagination from "../components/commoncomp/Pagination";
// import LineBar from "../components/commoncomp/LineBar";
// import LineBarComp from "../components/commoncomp/LineBarNew";

const items = [
  {
    id: 1,
    name: "Deforestation Risk",
    selected: false,
    distinct: "mill_deforestation_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
  },
  {
    id: 2,
    name: "Legal PRF Risk",
    selected: false,
    distinct: "mill_legal_prf_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2"],
      numbers: ["48%", "22%"],
      colors: ["#10BD82", "#B8E500"],
    },
  },
  {
    id: 3,
    name: "Legal Landuse Risk",
    selected: false,
    distinct: "mill_legal_landuse_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2"],
      numbers: ["48%", "22%"],
      colors: ["#10BD82", "#B8E500"],
    },
  },
  {
    id: 4,
    name: "Complex Supplybase Risk",
    selected: false,
    distinct: "mill_complex_supplybase_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#10BD82", "#83DE60", "#B8E500"],
    },
  },
];

interface SupplierMillProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const SupplierMill: React.FC<SupplierMillProps> = ({ map, onSetMap }) => {
  const dispatch = useDispatch();
  const [tableColumn, settableColumn] = useState([]);
  // const [tableData, settableData] = useState([]);
  const tableData = useSelector(
    (state: RootState) => state.supplierPlantation.tabledata
  );

  const milltabledata = useSelector(
    (state: RootState) => state.supplierPlantation.milltabledata
  );

  const tableColumnRedux = useSelector(
    (state: RootState) => state.supplierPlantation.tableColumn
  );

  const selectedDataFormat = useSelector(
    (state: RootState) => state.displaySettings.selectedDataFormat
  );
  const is_agriplot = useSelector(
    (state: RootState) => state.displaySettings.is_agriplot
  );

  const mill_name: string | null = localStorage.getItem("mill_name");

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
            fill_opacity: "0",
            stroke_color: "",
          },
          image_path: "millnew.png",
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          fillType: "point",
          trace: true,
          component: "mill",
        });
      });
    }
  }, [map]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DASHBOARD_URL}/table-column/mill/`)
      .then((res) => {
        settableColumn(res.data.columns);
      });

    axios.get(`${import.meta.env.VITE_API_DASHBOARD_URL}/mill/`).then((res) => {
      dispatch(setmilltabledata(res.data));
    });
    dispatch(setpiechartfor("mill"));
    dispatch(setselectedDataFormat("Table"));
  }, [dispatch]);

  const params = {
    estateids: [],
    geometry_wkt: "",
  };
  const theme = createTheme();

  const [showMap, setShowMap] = useState(true);
  const [selectedOption, setSelectedOption] = useState("list");

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

  // const pageHeight = `calc(100vh - 60px)`;

  // useEffect(() => {
  //   if (map) {
  //     const legend_name: string = "LegendControl";
  //     // @ts-ignore
  //     const legend_index = map._controls.indexOf(legend_name);

  //     if (legend_index) {
  //       const legend_control = map._controls[map._controls.length - 3];
  //       // @ts-ignore
  //       legend_control.updateLegend("millsuppiler");
  //     }
  //   }
  // }, []);

  return (
    <Layout>
      <Toast />
      <div className="flex h-[984px] flex-col ">
        <div className="flex items-center justify-end px-1 m-2">
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
        <MapComponent map={map} onSetMap={onSetMap} component={"mill"} />
        {/* </div> */}
        <div
          className={`flex w-full justify-between items-center ${
            showMap ? "block" : "hidden"
          }`}
        >
          {/* the metric select button */}
          <div
            className={`flex my-2 p-2 gap-2 transition-all ease-in delay-100 
          
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
          {/* pages */}
          <Pagination />
        </div>
        {selectedDataFormat && selectedDataFormat === "Table" ? (
          <>
            <div className="w-full">
              <TableComp
                tableColumn={tableColumn}
                // @ts-ignore
                tableData={milltabledata}
                map={map}
                component={"mill"}
                height="350px"
                // width="1580px"
                pageSize={5}
              />
            </div>

            {is_agriplot ? (
              <>
                {" "}
                <div className=" flex m-3 justify-between items-center">
                  <span className="bg-gray">
                    Supplier Plantaton for {mill_name}:{" "}
                    <b>Total :{tableData?.length}</b>
                  </span>{" "}
                  <Pagination />{" "}
                </div>
                <TableComp
                  // @ts-ignore

                  tableColumn={tableColumnRedux}
                  // @ts-ignore
                  tableData={tableData}
                  map={map}
                  component={"agriplot"}
                  height="300px"
                  width="1569px"
                  pageSize={4}
                />
              </>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white flex items-start rounded-lg lg:w-1/4 w-[370px] md:w-[370px] h-[340px]  "
              >
                <div className="py-2 px-2 flex items-center flex-col w-full">
                  <div className="flex justify-between items-center w-full py-5">
                    <h1 className="text-semiBlackText font-semibold md:font-bold text-sm p-1">
                      {item.name}
                    </h1>
                    <img
                      className="scale-75 cursor-pointer"
                      src="moreinfo.svg"
                      alt=""
                    />
                  </div>
                  {/* <LineBarComp
                    params={params}
                    data={item}
                    width_={200}
                    height_={200}
                    params_include={false}
                  /> */}
                  <PieChartComp
                    params={params}
                    data={item}
                    width_={170}
                    height_={170}
                    params_include={false}
                    gradient_start={[25, 96]}
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
export default SupplierMill;
