// pages/admin/ManagerApprovals.jsx - Approve/Reject Managers
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../../styles/ManagerApprovals.css';

export default function ManagerApprovals() {
  const [pendingManagers, setPendingManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPendingManagers();
  }, []);

  const fetchPendingManagers = async () => {
    try {
      const res = await api.get('/admin/managers/pending');
      setPendingManagers(res.data.data);
    } catch (error) {
      console.error('Failed to fetch pending managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (managerId) => {
    if (!window.confirm('Are you sure you want to approve this manager?')) {
      return;
    }

    setActionLoading(managerId);
    try {
      await api.put(`/admin/managers/${managerId}/approve`);
      alert('Manager approved successfully!');
      fetchPendingManagers(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to approve manager');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (managerId) => {
    const reason = window.prompt('Enter rejection reason:');
    if (!reason) return;

    setActionLoading(managerId);
    try {
      await api.put(`/admin/managers/${managerId}/reject`, { reason });
      alert('Manager rejected');
      fetchPendingManagers(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject manager');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading pending managers...</div>;
  }

  return (
    <div className="manager-approvals-page">
      <div className="container">
        <div className="page-header">
          <h1>Manager Approvals</h1>
          <p>Review and approve new manager applications</p>
        </div>

        {pendingManagers.length === 0 ? (
          <div className="no-data">
            <div className="empty-state">
              <span className="empty-icon">✅</span>
              <h3>No Pending Approvals</h3>
              <p>All manager applications have been reviewed</p>
            </div>
          </div>
        ) : (
          <div className="managers-list">
            {pendingManagers.map((manager) => (
              <div key={manager._id} className="manager-card">
                <div className="manager-header">
                  <img
                    src={manager.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                    alt={manager.name}
                    className="manager-avatar"
                  />
                  <div className="manager-info">
                    <h3>{manager.name}</h3>
                    <p className="manager-email">{manager.email}</p>
                    <p className="manager-phone">{manager.phone}</p>
                  </div>
                  <div className="manager-badge pending">
                    ⏳ Pending Approval
                  </div>
                </div>

                <div className="manager-details">
                  <div className="detail-item">
                    <strong>Location:</strong>
                    <span>
                      {manager.location?.area}, {manager.location?.city}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Registered:</strong>
                    <span>{new Date(manager.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Account Type:</strong>
                    <span className="role-badge">{manager.role}</span>
                  </div>
                </div>

                <div className="manager-actions">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(manager._id)}
                    disabled={actionLoading === manager._id}
                  >
                    {actionLoading === manager._id ? 'Processing...' : '✓ Approve'}
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(manager._id)}
                    disabled={actionLoading === manager._id}
                  >
                    {actionLoading === manager._id ? 'Processing...' : '✗ Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
