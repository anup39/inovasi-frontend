import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from '../pages/Login';
import DashBoard from "../pages/Dashboard";
import Register from "../pages/Register";
import Reporting from "../pages/Reporting";
import SupplierPlantation from "../components/dashboardcomp/SupplierPlantation";
import SupplierMill from "../components/dashboardcomp/SupplierMill";
import HomePage from "../pages/HomePage";
import Upload from "../pages/Upload";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/suppliermill" element={<SupplierMill />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/supplierplantation" element={<SupplierPlantation />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}
