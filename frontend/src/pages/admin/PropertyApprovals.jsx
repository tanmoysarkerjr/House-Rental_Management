// pages/admin/PropertyApprovals.jsx - Approve/Reject Properties
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/PropertyApprovals.css';

export default function PropertyApprovals() {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      const res = await api.get('/admin/properties/pending');
      setPendingProperties(res.data.data);
    } catch (error) {
      console.error('Failed to fetch pending properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId) => {
    if (!window.confirm('Approve this property listing?')) {
      return;
    }

    setActionLoading(propertyId);
    try {
      await api.put(`/admin/properties/${propertyId}/approve`);
      alert('Property approved and published!');
      fetchPendingProperties(); // Refresh list
      setSelectedProperty(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to approve property');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (propertyId) => {
    const reason = window.prompt('Enter rejection reason:');
    if (!reason) return;

    setActionLoading(propertyId);
    try {
      await api.put(`/admin/properties/${propertyId}/reject`, { reason });
      alert('Property rejected');
      fetchPendingProperties(); // Refresh list
      setSelectedProperty(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject property');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading pending properties...</div>;
  }

  return (
    <div className="property-approvals-page">
      <div className="container">
        <div className="page-header">
          <h1>Property Approvals</h1>
          <p>Review and approve new property listings</p>
        </div>

        {pendingProperties.length === 0 ? (
          <div className="no-data">
            <div className="empty-state">
              <span className="empty-icon">✅</span>
              <h3>No Pending Properties</h3>
              <p>All property listings have been reviewed</p>
            </div>
          </div>
        ) : (
          <div className="properties-grid">
            {pendingProperties.map((property) => (
              <div key={property._id} className="property-approval-card">
                <div className="property-image">
                  <img
                    src={property.images[0]?.url || 'https://via.placeholder.com/400x300'}
                    alt={property.title}
                  />
                  <div className="pending-badge">⏳ Awaiting Approval</div>
                </div>

                <div className="property-content">
                  <h3>{property.title}</h3>

                  <div className="property-meta">
                    <span className="price">৳{property.price.toLocaleString()}/mo</span>
                    <span className="type">{property.type}</span>
                  </div>

                  <p className="property-location">
                    📍 {property.location.address}, {property.location.area}, {property.location.city}
                  </p>

                  <div className="property-stats">
                    <span>🛏️ {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.area} sqft</span>
                  </div>

                  <div className="manager-info">
                    <img
                      src={property.manager?.avatar || 'https://via.placeholder.com/40'}
                      alt={property.manager?.name}
                      className="manager-avatar-sm"
                    />
                    <div>
                      <p className="manager-name">{property.manager?.name}</p>
                      <p className="manager-email">{property.manager?.email}</p>
                    </div>
                  </div>

                  <div className="property-description">
                    <p>{property.description?.substring(0, 150)}...</p>
                  </div>

                  <div className="property-features">
                    {property.amenities?.slice(0, 4).map((amenity, index) => (
                      <span key={index} className="feature-tag">
                        ✓ {amenity}
                      </span>
                    ))}
                    {property.amenities?.length > 4 && (
                      <span className="feature-tag">+{property.amenities.length - 4} more</span>
                    )}
                  </div>

                  <div className="submission-date">
                    Submitted: {new Date(property.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="property-actions">
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedProperty(property)}
                  >
                    👁️ View Full Details
                  </button>
                  <div className="action-buttons">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(property._id)}
                      disabled={actionLoading === property._id}
                    >
                      {actionLoading === property._id ? 'Processing...' : '✓ Approve'}
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(property._id)}
                      disabled={actionLoading === property._id}
                    >
                      {actionLoading === property._id ? 'Processing...' : '✗ Reject'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Property Details Modal */}
        {selectedProperty && (
          <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
            <div className="modal-content property-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProperty(null)}>
                ×
              </button>

              <h2>{selectedProperty.title}</h2>

              <div className="modal-images">
                {selectedProperty.images.map((img, index) => (
                  <img key={index} src={img.url} alt={`Image ${index + 1}`} />
                ))}
              </div>

              <div className="modal-details">
                <h3>Property Details</h3>
                <p><strong>Type:</strong> {selectedProperty.type}</p>
                <p><strong>Price:</strong> ৳{selectedProperty.price.toLocaleString()}/month</p>
                <p><strong>Location:</strong> {selectedProperty.location.address}, {selectedProperty.location.area}, {selectedProperty.location.city}</p>
                <p><strong>Size:</strong> {selectedProperty.area} sqft</p>
                <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>

                <h3>Description</h3>
                <p>{selectedProperty.description}</p>

                <h3>Amenities</h3>
                <div className="amenities-list">
                  {selectedProperty.amenities?.map((amenity, index) => (
                    <span key={index} className="amenity-badge">✓ {amenity}</span>
                  ))}
                </div>

                <h3>Manager Information</h3>
                <p><strong>Name:</strong> {selectedProperty.manager?.name}</p>
                <p><strong>Email:</strong> {selectedProperty.manager?.email}</p>
                <p><strong>Phone:</strong> {selectedProperty.manager?.phone}</p>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-approve-large"
                  onClick={() => handleApprove(selectedProperty._id)}
                  disabled={actionLoading === selectedProperty._id}
                >
                  ✓ Approve Property
                </button>
                <button
                  className="btn-reject-large"
                  onClick={() => handleReject(selectedProperty._id)}
                  disabled={actionLoading === selectedProperty._id}
                >
                  ✗ Reject Property
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
