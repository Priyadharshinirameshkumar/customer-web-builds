import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import {
  getAdminBookings,
  getDashboardSummary,
  getWebsitePlans,
} from "../../../services/admin.service";
import type {
  DashboardSummary,
  AdminBookingItem,
  WebsitePlanItem,
} from "../../../services/admin.service";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentBookings, setRecentBookings] = useState<AdminBookingItem[]>([]);
  const [recentPlans, setRecentPlans] = useState<WebsitePlanItem[]>([]);
  const [totalPlans, setTotalPlans] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryData, bookingsData, plansData] = await Promise.all([
        getDashboardSummary(),
        getAdminBookings(),
        getWebsitePlans(),
      ]);
      setSummary(summaryData);
      setRecentBookings(bookingsData.slice(0, 5));
      setRecentPlans(plansData.slice(0, 5));
      setTotalPlans(plansData.length);
      setTotalBookings(bookingsData.length);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <p className="dashboard-subtitle">A minimal overview of your platform.</p>
          </div>
          <button className="refresh-btn" onClick={fetchData} disabled={loading}>
            🔄 Refresh Data
          </button>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        {loading ? (
          <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading dashboard metrics...</p>
          </div>
        ) : (
          <>
            {/* Dashboard Metric Cards */}
            <div className="cards-grid">
              <div className="summary-card">
                <div className="card-header">
                  <span className="card-title">Total Website Plans</span>
                  <span className="card-icon">📄</span>
                </div>
                <div className="card-value">{totalPlans}</div>
                <div className="card-subtitle">Submitted plans</div>
              </div>

              <div className="summary-card">
                <div className="card-header">
                  <span className="card-title">Total Bookings</span>
                  <span className="card-icon">📅</span>
                </div>
                <div className="card-value">{totalBookings}</div>
                <div className="card-subtitle">Scheduled consultations</div>
              </div>

              <div className="summary-card">
                <div className="card-header">
                  <span className="card-title">Available Time Slots</span>
                  <span className="card-icon">🟢</span>
                </div>
                <div className="card-value">{summary?.availableSlots ?? 0}</div>
                <div className="card-subtitle">Open calendar slots</div>
              </div>

              <div className="summary-card">
                <div className="card-header">
                  <span className="card-title">Pending Bookings</span>
                  <span className="card-icon">⏳</span>
                </div>
                <div className="card-value">{summary?.pendingBookings ?? 0}</div>
                <div className="card-subtitle">Awaiting approval</div>
              </div>
            </div>

            {/* Recent Sections layout */}
            <div className="dashboard-sections-grid">
              {/* Recent Website Plans */}
              <div className="recent-activity-section">
                <div className="section-header">
                  <h2>Recent Website Plans</h2>
                  <Link to="/admin/website-plans" className="view-all-link">
                    View All →
                  </Link>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Business</th>
                        <th>Size</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPlans.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="empty-state">
                            No website plans found.
                          </td>
                        </tr>
                      ) : (
                        recentPlans.map((p) => (
                          <tr key={p.id}>
                            <td className="font-semibold">{p.fullName}</td>
                            <td>{p.businessName}</td>
                            <td>
                              <span className="plan-badge">{p.websiteSize}</span>
                            </td>
                            <td className="date-cell">
                              {new Date(p.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="recent-activity-section">
                <div className="section-header">
                  <h2>Recent Bookings</h2>
                  <Link to="/admin/bookings" className="view-all-link">
                    View All →
                  </Link>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Meeting Date</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="empty-state">
                            No recent bookings found.
                          </td>
                        </tr>
                      ) : (
                        recentBookings.map((b) => (
                          <tr key={b.id}>
                            <td className="font-semibold">{b.fullName}</td>
                            <td>
                              {b.preferredDate} at {b.preferredTime}
                            </td>
                            <td>{b.meetingMethod}</td>
                            <td>
                              <span className={`status-badge badge-${b.status.toLowerCase()}`}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
