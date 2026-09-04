import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ManagerProfile.css";

export default function ManagerProfile() {
  const { managerId } = useParams();
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  // In real app you would fetch manager data using managerId
  // For demo we use dummy data
  const manager = {
    id: "mgr-001",
    name: " Tanmoy Sarker",
    role: "Senior Property Manager",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&auto=format&fit=crop",
    phone: "+880 1711-123456",
    email: "tanmoy@gmail.com.khan@rentease.com",
    properties: 45,
    rating: 4.9,
    responseTime: "2 hours",
    joined: "January 2022",
    bio: "Experienced property manager with over 8 years in the Dhaka real estate market. Specialized in premium residential properties in Banani, Gulshan, and Baridhara.",
    specialties: ["Residential", "Luxury Apartments", "Banani", "Gulshan"],
    totalDeals: 180,
    satisfactionRate: "96%",
  };

  const handleBackToProperty = () => {
    navigate(-1); // Go back to the previous page (usually property details)
  };

  return (
    <div className="manager-profile-page">
      <div className="container">
        <div className="profile-header">
          <img src={manager.image} alt={manager.name} className="profile-avatar" />
          <div className="profile-info">
            <h1>{manager.name}</h1>
            <p className="role">{manager.role}</p>
            <div className="profile-stats">
              <span>⭐ {manager.rating}</span>
              <span>•</span>
              <span>{manager.properties} properties managed</span>
              <span>•</span>
              <span>Joined {manager.joined}</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-bio">
            <h2>About</h2>
            <p>{manager.bio}</p>
          </div>

          <div className="profile-details-grid">
            <div className="detail-item">
              <strong>Response Time</strong>
              <p>{manager.responseTime}</p>
            </div>
            <div className="detail-item">
              <strong>Total Deals Closed</strong>
              <p>{manager.totalDeals}</p>
            </div>
            <div className="detail-item">
              <strong>Client Satisfaction</strong>
              <p>{manager.satisfactionRate}</p>
            </div>
            <div className="detail-item">
              <strong>Contact</strong>
              <p>{manager.phone}</p>
              <p>{manager.email}</p>
            </div>
          </div>

          <div className="specialties">
            <h2>Specialties</h2>
            <div className="specialties-tags">
              {manager.specialties.map((spec, index) => (
                <span key={index} className="specialty-tag">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="btn-contact"
            onClick={() => setShowContactForm(true)}
          >
            Contact Manager
          </button>
          <button className="btn-back" onClick={handleBackToProperty}>
            Back to Property
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowContactForm(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowContactForm(false)}
            >
              ×
            </button>
            <h2>Contact {manager.name}</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone" required />
              <textarea
                placeholder="Your Message..."
                rows="5"
                required
              ></textarea>
              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}