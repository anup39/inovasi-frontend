import MapSection from "../../pages/MapSection";
import Dropdown from "../commoncomp/Dropdown";
import Layout from "../commoncomp/Layout";
import SimpleTable from "./Table";
// import MapSection from '../../pages/MapSection';

function SupplierMill() {
  const optionsReporting = ["Metric", "Mill Supplier"];

  return (
    <Layout>
      <div className="mt-4">
        <MapSection />
      </div>
      <div className="mx-4 my-3">
        <Dropdown options={optionsReporting} placeholder="Metric" />
      </div>
      <div className="space-x-4  flex">
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supply Mill Region</h1>
          {/* Add piechart here */}
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Type</h1>
          {/* Add piechart here */}
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">RSPO Certified</h1>
          {/* Add piechart here */}
        </div>
        <div className="rounded-sm bg-white w-1/4 py-3 px-4">
          <h1 className="font-semibold">Supplier Risk</h1>
          {/* Add piechart here */}
        </div>
      </div>
      <SimpleTable />
    </Layout>
  );
}
export default SupplierMill;
