import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#718096'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Check if user is approved (for managers and property owners)
  if ((user.role === 'manager' || user.role === 'property_owner') && !user.approved) {
    // Allow access to their dashboard to see pending status
    if (window.location.pathname === '/dashboard') {
      return children;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
