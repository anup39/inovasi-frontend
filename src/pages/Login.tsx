// #Note Use Tailewind classes anywhere already configured
import { useNavigate } from 'react-router-dom';
import DashBoard from '../components/DashBoard';
import MapContainer from '../components/MapContainer';
import Layout from './Layout';

export default function Login() {
  const navigate = useNavigate();
  return (
    <Layout>
      <DashBoard />
      <MapContainer />
      {/* <h1 className='text-1xl '>Login page</h1> */}

      {/* <div className='flex'>
        <button
          className='text-3xl font-bold underline text-blue-600'
          onClick={() => navigate('/map')}
        >
          Go To Map
        </button>
        <button
          className='text-3xl font-bold underline text-red-900'
          onClick={() => navigate('/dashboard')}
        >
          Dashborad
        </button>
        <button
          className='text-3xl font-bold underline text-green-600'
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div> */}
    </Layout>
  );
}
