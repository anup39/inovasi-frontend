import MapContainer from "../components/MapContainer";
// import Table from "../components/Table";
import MetricContainer from "../components/metricSupplier/MetricContainer";
import Layout from "./Layout";
import SearchButton from "./SearchButton";

function MetricSupplier() {
  return (
    <Layout>
      <div className="relative">
        <div className="absolute right-10 top-10">
          <SearchButton />
        </div>
        <MapContainer />
      </div>

      <select className="bg-white px-3 pr-8 py-2 ml-3 rounded-sm" name="" id="">
        {/* Need to add options here */}
        <option className="px-3" value="Metric">
          Metric
        </option>
        <option className="px-3" value="Metric">
          Mill Supplier
        </option>
      </select>
      <MetricContainer />
      {/* <Table /> */}
    </Layout>
  );
}
export default MetricSupplier;
