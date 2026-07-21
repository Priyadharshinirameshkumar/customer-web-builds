import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { getAdminSlots } from "../../../services/admin.service";
import type { SlotItem } from "../../../services/admin.service";
import "./Slots.css";

const SlotsPage: React.FC = () => {
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "AVAILABLE" | "BOOKED">("ALL");

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

  const filteredSlots = slots.filter((slot) => {
    if (statusFilter === "AVAILABLE") return !slot.isBooked;
    if (statusFilter === "BOOKED") return slot.isBooked;
    return true;
  });

  return (
    <AdminLayout>
      <div className="slots-page-container">
        <div className="page-header">
          <div>
            <h1>Time Slots Schedule</h1>
            <p>View consultation availability schedule and reserved booking slots.</p>
          </div>
          <button className="refresh-btn" onClick={fetchSlots} disabled={loading}>
            🔄 Refresh Slots
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="table-controls">
          <div className="filter-group">
            <label>Filter Availability:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "ALL" | "AVAILABLE" | "BOOKED")}
            >
              <option value="ALL">All Slots</option>
              <option value="AVAILABLE">Available Only</option>
              <option value="BOOKED">Booked Only</option>
            </select>
          </div>

          <div className="records-count">
            Total Displayed: <strong>{filteredSlots.length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading slots schedule...</p>
          </div>
        ) : (
          <div className="slots-grid">
            {filteredSlots.length === 0 ? (
              <div className="empty-state full-width">No time slots match the selected filter.</div>
            ) : (
              filteredSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`slot-card ${slot.isBooked ? "slot-booked" : "slot-available"}`}
                >
                  <div className="slot-card-header">
                    <span className="slot-date">
                      📅 {new Date(slot.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className={`slot-status-tag ${slot.isBooked ? "tag-booked" : "tag-available"}`}>
                      {slot.isBooked ? "Booked 🔒" : "Available 🟢"}
                    </span>
                  </div>

                  <div className="slot-time">
                    ⏰ {slot.startTime} - {slot.endTime}
                  </div>

                  {slot.booking && (
                    <div className="slot-booking-info">
                      <div className="info-title">Reserved Client</div>
                      <div className="info-name">{slot.booking.fullName}</div>
                      <div className="info-company">{slot.booking.companyName}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SlotsPage;
