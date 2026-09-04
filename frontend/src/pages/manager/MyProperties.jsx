// pages/manager/MyProperties.jsx - Manager's Property List
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/MyProperties.css';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, verified, pending, rented

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties/stats/overview');
      // This will get manager's own properties
      const propsRes = await api.get('/properties');
      // Filter to show only logged-in manager's properties
      setProperties(propsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await api.delete(`/properties/${id}`);
      alert('Property deleted successfully');
      fetchProperties();
    } catch (error) {
      alert('Failed to delete property');
    }
  };

  const filteredProperties = properties.filter(prop => {
    if (filter === 'all') return true;
    if (filter === 'verified') return prop.verified;
    if (filter === 'pending') return !prop.verified;
    if (filter === 'rented') return prop.availability.status === 'rented';
    return true;
  });

  if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  return (
    <div className="my-properties-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Properties</h1>
            <p>Manage all your listed properties</p>
          </div>
          <Link to="/manager/add-property" className="btn-primary">
            + Add New Property
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({properties.length})
          </button>
          <button
            className={filter === 'verified' ? 'active' : ''}
            onClick={() => setFilter('verified')}
          >
            Verified ({properties.filter(p => p.verified).length})
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending Approval ({properties.filter(p => !p.verified).length})
          </button>
          <button
            className={filter === 'rented' ? 'active' : ''}
            onClick={() => setFilter('rented')}
          >
            Rented ({properties.filter(p => p.availability.status === 'rented').length})
          </button>
        </div>

        {/* Properties List */}
        {filteredProperties.length === 0 ? (
          <div className="no-properties">
            <div className="empty-state">
              <span className="empty-icon">🏠</span>
              <h3>No properties found</h3>
              <p>Add your first property to get started</p>
              <Link to="/manager/add-property" className="btn-primary">
                Add Property
              </Link>
            </div>
          </div>
        ) : (
          <div className="properties-list">
            {filteredProperties.map((property) => (
              <div key={property._id} className="property-item">
                <div className="property-image">
                  <img
                    src={property.images[0]?.url || 'https://via.placeholder.com/300x200'}
                    alt={property.title}
                  />
                  <div className="property-badges">
                    {property.featured && (
                      <span className="badge featured">⭐ Featured</span>
                    )}
                    {property.verified ? (
                      <span className="badge verified">✓ Verified</span>
                    ) : (
                      <span className="badge pending">⏳ Pending</span>
                    )}
                    {property.availability.status === 'rented' && (
                      <span className="badge rented">Rented</span>
                    )}
                  </div>
                </div>

                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p className="property-location">
                    📍 {property.location.area}, {property.location.city}
                  </p>

                  <div className="property-stats">
                    <span>🛏️ {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.area} sqft</span>
                  </div>

                  <div className="property-meta">
                    <div className="property-price">৳{property.price.toLocaleString()}/mo</div>
                    <div className="property-engagement">
                      <span>👁️ {property.views} views</span>
                      <span>❤️ {property.favorites} favorites</span>
                      <span>⭐ {property.rating.average} ({property.rating.count})</span>
                    </div>
                  </div>
                </div>

                <div className="property-actions">
                  <Link
                    to={`/property/${property._id}`}
                    className="btn-action"
                    target="_blank"
                  >
                    👁️ View
                  </Link>
                  <Link
                    to={`/manager/edit-property/${property._id}`}
                    className="btn-action"
                  >
                    ✏️ Edit
                  </Link>
                  <Link
                    to={`/manager/property-bookings/${property._id}`}
                    className="btn-action"
                  >
                    📅 Bookings
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="btn-action danger"
                  >
                    🗑️ Delete
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
