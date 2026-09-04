// pages/manager/ManagerDashboard.jsx - Manager Dashboard
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/ManagerDashboard.css';

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get manager stats
      const statsRes = await api.get('/users/dashboard');
      setStats(statsRes.data.data);

      // Get recent bookings
      const bookingsRes = await api.get('/bookings?limit=5');
      setRecentBookings(bookingsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Manager Dashboard</h1>
          <Link to="/manager/add-property" className="btn-primary">
            + Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>{stats?.totalProperties || 0}</h3>
              <p>Total Properties</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats?.availableProperties || 0}</h3>
              <p>Available</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔑</div>
            <div className="stat-info">
              <h3>{stats?.rentedProperties || 0}</h3>
              <p>Rented</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats?.totalBookings || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats?.pendingBookings || 0}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>৳{stats?.totalRevenue?.toLocaleString() || 0}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <h3>{stats?.totalViews || 0}</h3>
              <p>Total Views</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <h3>{stats?.activeBookings || 0}</h3>
              <p>Active Bookings</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/manager/properties" className="action-card">
              <span className="action-icon">🏘️</span>
              <h3>My Properties</h3>
              <p>View and manage your listings</p>
            </Link>

            <Link to="/manager/add-property" className="action-card">
              <span className="action-icon">➕</span>
              <h3>Add Property</h3>
              <p>List a new property</p>
            </Link>

            <Link to="/manager/bookings" className="action-card">
              <span className="action-icon">📋</span>
              <h3>Bookings</h3>
              <p>Manage property bookings</p>
            </Link>

            <Link to="/manager/reviews" className="action-card">
              <span className="action-icon">⭐</span>
              <h3>Reviews</h3>
              <p>View and respond to reviews</p>
            </Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <Link to="/manager/bookings">View All →</Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="no-data">No bookings yet</p>
          ) : (
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Tenant</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.property?.title}</td>
                      <td>{booking.user?.name}</td>
                      <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td>৳{booking.pricing?.totalAmount?.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/manager/bookings/${booking._id}`} className="btn-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
