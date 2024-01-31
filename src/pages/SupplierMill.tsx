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
  const selectedPlantationType = useSelector(
    (state: RootState) => state.displaySettings.selectedPlantationType
  );

  const milltabledata = useSelector(
    (state: RootState) => state.supplierPlantation.milltabledata
  );

  const changeThePageMill = (evpage: number) => {
    setPageMill(evpage);
  };

  const selectedDataFormat = useSelector(
    (state: RootState) => state.displaySettings.selectedDataFormat
  );
  const is_agriplot = useSelector(
    (state: RootState) => state.displaySettings.is_agriplot
  );

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
          trace: false,
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
          trace: false,
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
      </div>
    </Layout>
  );
};
export default SupplierMill;
