import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar glass-panel animate-fade-in">
      <div className="nav-brand">
        <img src="/src/assets/logo.png" alt="EmpManage Logo" style={{ height: '40px', width: 'auto' }} />
        <span>EmpManage</span>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          Home
        </NavLink>
        <NavLink
          to="/portal"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <UserPlus size={20} />
          Portal
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <ShieldCheck size={20} />
          Admin
        </NavLink>
      </div>
    </nav>
  );
}
