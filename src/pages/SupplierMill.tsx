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
import { settabledata } from "../reducers/SupplierPlantation";
import { setpiechartfor } from "../reducers/Auth";
import { setselectedDataFormat } from "../reducers/DisplaySettings";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwitchComp from "../components/commoncomp/SwitchComp";
// import LineBar from "../components/commoncomp/LineBar";
import PieChartComp from "../components/commoncomp/PieChartComp";
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

  const selectedDataFormat = useSelector(
    (state: RootState) => state.displaySettings.selectedDataFormat
  );

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
          image_path: "mill.png",
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
      dispatch(settabledata(res.data));
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

  const pageHeight = `calc(100vh - 60px)`;

  return (
    <Layout>
      <Toast />
      <div className="flex flex-col h-screen ">
        <div className="flex items-center justify-end px-10">
          <ThemeProvider theme={theme}>
            <SwitchComp
              label="Map"
              defaultChecked={showMap}
              // @ts-ignore
              onChange={handleSwitchChange}
            />
          </ThemeProvider>
        </div>
        <div
          className={`my-1  ${
            showMap ? "block" : "hidden"
          } flex-1 min-h-[250px]`}
        >
          <MapComponent map={map} onSetMap={onSetMap} component={"mill"} />
        </div>
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
        {selectedDataFormat && selectedDataFormat === "Table" ? (
          <>
            <TableComp
              tableColumn={tableColumn}
              // @ts-ignore
              tableData={tableData}
              map={map}
              component={"mill"}
            />
          </>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 px-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white flex items-start rounded-lg lg:w-1/4 w-[270px] md:w-[290px]  "
              >
                <div className="py-2 px-2 flex items-center flex-col w-full">
                  <div className="flex justify-between items-center w-full">
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
                    width_={200}
                    height_={200}
                    params_include={false}
                  />
                  <div
                    style={{ height: "0.7px" }}
                    className="bg-boxDivider mb-1 w-full"
                  ></div>
                  <div className="flex w-full max-h-full">
                    {item.lowerBoxes.title.map((title, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center ${
                          index < item.lowerBoxes.title.length - 1
                            ? "border-r-[0.7px] border-boxDivider mx-auto"
                            : ""
                        } ${
                          item.lowerBoxes.title.length === 2 ? "w-1/2" : "w-1/3"
                        }`}
                      >
                        <p
                          style={{ color: item.lowerBoxes.colors[index] }}
                          className="font-semibold "
                        >
                          {item.lowerBoxes.numbers[index]}
                        </p>
                        <p className="text-xs">{title}</p>
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
export default SupplierMill;
