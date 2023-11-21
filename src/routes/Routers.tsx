import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from '../pages/Login';
import DashBoard from '../pages/Dashboard';
import Register from '../pages/Register';
import Reporting from '../pages/Reporting';
import SupplierPlantation from '../components/dashboardcomp/SupplierPlantation';
import SupplierMill from '../components/dashboardcomp/SupplierMill';
import HomePage from '../pages/HomePage';
import Upload from '../pages/Upload';
import { Map } from 'maplibre-gl'; // Import 'Map' from 'maplibre-gl'
import { useEffect } from 'react';
import Login from '../pages/LoginPage';

interface RoutersProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const Routers: React.FC<RoutersProps> = ({ map, onSetMap }) => {
  useEffect(() => {});
  // Example Routers component
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard'
          element={<DashBoard map={map} onSetMap={onSetMap} />}
        />
        <Route
          path='/suppliermill'
          element={<SupplierMill map={map} onSetMap={onSetMap} />}
        />

        <Route
          path='/supplierplantation'
          element={<SupplierPlantation map={map} onSetMap={onSetMap} />}
        />
        <Route
          path='/reporting'
          element={<Reporting map={map} onSetMap={onSetMap} />}
        />
        <Route path='/register' element={<Register />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </Router>
  );
};
export default Routers;
