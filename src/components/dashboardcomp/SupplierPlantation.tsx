import Dropdown from '../commoncomp/Dropdown';
import Layout from '../commoncomp/Layout';
// import MapSection from '../../pages/MapSection';
// import pie_chart_api from "../../utils/constants";
// import PieChart from "./PieChart";
// import Pagination from '../commoncomp/PageNumbers';
import MapSection from '../../pages/MapSection';
import { Map } from 'maplibre-gl'; // Import 'Map' from 'maplibre-gl'
import Pagination from '../commoncomp/Pagination';

interface SupplierPlantationProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const SupplierPlantation: React.FC<SupplierPlantationProps> = ({
  map,
  onSetMap,
}) => {
  const optionsReporting = ['Metric', 'Mill Supplier'];

  return (
    <Layout>
      <div className='flex flex-col h-[90vh]'>
        <div className='flex-1'>
          <MapSection map={map} onSetMap={onSetMap} />
        </div>
        {/* <div className='h-32'>
        <MapSection />
      </div> */}
        <div className='mx-4 my-3 flex justify-between items-center'>
          <Dropdown options={optionsReporting} placeholder='Metric' />
          <Pagination totalPages={50} />
        </div>
        {/* <div className="space-x-4  flex">
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supply Base Region</h1>
          <PieChart
            data={pie_chart_api.supplybaseregion}
            width_={300}
            height_={300}
          />
        </div>

        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Type</h1>
          <PieChart
            data={pie_chart_api.rspocertified}
            width_={300}
            height_={300}
          />
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">RSPO Certified</h1>
          <PieChart
            data={pie_chart_api.suppliertype}
            width_={300}
            height_={300}
          />
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Risk</h1>
          <PieChart
            data={pie_chart_api.supplybaseregion}
            width_={300}
            height_={300}
          />
        </div>
      </div> */}
      </div>
    </Layout>
  );
};
export default SupplierPlantation;
