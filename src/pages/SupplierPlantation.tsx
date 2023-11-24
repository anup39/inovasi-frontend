import Dropdown from "../components/commoncomp/Dropdown";
import Layout from "../components/commoncomp/Layout";
import MapSection from "./MapSection";
import { Map } from "maplibre-gl";
import Pagination from "../components/commoncomp/Pagination";

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
  const optionsReporting = ["Metric", "Mill Supplier"];

  return (
    <Layout>
      <div className="flex flex-col h-[90vh]">
        <div className="flex-1">
          <MapSection
            map={map}
            onSetMap={onSetMap}
            component="supplier-plantation"
          />
        </div>

        <div className="mx-4 my-3 flex justify-between items-center">
          <Dropdown options={optionsReporting} placeholder="Metric" />
          <Pagination totalPages={50} />
        </div>
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
