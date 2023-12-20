import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from '../pages/Login';
import DashBoardHome from "../pages/DashboardHome";
import Register from "../pages/Register";
import Reporting from "../pages/Reporting";
import SupplierPlantation from "../pages/SupplierPlantation";
import SupplierMill from "../pages/SupplierMill";
import HomePage from "../pages/HomePage";
import Upload from "../pages/Upload";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AboutUs from "../pages/AboutUs";
import GetInTouch from "../pages/GetInTouch";

interface RoutersProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}
const Routers: React.FC<RoutersProps> = ({ map, onSetMap }) => {
  // Example Routers component
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />;
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<DashBoardHome map={map} onSetMap={onSetMap} />}
          />
          <Route
            path="/suppliermill"
            element={<SupplierMill map={map} onSetMap={onSetMap} />}
          />
          <Route
            path="/supplierplantation"
            element={<SupplierPlantation map={map} onSetMap={onSetMap} />}
          /> */}
          <Route
            path="/reporting"
            element={<Reporting map={map} onSetMap={onSetMap} />}
          />
          <Route path="/upload" element={<Upload />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/getintouch" element={<GetInTouch />} />
        </Routes>
      </Router>
    );
  }
};
export default Routers;
