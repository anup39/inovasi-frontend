import MapComponent from "../map/Map";
import Layout from "../components/commoncomp/Layout";
import { Map } from "maplibre-gl";

interface ReportingProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const Reporting: React.FC<ReportingProps> = ({ map, onSetMap }) => {
  return (
    <div className="overflow-hidden ">
      <Layout>
        <div className="pt-7">
          <MapComponent map={map} onSetMap={onSetMap} component="reporting" />
        </div>
      </Layout>
    </div>
  );
};
export default Reporting;
