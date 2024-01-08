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
import {
  setselectedDashboardPage,
  setselectedDataFormat,
} from "../reducers/DisplaySettings";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwitchComp from "../components/commoncomp/SwitchComp";
import PieChartComp from "../components/commoncomp/PieChartComp";
import Pagination from "../components/commoncomp/Pagination";
// import LineBar from "../components/commoncomp/LineBar";
// import LineBarComp from "../components/commoncomp/LineBarNew";
import Dropdown from "../components/commoncomp/Dropdown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Tooltip } from "@mui/material";

const items_plantation_actual = [
  {
    id: 1,
    name: "Actual registered Suppplier",
    selected: false,
    distinct: "type_of_supplier",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
    listColor: "#00C685",
    gradient_start: [159, 83],
    params: {
      plantation: "actual",
      status: "Registered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
  {
    id: 2,
    name: "Actual unregistered Suppplier",
    selected: false,
    distinct: "type_of_supplier",
    lowerBoxes: {
      title: ["Category 1", "Category 2"],
      numbers: ["48%", "22%"],
      colors: ["#10BD82", "#B8E500"],
    },
    listColor: "#FFAD33",
    gradient_start: [36, 100],
    params: {
      plantation: "actual",
      status: "Unregistered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
];

const items_plantation_potential = [
  {
    id: 1,
    name: "Potential registered Suppplier",
    selected: false,
    distinct: "type_of_supplier",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
    listColor: "#EF38FF",
    gradient_start: [295, 100],
    params: {
      plantation: "potential",
      status: "Registered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
  {
    id: 2,
    name: "Potential unregistered Suppplier",
    selected: false,
    distinct: "type_of_supplier",
    lowerBoxes: {
      title: ["Category 1", "Category 2"],
      numbers: ["48%", "22%"],
      colors: ["#10BD82", "#B8E500"],
    },
    listColor: "#FF3D00",
    gradient_start: [14, 100],
    params: {
      plantation: "potential",
      status: "Unregistered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
];

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
    listColor: "#FFAD33B2",
    gradient_start: [25, 96],
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
    listColor: "#FFAD33B2",
    gradient_start: [25, 96],
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
    listColor: "#FFAD33B2",
    gradient_start: [25, 96],
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
    listColor: "#FFAD33B2",
    gradient_start: [25, 96],
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
  const [pageMill, setPageMill] = useState(0);
  const [pageActualPlant, setPageActualPlant] = useState(0);
  const [pagePotentialPlant, setPagePotentialPlant] = useState(0);
  const [itemplantation, setItemPlantation] = useState(items_plantation_actual);
  const selectedPlantationType = useSelector(
    (state: RootState) => state.displaySettings.selectedPlantationType
  );

  const tableData = useSelector(
    (state: RootState) => state.supplierPlantation.tabledata
  );

  const milltabledata = useSelector(
    (state: RootState) => state.supplierPlantation.milltabledata
  );

  const tabledataPotential = useSelector(
    (state: RootState) => state.supplierPlantation.tabledataPotential
  );

  const tableColumnRedux = useSelector(
    (state: RootState) => state.supplierPlantation.tableColumn
  );

  const changeThePageMill = (evpage: number) => {
    setPageMill(evpage);
  };
  const changeThePageActualPlant = (evpage: number) => {
    setPageActualPlant(evpage);
  };
  const changeThePagePotentialPlant = (evpage: number) => {
    setPagePotentialPlant(evpage);
  };

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
          url: `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_mill_by_unplanted/{z}/{x}/{y}`,
          source_layer: "function_zxy_query_app_mill_by_unplanted",
          showPopup: true,
          style: {
            fill_color: "blue",
            fill_opacity: "0",
            stroke_color: "",
          },
          image_path: "millnew.png",
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          geomType: "tile",
          fillType: "point",
          trace: true,
          component: "mill",
        });
        AddLayerAndSourceToMap({
          map: map,
          layerId: "mill-layer-planted",
          sourceId: "mill-planted",
          url: `${
            import.meta.env.VITE_API_MAP_URL
          }/function_zxy_query_app_mill_by_planted/{z}/{x}/{y}`,
          source_layer: "function_zxy_query_app_mill_by_planted",
          showPopup: true,
          style: {
            fill_color: "blue",
            fill_opacity: "0",
            stroke_color: "",
          },
          image_path: "planted.png",
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          geomType: "tile",
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
    dispatch(setselectedDashboardPage("suppliermill"));
  }, [dispatch]);

  const params = {
    estateids: [],
    geometry_wkt: "",
  };
  const theme = createTheme();

  const [showMap, setShowMap] = useState(true);
  const [selectedOption, setSelectedOption] = useState("list");

  const selectedDashboardPage = useSelector(
    (state: RootState) => state.displaySettings.selectedDashboardPage
  );

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

  useEffect(() => {
    if (selectedPlantationType === "Actual") {
      setItemPlantation(items_plantation_actual);
    } else {
      setItemPlantation(items_plantation_potential);
    }
  }, [selectedPlantationType]);

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        // @ts-ignore
        const legend_control: IControl =
          map._controls[map._controls.length - 2];
        // @ts-ignore
        legend_control.updateLegend("millsupplier");
      });
    }
  }, [map]);

  return (
    <Layout>
      <Toast />
      <div className="min-h-[984px]">
        <div className="items-center flex justify-end mt-[15px]">
          <ThemeProvider theme={theme}>
            <Tooltip title="Reset Map">
              <RestartAltIcon
                onClick={() => {
                  window.location.replace("/suppliermill");
                }}
                sx={{
                  "&:hover": { cursor: "pointer" },
                  marginRight: 1,
                  color: "#72D86A",
                }}
              />
            </Tooltip>
            <SwitchComp
              label="Map"
              defaultChecked={showMap}
              // @ts-ignore
              onChange={handleSwitchChange}
            />
          </ThemeProvider>
        </div>
        <div className={`${showMap ? "block" : "hidden"}  mt-[14px] `}>
          <MapComponent map={map} onSetMap={onSetMap} component={"mill"} />
        </div>
        {/* div that keeps metric selector and pages */}
        <div
          className={`flex py-[16px] w-full justify-between items-center ${
            showMap ? "block" : "hidden"
          }`}
        >
          {/* the metric select button */}
          <div
            className={`flex py-2 p-2 gap-2 transition-all ease-in delay-100 
          
          bg-white w-2/3 max-w-[330px] rounded-[16px] h-[53px]`}
          >
            <div
              onClick={() => handleMetricChange("metric")}
              className={`transition-all ease-in delay-75 rounded-[10px] ${
                selectedOption === "metric"
                  ? "w-[200px] bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white font-semibold"
                  : "w-[100px] bg-lightGray rounded-lg "
              } py-2 text-center  cursor-pointer`}
            >
              Metric
            </div>
            <div
              onClick={() => handleMetricChange("list")}
              className={` rounded-lg ${
                selectedOption === "list"
                  ? "w-[200px] bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white font-semibold"
                  : "w-[100px]  bg-bgLightGray"
              } py-2 text-center cursor-pointer rounded-[10px]`}
            >
              List
            </div>
          </div>
          {/* pages */}

          <div
            className={`w-[114px] ${
              selectedOption === "metric" && is_agriplot ? "block" : "hidden"
            }`}
          >
            <Dropdown options={["Actual", "Potential"]} placeholder="Actual" />
          </div>
          <div className={`${selectedOption === "list" ? "block" : "hidden"}`}>
            <Pagination
              // @ts-ignore
              totalpage={Math.floor(milltabledata.length / 5)}
              changeThePage={changeThePageMill}
            />
          </div>
        </div>

        {selectedDataFormat === "Table" || !showMap ? (
          <div className=" mb-[24px] w-full">
            <TableComp
              tableColumn={tableColumn}
              // @ts-ignore
              tableData={milltabledata}
              map={map}
              component={"mill"}
              height="334px"
              // width="1580px"
              pageSize={5}
              page={pageMill}
            />
          </div>
        ) : null}

        {(selectedDataFormat !== "Table" || !showMap) &&
        selectedDashboardPage === "suppliermill" ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-[10px] lg:gap-[20px] xl:gap-[28px] middle:mb-[24px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white flex items-start rounded-[20px] p-1 w-[200px] md:w-[370px] md:h-[340px] lg:w-[23%] lg:h-[230px]  xl:w-[370px] middle:h-[340px]  "
              >
                <div className="py-2 px-2 flex items-center flex-col w-full h-full justify-between">
                  <div className="flex justify-between items-center w-full ">
                    <h1 className="text-semiBlackText font-semibold md:font-bold text-[12px] middle:text-[18px] p-1">
                      {item.name}
                    </h1>
                    <img
                      className=" cursor-pointer"
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
                    width_={180}
                    height_={180}
                    params_include={false}
                    gradient_start={[25, 96]}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {(selectedDataFormat !== "Table" || !showMap) &&
        selectedDashboardPage === "supplierplantation" ? (
          <div className="flex flex-col middle:flex-row w-full my-1 justify-center  items-center  gap-8">
            {itemplantation.map((item) => (
              <div
                key={item.id}
                className="bg-white relative h-full xl:w-[768px] middle:h-[340px] flex flex-col gap-4 p-3 w-full middle:w-1/2 rounded-[20px]"
              >
                <h1 className="text-semiBlackText font-bold min-w-fit">
                  {item.name}
                </h1>
                <img
                  className="absolute top-2 right-2 cursor-pointer"
                  src="moreinfo.svg"
                  alt=""
                />
                <div className="flex items-center flex-col md:flex-row justify-around  gap-1 md:gap-[10px] lg:gap-20 middle:gap-[40px] xl:gap-20 px-2 py-5">
                  <div>
                    <PieChartComp
                      params={params}
                      data={item}
                      width_={200}
                      height_={200}
                      params_include={true}
                      gradient_start={[159, 83]}
                    />
                  </div>
                  {/* div for those list */}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {(selectedDataFormat === "Table" || !showMap) && is_agriplot ? (
          <>
            {" "}
            <div className=" flex justify-between items-center mb-[24px]">
              <span className="bg-gray">
                Actual registered Supplier Plantaton for {mill_name}:{" "}
                <b>Total :{tableData?.length}</b>
              </span>{" "}
              <Pagination
                // @ts-ignore
                totalpage={Math.floor(tableData.length / 5)}
                changeThePage={changeThePageActualPlant}
              />{" "}
            </div>
            <div className="w-full">
              <TableComp
                // @ts-ignore

                tableColumn={tableColumnRedux}
                // @ts-ignore
                tableData={tableData}
                map={map}
                component={"agriplot"}
                height="300px"
                // width="1566px"
                pageSize={4}
                page={pageActualPlant}
              />{" "}
            </div>
            <div className=" flex justify-between items-center mb-[24px] mt-[24px]">
              <span className="bg-gray">
                Potential registered Supplier Plantaton for {mill_name}:{" "}
                <b>Total :{tabledataPotential?.length}</b>
              </span>{" "}
              <Pagination
                // @ts-ignore
                totalpage={Math.floor(tabledataPotential.length / 5)}
                changeThePage={changeThePagePotentialPlant}
              />{" "}
            </div>
            <div className="w-full">
              <TableComp
                // @ts-ignore

                tableColumn={tableColumnRedux}
                // @ts-ignore
                tableData={tabledataPotential}
                map={map}
                component={"agriplot"}
                height="300px"
                // width="1566px"
                pageSize={4}
                page={pagePotentialPlant}
              />{" "}
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
};
export default SupplierMill;
