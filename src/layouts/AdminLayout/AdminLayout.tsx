import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-container">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-name">Customer Web Builds</span>
            <span className="brand-tag">Admin</span>
          </div>
          <button className="mobile-close-btn" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/website-plans"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📄</span>
            <span className="nav-text">Website Plans</span>
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Bookings</span>
          </NavLink>

          <NavLink
            to="/admin/slots"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">⏰</span>
            <span className="nav-text">Time Slots</span>
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user-info">
            <div className="user-avatar">
              {admin?.email ? admin.email.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="user-details">
              <span className="user-email">{admin?.email || "Admin"}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-navbar">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="navbar-title">Admin Management Portal</div>
          <div className="navbar-actions">
            <div className="admin-badge">
              <span className="pulse-dot"></span>
              Logged in as {admin?.email}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout 🚪
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content-view">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
