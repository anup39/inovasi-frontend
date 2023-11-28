import MapComponent from "../map/Map";
import Layout from "../components/commoncomp/Layout";
import { Map } from "maplibre-gl";

interface ReportingProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const Reporting: React.FC<ReportingProps> = ({ map, onSetMap }) => {
  return (
    <div>
      <Layout>
        <div className="my-7 mx-4 bg-gray-200 rounded-sm border shadow-sm border-gray-400">
          <div className="py-5 px-2">
            <h1>Reporting Form</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Reporting;
