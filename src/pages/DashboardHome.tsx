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
  return (
    <div className="flex flex-col h-screen">
      <Layout>
        <Toast />
        <DashBoardItem map={map} />
        <div className=" overflow-hidden flex-1">
          <MapComponent map={map} onSetMap={onSetMap} component="dashboard" />
        </div>
      </Layout>
    </div>
  );
};

export default DashboardHome;
