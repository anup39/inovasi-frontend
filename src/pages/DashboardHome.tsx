import Layout from "../components/commoncomp/Layout";
import DashBoardItem from "../components/dashboardcomp/DashBoardItem";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";
import Toast from "../components/commoncomp/Toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setpiechartfor } from "../reducers/Auth";
import { setselectedDataFormat } from "../reducers/DisplaySettings";
import { IControl } from "maplibre-gl";

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

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        console.log(map._controls);
        const legend_control: IControl =
          map._controls[map._controls.length - 2];
        console.log(legend_control, "legend control");
        // @ts-ignore
        legend_control.updateLegend("dashboard");
      });
    }
  }, [map]);

  return (
    <Layout>
      <div className=" ">
        <Toast />
        <DashBoardItem map={map} />
        <div className="pt-[10px] md:pt-[26px] pb-[10px] md:pb-[34px] ">
          <MapComponent map={map} onSetMap={onSetMap} component="dashboard" />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
