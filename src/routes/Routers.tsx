import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import MapSection from '../pages/MapSection';
import DashBoard from '../pages/Dashboard';
import Register from '../pages/Register';

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/map' element={<MapSection />} />
      </Routes>
    </Router>
  );
}
