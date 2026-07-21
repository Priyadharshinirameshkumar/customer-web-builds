import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import {
  getAdminBookings,
  getDashboardSummary,
} from "../../../services/admin.service";
import type {
  DashboardSummary,
  AdminBookingItem,
} from "../../../services/admin.service";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentBookings, setRecentBookings] = useState<AdminBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryData, bookingsData] = await Promise.all([
        getDashboardSummary(),
        getAdminBookings(),
      ]);
      setSummary(summaryData);
      setRecentBookings(bookingsData.slice(0, 5));
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
            <h1>Dashboard Overview</h1>
            <p>Welcome to your Customer Web Builds administration center.</p>
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
              <div className="summary-card card-today">
                <div className="card-header">
                  <span className="card-title">Today's Bookings</span>
                  <span className="card-icon">📅</span>
                </div>
                <div className="card-value">{summary?.todayBookings ?? 0}</div>
                <div className="card-subtitle">Scheduled for today</div>
              </div>

              <div className="summary-card card-pending">
                <div className="card-header">
                  <span className="card-title">Pending</span>
                  <span className="card-icon">⏳</span>
                </div>
                <div className="card-value">{summary?.pendingBookings ?? 0}</div>
                <div className="card-subtitle">Awaiting confirmation</div>
              </div>

              <div className="summary-card card-confirmed">
                <div className="card-header">
                  <span className="card-title">Confirmed</span>
                  <span className="card-icon">✅</span>
                </div>
                <div className="card-value">{summary?.confirmedBookings ?? 0}</div>
                <div className="card-subtitle">Approved & scheduled</div>
              </div>

              <div className="summary-card card-cancelled">
                <div className="card-header">
                  <span className="card-title">Cancelled</span>
                  <span className="card-icon">❌</span>
                </div>
                <div className="card-value">{summary?.cancelledBookings ?? 0}</div>
                <div className="card-subtitle">Cancelled bookings</div>
              </div>

              <div className="summary-card card-available">
                <div className="card-header">
                  <span className="card-title">Available Slots</span>
                  <span className="card-icon">🟢</span>
                </div>
                <div className="card-value">{summary?.availableSlots ?? 0}</div>
                <div className="card-subtitle">Open for client booking</div>
              </div>

              <div className="summary-card card-booked">
                <div className="card-header">
                  <span className="card-title">Booked Slots</span>
                  <span className="card-icon">🔒</span>
                </div>
                <div className="card-value">{summary?.bookedSlots ?? 0}</div>
                <div className="card-subtitle">Reserved time slots</div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="recent-activity-section">
              <div className="section-header">
                <h2>Recent Bookings</h2>
                <Link to="/admin/bookings" className="view-all-link">
                  View All Bookings →
                </Link>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client Name</th>
                      <th>Company</th>
                      <th>Preferred Date & Time</th>
                      <th>Meeting Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="empty-state">
                          No recent bookings found.
                        </td>
                      </tr>
                    ) : (
                      recentBookings.map((b) => (
                        <tr key={b.id}>
                          <td>#{b.id}</td>
                          <td className="font-semibold">{b.fullName}</td>
                          <td>{b.companyName}</td>
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
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
