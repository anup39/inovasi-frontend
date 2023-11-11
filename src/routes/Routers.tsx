import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from '../pages/Login';
import DashBoard from "../pages/Dashboard";
import Register from "../pages/Register";
import Reporting from "../components/dashboardcomp/Reporting";
import SupplierPlantation from "../components/dashboardcomp/SupplierPlantation";
import Dropdown from "../components/dashboardcomp/Dropdown";
import SupplierMill from "../components/dashboardcomp/SupplierMill";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/supplierplantation" element={<SupplierPlantation />} />
        <Route path="/suppliermill" element={<SupplierMill />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/drop" element={<Dropdown />} />
      </Routes>
    </Router>
  );
}
