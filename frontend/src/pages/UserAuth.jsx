import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/UserAuth.css";

export default function UserAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, registerUser } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const isRegister = queryParams.get("mode") === "register";

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await registerUser({ name: formData.name, email: formData.email, password: formData.password });
      } else {
        await loginUser({ email: formData.email, password: formData.password });
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />}
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          {isRegister && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="auth-toggle">
          {isRegister ? (
            <p>Already have an account? <span onClick={() => navigate("/tenant-auth")}>Login</span></p>
          ) : (
            <p>Don't have an account? <span onClick={() => navigate("/tenant-auth?mode=register")}>Register</span></p>
          )}
        </div>
      </div>
    </div>
  );
}
