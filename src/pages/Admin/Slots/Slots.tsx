import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import {
  getAdminSlots,
  createAdminSlot,
  updateAdminSlot,
} from "../../../services/admin.service";
import type { SlotItem } from "../../../services/admin.service";
import "./Slots.css";

const SlotsPage: React.FC = () => {
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form states for Add Slot
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("09:00");
  const [newEndTime, setNewEndTime] = useState("10:00");
  const [newStatus, setNewStatus] = useState<"AVAILABLE" | "BLOCKED">("AVAILABLE");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Edit Modal States
  const [editingSlot, setEditingSlot] = useState<SlotItem | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editStatus, setEditStatus] = useState<"AVAILABLE" | "BLOCKED" | "BOOKED">("AVAILABLE");
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<"ALL" | "AVAILABLE" | "BOOKED" | "BLOCKED">("ALL");

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await getAdminSlots();
      setSlots(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch consultation slots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newStartTime || !newEndTime) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setFormSubmitting(true);
      setError("");
      setSuccessMsg("");
      await createAdminSlot({
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
        isBooked: newStatus === "BLOCKED",
      });
      setSuccessMsg("Time slot added successfully!");
      // Reset form
      setNewDate("");
      setNewStartTime("09:00");
      setNewEndTime("10:00");
      setNewStatus("AVAILABLE");
      fetchSlots();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create slot.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOpenEdit = (slot: SlotItem) => {
    setEditingSlot(slot);
    // Format date string to YYYY-MM-DD
    const localDate = new Date(slot.date).toISOString().split("T")[0];
    setEditDate(localDate);
    setEditStartTime(slot.startTime);
    setEditEndTime(slot.endTime);

    if (slot.isBooked) {
      if (slot.booking) {
        setEditStatus("BOOKED");
      } else {
        setEditStatus("BLOCKED");
      }
    } else {
      setEditStatus("AVAILABLE");
    }
  };

  const handleUpdateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    try {
      setEditSubmitting(true);
      setError("");
      setSuccessMsg("");
      await updateAdminSlot(editingSlot.id, {
        date: editDate,
        startTime: editStartTime,
        endTime: editEndTime,
        isBooked: editStatus !== "AVAILABLE",
      });
      setSuccessMsg("Time slot updated successfully!");
      setEditingSlot(null);
      fetchSlots();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update slot.");
    } finally {
      setEditSubmitting(false);
    }
  };


  const getSlotStatus = (slot: SlotItem): "AVAILABLE" | "BOOKED" | "BLOCKED" => {
    if (slot.isBooked) {
      return slot.booking ? "BOOKED" : "BLOCKED";
    }
    return "AVAILABLE";
  };

  const filteredSlots = slots.filter((slot) => {
    const status = getSlotStatus(slot);
    if (statusFilter === "AVAILABLE") return status === "AVAILABLE";
    if (statusFilter === "BOOKED") return status === "BOOKED";
    if (statusFilter === "BLOCKED") return status === "BLOCKED";
    return true;
  });

  return (
    <AdminLayout>
      <div className="slots-page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Time Slots</h1>
            <p className="page-subtitle">Manually add, edit, or delete consultation availability schedule.</p>
          </div>
          <button className="refresh-btn" onClick={fetchSlots} disabled={loading}>
            🔄 Refresh Slots
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        {/* Add New Slot Section */}
        <section className="add-slot-section">
          <h2>Add New Slot</h2>
          <form className="add-slot-form" onSubmit={handleAddSlot}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as "AVAILABLE" | "BLOCKED")}
              >
                <option value="AVAILABLE">Available</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
            <button type="submit" className="primary-blue-btn" disabled={formSubmitting}>
              {formSubmitting ? "Adding..." : "Add Slot"}
            </button>
          </form>
        </section>

        {/* Filters and List */}
        <section className="slots-list-section">
          <div className="slots-section-header">
            <h2>Time Slots Schedule</h2>
            <div className="filter-group">
              <label htmlFor="filter">Filter:</label>
              <select
                id="filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">All Slots</option>
                <option value="AVAILABLE">Available</option>
                <option value="BOOKED">Booked</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading slots schedule...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table slots-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Reserved Client</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSlots.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="empty-state">
                        No time slots match the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredSlots.map((slot) => {
                      const status = getSlotStatus(slot);
                      return (
                        <tr key={slot.id}>
                          <td className="font-semibold">
                            {new Date(slot.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              timeZone: "UTC"
                            })}
                          </td>
                          <td>
                            {slot.startTime} - {slot.endTime}
                          </td>
                          <td>
                            <span className={`status-badge badge-${status.toLowerCase()}`}>
                              {status}
                            </span>
                          </td>
                          <td>
                            {slot.booking ? (
                              <div className="client-cell">
                                <span className="client-name">{slot.booking.fullName}</span>
                                {slot.booking.status && (
                                  <span className={`booking-status-indicator indicator-${slot.booking.status.toLowerCase()}`} title={`Booking ${slot.booking.status}`}></span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-action-btn"
                                onClick={() => handleOpenEdit(slot)}
                              >
                                Edit
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Edit Modal */}
        {editingSlot && (
          <div className="modal-backdrop">
            <div className="edit-modal-content">
              <div className="modal-header">
                <h3>Edit Time Slot</h3>
                <button className="close-modal-btn" onClick={() => setEditingSlot(null)}>✕</button>
              </div>
              <form onSubmit={handleUpdateSlot} className="modal-form">
                <div className="form-group">
                  <label htmlFor="editDate">Date</label>
                  <input
                    type="date"
                    id="editDate"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editStartTime">Start Time</label>
                  <input
                    type="time"
                    id="editStartTime"
                    value={editStartTime}
                    onChange={(e) => setEditStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editEndTime">End Time</label>
                  <input
                    type="time"
                    id="editEndTime"
                    value={editEndTime}
                    onChange={(e) => setEditEndTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editStatus">Status</label>
                  <select
                    id="editStatus"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    disabled={editStatus === "BOOKED"}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="BLOCKED">Blocked</option>
                    {editStatus === "BOOKED" && <option value="BOOKED">Booked</option>}
                  </select>
                  {editStatus === "BOOKED" && (
                    <small className="form-help-text">Booked slots cannot change availability directly.</small>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setEditingSlot(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-blue-btn" disabled={editSubmitting}>
                    {editSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SlotsPage;
