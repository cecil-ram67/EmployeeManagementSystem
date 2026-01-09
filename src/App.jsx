import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import EmployeePortal from "./pages/EmployeePortal";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('admin_auth') === 'true';
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      }} />
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/portal" element={<EmployeePortal />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
