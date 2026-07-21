import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { useAuth } from "../../../context/AuthContext";
import "./Profile.css";

const ProfilePage: React.FC = () => {
  const { admin, logout } = useAuth();

  return (
    <AdminLayout>
      <div className="profile-page-container">
        <div className="page-header">
          <div>
            <h1>Admin Profile</h1>
            <p>Account details and active session security configuration.</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-header-banner">
            <div className="profile-avatar-large">
              {admin?.email ? admin.email.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="profile-header-info">
              <h2>System Administrator</h2>
              <span className="badge-active">Active Session 🟢</span>
            </div>
          </div>

          <div className="profile-details-grid">
            <div className="profile-item">
              <label>Administrator ID</label>
              <div className="profile-value">#{admin?.id || 1}</div>
            </div>

            <div className="profile-item">
              <label>Email Address</label>
              <div className="profile-value">{admin?.email}</div>
            </div>

            <div className="profile-item">
              <label>Access Role</label>
              <div className="profile-value">Super Admin</div>
            </div>

            <div className="profile-item">
              <label>Authentication Method</label>
              <div className="profile-value">JWT + Bcrypt Password Hash</div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="logout-btn-large" onClick={logout}>
              Sign Out of Session 🚪
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;
