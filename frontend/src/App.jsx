import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyCard from "./pages/PropertyCard";
import PricePredictor from "./pages/PricePredictor";
import UserAuth from "./pages/UserAuth";
import ManagerAuth from "./pages/manager/ManagerAuth";
import AdminAuth from "./pages/admin/AdminAuth";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About"; // <-- Import About page

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import MyProperties from "./pages/manager/MyProperties";
import AddProperty from "./pages/manager/AddProperty";
import ManagerProfile from "./pages/ManagerProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerApprovals from "./pages/admin/ManagerApprovals";
import PropertyApprovals from "./pages/admin/PropertyApprovals";

// Protected Routes
function ManagerRoute({ children }) {
  const { isManager } = useAuth();
  return isManager ? children : <Navigate to="/manager-auth" />;
}

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin-auth" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/rent-prediction" element={<PricePredictor />} />
              <Route path="/about" element={<About />} />  {/* <-- Added About route */}
              <Route path="/tenant-auth" element={<UserAuth />} />
              <Route path="/manager-auth" element={<ManagerAuth />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/manager/:managerId" element={<ManagerProfile />} />

              {/* Manager Protected Routes */}
              <Route path="/manager/dashboard" element={<ManagerRoute><ManagerDashboard /></ManagerRoute>} />
              <Route path="/manager/my-properties" element={<ManagerRoute><MyProperties /></ManagerRoute>} />
              <Route path="/manager/add-property" element={<ManagerRoute><AddProperty /></ManagerRoute>} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/managers" element={<AdminRoute><ManagerApprovals /></AdminRoute>} />
              <Route path="/admin/properties" element={<AdminRoute><PropertyApprovals /></AdminRoute>} />

              {/* Catch All */}
              <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;