import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { getWebsitePlans } from "../../../services/admin.service";
import type { WebsitePlanItem } from "../../../services/admin.service";
import "./WebsitePlans.css";

const WebsitePlansPage: React.FC = () => {
  const [plans, setPlans] = useState<WebsitePlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<WebsitePlanItem | null>(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getWebsitePlans();
      setPlans(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch website plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.businessType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="website-plans-container">
        <div className="page-header">
          <div>
            <h1>Website Plans Submission</h1>
            <p>View all website requirements submitted by potential clients.</p>
          </div>
          <button className="refresh-btn" onClick={fetchPlans} disabled={loading}>
            🔄 Refresh List
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="table-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by client, business name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="records-count">
            Total Submissions: <strong>{filteredPlans.length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading website plans...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client Name</th>
                  <th>Business Name</th>
                  <th>Contact Info</th>
                  <th>Website Size</th>
                  <th>Business Type</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="empty-state">
                      No website plans found.
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan) => (
                    <tr key={plan.id}>
                      <td>#{plan.id}</td>
                      <td className="font-semibold">{plan.fullName}</td>
                      <td>{plan.businessName}</td>
                      <td>
                        <div>{plan.email}</div>
                        <small className="text-muted">{plan.phone}</small>
                      </td>
                      <td>
                        <span className="plan-tag">{plan.websiteSize}</span>
                      </td>
                      <td>{plan.businessType}</td>
                      <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedPlan(plan)}
                        >
                          👁️ View Full Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Details Modal */}
        {selectedPlan && (
          <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Website Plan Requirements #{selectedPlan.id}</h2>
                <button className="modal-close" onClick={() => setSelectedPlan(null)}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-grid">
                  <div className="detail-group">
                    <label>Full Name</label>
                    <div>{selectedPlan.fullName}</div>
                  </div>
                  <div className="detail-group">
                    <label>Business Name</label>
                    <div>{selectedPlan.businessName}</div>
                  </div>
                  <div className="detail-group">
                    <label>Email Address</label>
                    <div>{selectedPlan.email}</div>
                  </div>
                  <div className="detail-group">
                    <label>Phone Number</label>
                    <div>{selectedPlan.phone}</div>
                  </div>
                  <div className="detail-group">
                    <label>Website Size</label>
                    <div>{selectedPlan.websiteSize}</div>
                  </div>
                  <div className="detail-group">
                    <label>Business Type</label>
                    <div>{selectedPlan.businessType}</div>
                  </div>
                  <div className="detail-group">
                    <label>Target Audience</label>
                    <div>{selectedPlan.targetAudience || "Not specified"}</div>
                  </div>
                  <div className="detail-group">
                    <label>Desired Features</label>
                    <div>{selectedPlan.features || "Not specified"}</div>
                  </div>
                  <div className="detail-group">
                    <label>Hosting Preference</label>
                    <div>{selectedPlan.hosting || "Not specified"}</div>
                  </div>
                  <div className="detail-group">
                    <label>Maintenance Required</label>
                    <div>{selectedPlan.maintenance || "Not specified"}</div>
                  </div>
                  <div className="detail-group">
                    <label>SEO Requirements</label>
                    <div>{selectedPlan.seoRequirement || "Not specified"}</div>
                  </div>
                  <div className="detail-group full-width">
                    <label>Additional Notes / Requirements</label>
                    <div className="notes-box">
                      {selectedPlan.additionalRequirements || "None provided"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="close-btn" onClick={() => setSelectedPlan(null)}>
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

export default WebsitePlansPage;
