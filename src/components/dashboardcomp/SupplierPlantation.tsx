import Dropdown from "../commoncomp/Dropdown";
import Layout from "../commoncomp/Layout";
// import MapSection from '../../pages/MapSection';
import pie_chart_api from "../../utils/constants";
import PieChart from "./PieChart";
// import Pagination from '../commoncomp/PageNumbers';
import MapSection from "../../pages/MapSection";

function SupplierPlantation() {
  const optionsReporting = ["Metric", "Mill Supplier"];

  return (
    <Layout>
      <MapSection />
      {/* <div className='h-32'>
        <MapSection />
      </div> */}
      <div className="mx-4 my-3">
        <Dropdown options={optionsReporting} placeholder="Metric" />
      </div>
      <div className="space-x-4  flex">
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
      </div>
    </Layout>
  );
}
export default SupplierPlantation;
