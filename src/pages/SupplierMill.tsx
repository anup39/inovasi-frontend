import { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../maputils/AddSourceAndLayer";
import MapComponent from "../map/Map";
import PieChartComp from "../components/commoncomp/PieChartComp";
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
import { FormControlLabel, Switch } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwitchComp from "../components/commoncomp/SwitchComp";

const items = [
  {
    id: 1,
    name: "Deforestation Risk",
    selected: false,
    distinct: "mill_deforestation_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48", "22%", "30%"],
    },
  },
  {
    id: 2,
    name: "Legal PRF Risk",
    selected: false,
    distinct: "mill_legal_prf_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48", "22%", "30%"],
    },
  },
  {
    id: 3,
    name: "Legal Landuse Risk",
    selected: false,
    distinct: "mill_legal_landuse_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2", "Category 3"],
      numbers: ["48", "22%", "30%"],
    },
  },
  {
    id: 4,
    name: "Complex Supplybase Risk",
    selected: false,
    distinct: "mill_complex_supplybase_risk",
    lowerBoxes: {
      title: ["Category 1", "Category 2"],
      numbers: ["48", "22%"],
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
  const [selectedOption, setSelectedOption] = useState("metric");

  function handleSwitchChange(checked) {
    setShowMap(checked);
  }
  function handleMetricChange(option) {
    setSelectedOption(option);
  }
  const pageHeight = `calc(100vh - 50px)`;
  return (
    <Layout>
      <Toast />

      <div className="flex flex-col" style={{ height: pageHeight }}>
        <div className="flex items-center justify-end px-10">
          <ThemeProvider theme={theme}>
            <SwitchComp
              label="Map"
              defaultChecked={showMap}
              onChange={handleSwitchChange}
            />
          </ThemeProvider>
        </div>
        <div
          className={`my-1 mx-2 ${
            showMap ? "block" : "hidden"
          } flex-1 min-h-[300px]`}
        >
          <MapComponent map={map} onSetMap={onSetMap} component={"mill"} />
        </div>
        <div
          className={`flex my-2 p-2 mx-2 gap-2 transition-all ease-in delay-100 ${
            showMap ? "block" : "hidden"
          } bg-white w-[500px] rounded-lg`}
        >
          <div
            onClick={() => handleMetricChange("metric")}
            className={`transition-all ease-in delay-75 rounded-lg ${
              selectedOption === "metric"
                ? "w-2/3 bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white"
                : "w-1/2 bg-lightGray rounded-lg"
            } py-2 text-center cursor-pointer`}
          >
            Metric
          </div>
          <div
            onClick={() => handleMetricChange("list")}
            className={` rounded-lg ${
              selectedOption === "list"
                ? "w-2/3 bg-gradient-to-r from-[#02C685] to-[#8ADF5E] text-white"
                : "w-1/2 bg-bgLightGray"
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
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white flex rounded-lg ">
                <div className="py-2 px-5 flex items-center flex-col">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-black font-bold p-1">{item.name}</h1>
                    <img className="scale-50" src="moreinfo.svg" alt="" />
                  </div>
                  <PieChartComp
                    params={params}
                    data={item}
                    width_={200}
                    height_={200}
                    params_include={false}
                  />
                  <div className="h-0.5 bg-boxDivider pb-1 items-center w-full"></div>
                  <div className="flex items-center justify-between">
                    {item.lowerBoxes.title.map((title, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center px-1 ${
                          index < item.lowerBoxes.title.length - 1
                            ? "border-r-[4px] border-boxDivider"
                            : ""
                        }`}
                      >
                        <p>{item.lowerBoxes.numbers[index]}</p>
                        <p>{title}</p>
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
