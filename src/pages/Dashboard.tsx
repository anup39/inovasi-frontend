import Layout from '../components/commoncomp/Layout';
import DashBoardItem from '../components/dashboardcomp/DashBoardItem';
import MapSection from './MapSection';
import { Map } from 'maplibre-gl'; // Import 'Map' from 'maplibre-gl'

interface DashboardProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const DashBoard: React.FC<DashboardProps> = ({ map, onSetMap }) => {
  return (
    <div className='flex flex-col h-screen'>
      <Layout>
        <DashBoardItem map={map} />
        {/* flex-1 will allow us to take all remaining height without overflowing */}
        <div className=' overflow-hidden flex-1'>
          <MapSection map={map} onSetMap={onSetMap} />
        </div>
      </Layout>{' '}
    </div>
  );
};

export default DashBoard;
