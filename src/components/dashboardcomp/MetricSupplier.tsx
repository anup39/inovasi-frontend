import MapContainer from '../MapContainer';
import Table from './Table';
import MetricContainer from './SupplierPlantation';
import Layout from '../commoncomp/Layout';
import SearchButton from '../../pages/SearchButton';

function MetricSupplier() {
  return (
    <Layout>
      <div className='relative'>
        <div className='absolute right-10 top-10'>
          <SearchButton />
        </div>
        <MapContainer />
      </div>

      <select className='bg-white px-3 pr-8 py-2 ml-3 rounded-sm' name='' id=''>
        {/* Need to add options here */}
        <option className='px-3' value='Metric'>
          Metric
        </option>
        <option className='px-3' value='Metric'>
          Mill Supplier
        </option>
      </select>
      <MetricContainer />
      <Table />
    </Layout>
  );
}
export default MetricSupplier;
