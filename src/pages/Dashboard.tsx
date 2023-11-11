import Layout from '../components/commoncomp/Layout';
import DashBoardItem from '../components/dashboardcomp/DashBoardItem';
import MapSection from './MapSection';

export default function Dashboard() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Layout>
        <DashBoardItem />
        <div className=' overflow-hidden bg=[#F0EFF]'>
          <MapSection />
        </div>
      </Layout>{' '}
    </div>
  );
}
