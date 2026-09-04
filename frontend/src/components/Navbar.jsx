import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // correct relative path
import "../styles/Navbar.css"; // only Navbar styles

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProfileLink = () => {
    if (!user) return null;
    if (user.role === "admin") return { path: "/admin-profile", label: "Admin Profile" };
    if (user.role === "manager") return { path: "/manager-profile", label: "Manager Profile" };
    return { path: "/profile", label: "User Profile" };
  };

  const profileLink = getProfileLink();

  return (
    <>
      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>RentEase</h3>
          <button onClick={closeSidebar}>×</button>
        </div>

        <div className="sidebar-content">
          <Link to="/" onClick={closeSidebar}>Home</Link>
          <Link to="/properties" onClick={closeSidebar}>Properties</Link>
          <Link to="/rent-prediction" onClick={closeSidebar}>Rent Prediction</Link>
          <Link to="/about" onClick={closeSidebar}>About</Link>

          <hr />

          {!user && (
            <>
              <div className="sidebar-section-title">For Managers</div>
              <Link to="/manager-auth" onClick={closeSidebar}>🔐 Manager Login</Link>
            </>
          )}

          {user && (
            <>
              {profileLink && (
                <Link to={profileLink.path} onClick={closeSidebar}>{profileLink.label}</Link>
              )}
              <Link to="/favorites" onClick={closeSidebar}>Favorites</Link>
              {(user.role === "manager" || user.role === "admin") && (
                <Link to="/dashboard" onClick={closeSidebar}>📋 Dashboard</Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" onClick={closeSidebar}>Admin Panel</Link>
              )}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <Link to="/" className="logo">🏠 RentEase</Link>
        </div>

        <div className="nav-right">
          {!user && <Link to="/tenant-auth" className="login-btn">Login</Link>}

          {user && (
            <div className="profile" ref={profileRef}>
              <button
                className="avatar"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  {profileLink && (
                    <Link to={profileLink.path} onClick={() => setIsProfileOpen(false)}>
                      {profileLink.label}
                    </Link>
                  )}

                  {(user.role === "manager" || user.role === "admin") && (
                    <Link to="/dashboard" onClick={() => setIsProfileOpen(false)}>Dashboard</Link>
                  )}

                  {user.role === "admin" && (
                    <Link to="/admin" onClick={() => setIsProfileOpen(false)}>Admin Panel</Link>
                  )}

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}