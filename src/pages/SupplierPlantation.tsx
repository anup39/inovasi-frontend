import { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import MapComponent from "../map/Map";
import Layout from "../components/commoncomp/Layout";
import TableComp from "../components/commoncomp/TableComp";
import TableSingleSelection from "../components/commoncomp/TableSingleSelection";
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

const items_plantation_compliance = [
  {
    id: 1,
    name: "Compliance",
    selected: false,
    distinct: "compliance",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
    listColor: "#E6F542",
    gradient_start: [59, 83],
    params: {
      plantation: "potential",
      status: "Registered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
];

const items_plantation_def_free = [
  {
    id: 1,
    name: "Deforestation Free",
    selected: false,
    distinct: "def_free",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
    listColor: "#70468C",
    gradient_start: [14, 83],
    params: {
      plantation: "potential",
      status: "Registered",
      mill_eq_id: "GML1412",
      geometry_wkt: "",
    },
  },
];

const items_plantation_legal_comp = [
  {
    id: 1,
    name: "Legal Compliance",
    selected: false,
    distinct: "def_free",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48%", "22%", "30%"],
      colors: ["#FB9347", "#FBDE47", "#72E005"],
    },
    listColor: "#70468C",
    gradient_start: [67, 83],
    params: {
      plantation: "potential",
      status: "Registered",
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

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
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
    dispatch(setselectedDashboardPage("supplierplantation"));
  }, [dispatch]);

  const params = {
    estateids: [],
    geometry_wkt: "",
  };
  const theme = createTheme();

  const [showMap, setShowMap] = useState(true);
  const [showMillList, setShowMillList] = useState(true);
  const [showActualList, setShowActualList] = useState(true);
  const [showPotentialList, setShowPotentialList] = useState(true);

  const [selectedOption, setSelectedOption] = useState("list");

  const selectedDashboardPage = useSelector(
    (state: RootState) => state.displaySettings.selectedDashboardPage
  );

  function handleSwitchChange(checked: boolean) {
    setShowMap(checked);
  }
  function handleSwitchChangeMillList(checked: boolean) {
    setShowMillList(checked);
  }
  function handleSwitchChangeActualList(checked: boolean) {
    setShowActualList(checked);
  }
  function handleSwitchChangePotentialList(checked: boolean) {
    setShowPotentialList(checked);
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
          <div
            className={`${
              selectedOption === "list" ? "block" : "hidden"
            } flex items-center justify-between gap-2`}
          >
            {showMillList ? (
              <Pagination
                // @ts-ignore
                totalpage={Math.floor(milltabledata.length / 5)}
                changeThePage={changeThePageMill}
              />
            ) : null}

            {is_agriplot ? (
              <ThemeProvider theme={theme}>
                <SwitchComp
                  label="Mill List"
                  defaultChecked={showMillList}
                  // @ts-ignore
                  onChange={handleSwitchChangeMillList}
                />
              </ThemeProvider>
            ) : null}
          </div>
        </div>

        {(selectedDataFormat === "Table" || !showMap) && showMillList ? (
          <div className=" mb-[24px] w-full">
            <TableSingleSelection
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
        selectedDashboardPage === "supplierplantation" ? (
          <>
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

            <div className="flex flex-col middle:flex-row w-full my-1 justify-center  items-center  gap-8">
              {items_plantation_compliance.map((item) => (
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
              {items_plantation_def_free.map((item) => (
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

            <div className="flex flex-col middle:flex-row w-full my-1 justify-center  items-center  gap-8">
              {items_plantation_legal_comp.map((item) => (
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
          </>
        ) : null}

        {(selectedDataFormat === "Table" || !showMap) && is_agriplot ? (
          <>
            {" "}
            <div className=" flex justify-between items-center mb-[24px]">
              <span className="bg-gray">
                Actual registered Supplier Plantaton for {mill_name}:{" "}
                <b>Total :{tableData?.length}</b>
              </span>{" "}
              <div className="flex items-center gap-2">
                {showActualList ? (
                  <Pagination
                    // @ts-ignore
                    totalpage={Math.floor(tableData.length / 5)}
                    changeThePage={changeThePageActualPlant}
                  />
                ) : null}
                <ThemeProvider theme={theme}>
                  <SwitchComp
                    label="Actual"
                    defaultChecked={showActualList}
                    // @ts-ignore
                    onChange={handleSwitchChangeActualList}
                  />
                </ThemeProvider>
              </div>
            </div>
            <div className="w-full">
              {showActualList ? (
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
                />
              ) : null}
            </div>
            <div className=" flex justify-between items-center mb-[24px] mt-[24px]">
              <span className="bg-gray">
                Potential registered Supplier Plantaton for {mill_name}:{" "}
                <b>Total :{tabledataPotential?.length}</b>
              </span>
              <div className="flex items-center gap-2">
                {showPotentialList ? (
                  <Pagination
                    // @ts-ignore
                    totalpage={Math.floor(tabledataPotential.length / 5)}
                    changeThePage={changeThePagePotentialPlant}
                  />
                ) : null}

                <ThemeProvider theme={theme}>
                  <SwitchComp
                    label="Potential"
                    defaultChecked={showPotentialList}
                    // @ts-ignore
                    onChange={handleSwitchChangePotentialList}
                  />
                </ThemeProvider>
              </div>
            </div>
            <div className="w-full">
              {showPotentialList ? (
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
                />
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
