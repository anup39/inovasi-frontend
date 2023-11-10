import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import MapSection from "../pages/MapSection";
import DashBoard from "../pages/Dashboard";
import Register from "../pages/Register";
import MetricSupplier from "../pages/MetricSupplier";
// import MapOnly from "../pages/MapOnly";
import Reporting from "../components/dashboardcomp/Reporting";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/register" element={<Register />} />
        <Route path="/metric" element={<MetricSupplier />} />
        <Route path="/map" element={<MapSection />} />
      </Routes>
    </Router>
  );
}
