import Layout from "../components/commoncomp/Layout";
import DashBoardItem from "../components/dashboardcomp/DashBoardItem";
import MapComponent from "../map/Map";
import { Map } from "maplibre-gl";

interface DashboardHomeProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ map, onSetMap }) => {
  return (
    <div className="flex flex-col h-screen">
      <Layout>
        <DashBoardItem map={map} />
        <div className=" overflow-hidden flex-1">
          <MapComponent map={map} onSetMap={onSetMap} component="dashboard" />
        </div>
      </Layout>
    </div>
  );
};

export default DashboardHome;
