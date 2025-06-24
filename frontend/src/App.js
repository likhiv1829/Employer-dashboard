import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import AddEmployeePage from "./pages/AddEmployeePage";
import LoginPage from "./pages/LoginPage";
import HRDashboard from "./pages/HRDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();


  const hideNavbar =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add" element={<AddEmployeePage />} />
          <Route path="/hr/add" element={<AddEmployeePage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/dashboard/hr" element={<HRDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        hideProgressBar={false}
        newestOnTop
        closeOnClick
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
