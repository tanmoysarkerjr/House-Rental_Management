// pages/admin/AdminDashboard.jsx - Admin Dashboard
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      setStats(res.data.data.stats);
      setRecentActivities(res.data.data.recentActivities);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your rental platform</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats?.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <h3>{stats?.totalManagers || 0}</h3>
              <p>Total Managers</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats?.pendingManagers || 0}</h3>
              <p>Pending Managers</p>
              <Link to="/admin/manager-approvals" className="stat-link">Review →</Link>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>{stats?.totalProperties || 0}</h3>
              <p>Total Properties</p>
            </div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-icon">🔍</div>
            <div className="stat-info">
              <h3>{stats?.pendingProperties || 0}</h3>
              <p>Pending Properties</p>
              <Link to="/admin/property-approvals" className="stat-link">Review →</Link>
            </div>
          </div>

          <div className="stat-card teal">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{stats?.totalBookings || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card pink">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <h3>{stats?.activeBookings || 0}</h3>
              <p>Active Bookings</p>
            </div>
          </div>

          <div className="stat-card indigo">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{stats?.totalReviews || 0}</h3>
              <p>Total Reviews</p>
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>৳{stats?.totalRevenue?.toLocaleString() || 0}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="stat-card cyan">
            <div className="stat-icon">💵</div>
            <div className="stat-info">
              <h3>৳{stats?.totalServiceFees?.toLocaleString() || 0}</h3>
              <p>Service Fees</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/manager-approvals" className="action-card">
              <span className="action-icon">👨‍💼</span>
              <h3>Manager Approvals</h3>
              <p>{stats?.pendingManagers || 0} pending</p>
            </Link>

            <Link to="/admin/property-approvals" className="action-card">
              <span className="action-icon">🏘️</span>
              <h3>Property Approvals</h3>
              <p>{stats?.pendingProperties || 0} pending</p>
            </Link>

            <Link to="/admin/users" className="action-card">
              <span className="action-icon">👥</span>
              <h3>Manage Users</h3>
              <p>View all users</p>
            </Link>

            <Link to="/admin/properties" className="action-card">
              <span className="action-icon">🏠</span>
              <h3>All Properties</h3>
              <p>Manage listings</p>
            </Link>

            <Link to="/admin/bookings" className="action-card">
              <span className="action-icon">📅</span>
              <h3>All Bookings</h3>
              <p>Monitor bookings</p>
            </Link>

            <Link to="/admin/managers" className="action-card">
              <span className="action-icon">🏢</span>
              <h3>All Managers</h3>
              <p>Manage managers</p>
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">
          <h2>Recent Activities</h2>

          <div className="activities-grid">
            {/* Recent Users */}
            <div className="activity-section">
              <h3>Recent Users</h3>
              {recentActivities?.users?.map((user) => (
                <div key={user._id} className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-details">
                    <p className="activity-title">{user.name}</p>
                    <p className="activity-meta">
                      {user.email} • {user.role}
                    </p>
                    <p className="activity-time">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Properties */}
            <div className="activity-section">
              <h3>Recent Properties</h3>
              {recentActivities?.properties?.map((property) => (
                <div key={property._id} className="activity-item">
                  <div className="activity-icon">🏠</div>
                  <div className="activity-details">
                    <p className="activity-title">{property.title}</p>
                    <p className="activity-meta">
                      By {property.manager?.name} • ৳{property.price.toLocaleString()}
                    </p>
                    <p className="activity-time">
                      {property.verified ? '✓ Verified' : '⏳ Pending'} •{' '}
                      {new Date(property.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="activity-section">
              <h3>Recent Bookings</h3>
              {recentActivities?.bookings?.map((booking) => (
                <div key={booking._id} className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-details">
                    <p className="activity-title">{booking.property?.title}</p>
                    <p className="activity-meta">
                      By {booking.user?.name} • ৳{booking.pricing?.totalAmount?.toLocaleString()}
                    </p>
                    <p className="activity-time">
                      <span className={`status ${booking.status}`}>{booking.status}</span> •{' '}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
