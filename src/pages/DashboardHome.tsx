import Layout from "../components/commoncomp/Layout";
import DashBoardItem from "../components/dashboardcomp/DashBoardItem";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import Toast from "../components/commoncomp/Toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setpiechartfor } from "../reducers/Auth";
import { setselectedDataFormat } from "../reducers/DisplaySettings";

interface DashboardHomeProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ map, onSetMap }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setpiechartfor("facility"));
    dispatch(setselectedDataFormat("Metric"));
  }, [dispatch]);

  // useEffect(() => {
  //   if (map) {
  //     const legend_name: string = "LegendControl";
  //     // @ts-ignore
  //     const legend_index = map._controls.indexOf(legend_name);

  //     if (legend_index) {
  //       const legend_control = map._controls[map._controls.length - 3];
  //       // @ts-ignore
  //       legend_control.updateLegend("dashboard");
  //     }
  //   }
  // }, []);
  // const pageHeight = `calc(100vh - 60px)`;
  return (
    <Layout>
      <div className="flex flex-col ">
        <Toast />
        <DashBoardItem map={map} />
        <div className=" flex-1 pt-[26px] ">
          <MapComponent map={map} onSetMap={onSetMap} component="dashboard" />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
