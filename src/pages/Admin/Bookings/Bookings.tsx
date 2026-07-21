import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import {
  cancelBooking,
  confirmBooking,
  deleteBooking,
  getAdminBookings,
} from "../../../services/admin.service";
import type { AdminBookingItem } from "../../../services/admin.service";
import "./Bookings.css";

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<AdminBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Filters & Search State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"date_desc" | "date_asc" | "id_desc">("date_desc");

  // Selected Booking for Modal Details
  const [selectedBooking, setSelectedBooking] = useState<AdminBookingItem | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAdminBookings();
      setBookings(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = async (id: number) => {
    if (!window.confirm(`Are you sure you want to CONFIRM booking #${id}?`)) return;
    try {
      setActionLoading(id);
      const updated = await confirmBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      if (selectedBooking?.id === id) setSelectedBooking(updated);
    } catch (err: unknown) {
      alert("Failed to confirm booking.");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm(`Are you sure you want to CANCEL booking #${id}?`)) return;
    try {
      setActionLoading(id);
      const updated = await cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      if (selectedBooking?.id === id) setSelectedBooking(updated);
    } catch (err: unknown) {
      alert("Failed to cancel booking.");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to DELETE booking #${id}? This action cannot be undone.`)) return;
    try {
      setActionLoading(id);
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
    } catch (err: unknown) {
      alert("Failed to delete booking.");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter & Sort Logic
  const processedBookings = bookings
    .filter((b) => {
      const matchesSearch =
        b.fullName.toLowerCase().includes(search.toLowerCase()) ||
        b.companyName.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase()) ||
        b.phone.includes(search);
      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "date_asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return b.id - a.id;
    });

  return (
    <AdminLayout>
      <div className="bookings-page-container">
        <div className="page-header">
          <div>
            <h1>Bookings Management</h1>
            <p>Search, filter, view, confirm, or cancel client consultation bookings.</p>
          </div>
          <button className="refresh-btn" onClick={fetchBookings} disabled={loading}>
            🔄 Refresh Bookings
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {/* Search, Filters, and Sorting Toolbar */}
        <div className="filter-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by client, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Filter Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Only</option>
              <option value="CONFIRMED">Confirmed Only</option>
              <option value="CANCELLED">Cancelled Only</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date_desc" | "date_asc" | "id_desc")}
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="id_desc">ID (High to Low)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading bookings list...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Company</th>
                  <th>Preferred Date & Time</th>
                  <th>Budget</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="empty-state">
                      No bookings matching your criteria.
                    </td>
                  </tr>
                ) : (
                  processedBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>
                        <div className="font-semibold">{booking.fullName}</div>
                        <small className="text-muted">{booking.email}</small>
                      </td>
                      <td>{booking.companyName}</td>
                      <td>
                        <div>{booking.preferredDate}</div>
                        <small className="text-muted">{booking.preferredTime}</small>
                      </td>
                      <td>{booking.budget}</td>
                      <td>{booking.meetingMethod}</td>
                      <td>
                        <span className={`status-badge badge-${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          <button
                            className="btn-action btn-view"
                            title="View Details"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            👁️
                          </button>

                          {booking.status !== "CONFIRMED" && (
                            <button
                              className="btn-action btn-confirm"
                              title="Confirm Booking"
                              disabled={actionLoading === booking.id}
                              onClick={() => handleConfirm(booking.id)}
                            >
                              ✅
                            </button>
                          )}

                          {booking.status !== "CANCELLED" && (
                            <button
                              className="btn-action btn-cancel"
                              title="Cancel Booking"
                              disabled={actionLoading === booking.id}
                              onClick={() => handleCancel(booking.id)}
                            >
                              🚫
                            </button>
                          )}

                          <button
                            className="btn-action btn-delete"
                            title="Delete Record"
                            disabled={actionLoading === booking.id}
                            onClick={() => handleDelete(booking.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  Booking #{selectedBooking.id} Details -{" "}
                  <span className={`status-badge badge-${selectedBooking.status.toLowerCase()}`}>
                    {selectedBooking.status}
                  </span>
                </h2>
                <button className="modal-close" onClick={() => setSelectedBooking(null)}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-grid">
                  <div className="detail-group">
                    <label>Client Full Name</label>
                    <div>{selectedBooking.fullName}</div>
                  </div>
                  <div className="detail-group">
                    <label>Company Name</label>
                    <div>{selectedBooking.companyName}</div>
                  </div>
                  <div className="detail-group">
                    <label>Email Address</label>
                    <div>{selectedBooking.email}</div>
                  </div>
                  <div className="detail-group">
                    <label>Phone Number</label>
                    <div>{selectedBooking.phone}</div>
                  </div>
                  <div className="detail-group">
                    <label>Preferred Date</label>
                    <div>{selectedBooking.preferredDate}</div>
                  </div>
                  <div className="detail-group">
                    <label>Preferred Time Slot</label>
                    <div>{selectedBooking.preferredTime}</div>
                  </div>
                  <div className="detail-group">
                    <label>Est. Budget</label>
                    <div>{selectedBooking.budget}</div>
                  </div>
                  <div className="detail-group">
                    <label>Meeting Method</label>
                    <div>{selectedBooking.meetingMethod}</div>
                  </div>
                  <div className="detail-group">
                    <label>Associated Website Plan ID</label>
                    <div>#{selectedBooking.websitePlanId}</div>
                  </div>
                  <div className="detail-group">
                    <label>Slot ID</label>
                    <div>{selectedBooking.slotId ? `#${selectedBooking.slotId}` : "N/A"}</div>
                  </div>
                  <div className="detail-group full-width">
                    <label>Additional Client Notes</label>
                    <div className="notes-box">
                      {selectedBooking.additionalNotes || "No additional notes provided."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {selectedBooking.status !== "CONFIRMED" && (
                  <button
                    className="modal-action-btn modal-btn-confirm"
                    onClick={() => handleConfirm(selectedBooking.id)}
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status !== "CANCELLED" && (
                  <button
                    className="modal-action-btn modal-btn-cancel"
                    onClick={() => handleCancel(selectedBooking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
                <button className="close-btn" onClick={() => setSelectedBooking(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BookingsPage;
