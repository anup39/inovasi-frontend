import { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import MapSection from "../../pages/MapSection";
import PieChartComp from "./PieChartComp";
import Layout from "../commoncomp/Layout";
// import SimpleTable from "./Table";
import TableComp from "./TableComp";
// import MapSection from '../../pages/MapSection';
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'
import { useSelector } from "react-redux";
import axios from "axios";

const items = [
  {
    id: 1,
    name: "Supply Base Region",
    selected: false,
    distinct: "country",
  },
  {
    id: 2,
    name: "Supplier Type",
    selected: false,
    distinct: "type",
  },
  {
    id: 3,
    name: "RSPO Certified",
    selected: false,
    distinct: "rspo",
  },
];

interface SupplierMillProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const SupplierMill: React.FC<SupplierMillProps> = ({ map, onSetMap }) => {
  const [tableColumn, settableColumn] = useState([]);
  const [tableData, settableData] = useState([]);

  const selectedDataFormat = useSelector(
    (state) => state.displaySettings.selectedDataFormat
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
            fill_opacity: 0,
            stroke_color: "",
          },
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          fillType: "point",
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
      settableData(res.data);
    });
  }, []);

  return (
    <Layout>
      <div className="mt-4 mb-2">
        <MapSection map={map} onSetMap={onSetMap} component={"mill"} />
      </div>
      {selectedDataFormat && selectedDataFormat === "Supplier Mill" ? (
        <>
          <TableComp tableColumn={tableColumn} tableData={tableData} />
        </>
      ) : (
        // <div className="flex flex-col w-1/2 items-center justify  py-7 gap-8 lg:flex-row">
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="bg-white mx-8">
              <div>
                <div className="p-2">
                  <h1 className="text-black font-bold">{item.name}</h1>

                  <PieChartComp data={item} width_={200} height_={200} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};
export default SupplierMill;
