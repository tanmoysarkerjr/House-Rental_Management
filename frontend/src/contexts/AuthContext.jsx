import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // Tenant
  const [manager, setManager] = useState(null); // Manager
  const [admin, setAdmin] = useState(null);     // Admin

  // ===== Tenant Login/Register =====
  const loginUser = async ({ email, password }) => {
    setUser({ name: "Tanmoy", email, role: "Tenant" });
  };

  const registerUser = async ({ name, email, password }) => {
    setUser({ name, email, role: "Tenant" });
  };

  const logoutUser = () => setUser(null);

  // ===== Manager Login/Register =====
  const loginManager = async ({ email, password }) => {
    setManager({ name: "Rahim Khan", email, role: "Manager" });
  };

  const registerManager = async ({ name, email, password, nid, tin }) => {
    setManager({ name, email, role: "Manager", nid, tin });
  };

  const logoutManager = () => setManager(null);

  // ===== Admin Login/Register =====
  const loginAdmin = async ({ email, password }) => {
    setAdmin({ name: "Admin User", email, role: "Admin" });
  };

  const logoutAdmin = () => setAdmin(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        manager,
        admin,
        isUser: !!user,
        isManager: !!manager,
        isAdmin: !!admin,
        loginUser,
        registerUser,
        logoutUser,
        loginManager,
        registerManager,
        logoutManager,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook for easy usage
export const useAuth = () => useContext(AuthContext);