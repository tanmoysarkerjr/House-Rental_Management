import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/ManagerAuth.css";

export default function ManagerAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginManager, registerManager, isManager } = useAuth();

  const isRegister = new URLSearchParams(location.search).get("mode") === "register";

  useEffect(() => {
    if (isManager) navigate("/manager/dashboard");
  }, [isManager, navigate]);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", nid: "", phone: "", address: "", company: "", tinNumber: "", tinCertificate: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match"); setLoading(false); return;
        }
        const payload = new FormData();
        Object.keys(formData).forEach(key => { if (formData[key]) payload.append(key, formData[key]); });
        await registerManager(payload);
      } else {
        await loginManager({ email: formData.email, password: formData.password });
      }
      navigate("/manager/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Manager Registration" : "Manager Login"}</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="nid" placeholder="National ID" value={formData.nid} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <input type="text" name="company" placeholder="Company (Optional)" value={formData.company} onChange={handleChange} />
              <input type="text" name="tinNumber" placeholder="TIN Number" value={formData.tinNumber} onChange={handleChange} required />
              <input type="file" name="tinCertificate" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}