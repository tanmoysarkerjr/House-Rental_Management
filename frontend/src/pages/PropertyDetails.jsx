import { useState } from "react";
import "../styles/PropertyDetails.css";
import { useNavigate } from "react-router-dom";

export default function PropertyDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const navigate = useNavigate();

  // Dummy property data
  const property = {
    _id: "1",
    title: "Modern 2 Bedroom Apartment in Prime Location",
    location: "House 45, Road 12, Banani, Dhaka 1213",
    price: 35000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.8,
    reviews: 24,
    description:
      "Experience luxury living in this beautifully designed 2-bedroom apartment located in the heart of Banani. This modern residence features spacious rooms, premium finishes, and abundant natural light. Perfect for families or professionals seeking comfort and convenience.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop",
    ],
    amenities: [
      "24/7 Security",
      "Elevator",
      "Parking Space",
      "Gym",
      "Swimming Pool",
      "Backup Generator",
      "CCTV Surveillance",
      "Rooftop Garden",
      "Intercom",
      "Gas Connection",
    ],
    nearbyPlaces: [
      { name: "Banani School", distance: "0.5 km", icon: "🏫" },
      { name: "Banani Hospital", distance: "1.2 km", icon: "🏥" },
      { name: "Shopping Mall", distance: "0.8 km", icon: "🏬" },
      { name: "Restaurant Hub", distance: "0.3 km", icon: "🍽️" },
    ],
    manager: {
      id: "mgr-001", // added for routing
      name: "Rahim Khan",
      role: "Senior Property Manager",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&auto=format&fit=crop",
      phone: "+880 1711-123456",
      email: "rahim.khan@rentease.com",
      properties: 45,
      rating: 4.9,
      responseTime: "2 hours",
      joined: "January 2022",
      bio: "Experienced property manager with over 8 years in the Dhaka real estate market. Specialized in premium residential properties in Banani, Gulshan, and Baridhara.",
    },
    available: true,
    availableFrom: "March 1, 2024",
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳");
  };

  // Navigate to manager profile page
  const handleViewProfile = () => {
    navigate(`/manager/${property.manager.id}`);
  };

  return (
    <div className="property-details-page">
      <div className="container">
        {/* Breadcrumb */}
       

        <div className="details-layout">
          {/* Main Content */}
          <div className="details-main">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img src={property.images[currentImageIndex]} alt={property.title} />
                <button
                  className="gallery-nav prev"
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex - 1 + property.images.length) %
                        property.images.length
                    )
                  }
                >
                  ‹
                </button>
                <button
                  className="gallery-nav next"
                  onClick={() =>
                    setCurrentImageIndex((currentImageIndex + 1) % property.images.length)
                  }
                >
                  ›
                </button>
              </div>
              <div className="image-thumbnails">
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`View ${index + 1}`}
                    className={currentImageIndex === index ? "active" : ""}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="property-info-section">
              <div className="info-header">
                <div>
                  <h1>{property.title}</h1>
                  <div className="location-rating">
                    <span className="location">📍 {property.location}</span>
                    <span className="rating">
                      ⭐ {property.rating} ({property.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button className="btn-favorite-large">❤️</button>
              </div>

              <div className="quick-stats">
                <div className="stat">
                  <span className="stat-icon">🛏️</span>
                  <div>
                    <strong>{property.bedrooms}</strong>
                    <p>Bedrooms</p>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-icon">🚿</span>
                  <div>
                    <strong>{property.bathrooms}</strong>
                    <p>Bathrooms</p>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-icon">📐</span>
                  <div>
                    <strong>{property.area}</strong>
                    <p>Sq Ft</p>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-icon">🏢</span>
                  <div>
                    <strong>{property.type}</strong>
                    <p>Property Type</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="description-section">
                <h2>Description</h2>
                <p>{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="amenities-section">
                <h2>Amenities & Features</h2>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="check-icon">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              <div className="nearby-section">
                <h2>Nearby Places</h2>
                <div className="nearby-grid">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="nearby-item">
                      <span className="place-icon">{place.icon}</span>
                      <div>
                        <strong>{place.name}</strong>
                        <p>{place.distance} away</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="map-section">
                <h2>Location</h2>
                <div className="map-placeholder">
                  <p>📍 Interactive map will be displayed here</p>
                  <p className="map-address">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="details-sidebar">
            {/* Price Card */}
            <div className="price-card">
              <div className="price-header">
                <div>
                  <p className="price-label">Monthly Rent</p>
                  <h2 className="price-amount">{formatPrice(property.price)}</h2>
                </div>
                {property.available && (
                  <span className="availability-badge">✓ Available</span>
                )}
              </div>

              {property.availableFrom && (
                <p className="available-from">
                  Available from: <strong>{property.availableFrom}</strong>
                </p>
              )}

              <button
                className="btn-contact-owner"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                💬 Contact Owner
              </button>

              <button className="btn-schedule-visit">📅 Schedule Visit</button>

              <div className="contact-info">
                <div className="contact-item">
                  <span>📞</span>
                  <span>Call for inquiry</span>
                </div>
                <div className="contact-item">
                  <span>✉️</span>
                  <span>Get details via email</span>
                </div>
              </div>
            </div>

            {/* Manager Card */}
            <div className="manager-card">
              <h3>Property Manager</h3>
              <div className="manager-profile">
                <img src={property.manager.image} alt={property.manager.name} />
                <div className="manager-info-details">
                  <strong>{property.manager.name}</strong>
                  <p>{property.manager.role}</p>
                  <div className="manager-stats">
                    <span>⭐ {property.manager.rating}</span>
                    <span>•</span>
                    <span>{property.manager.properties} properties</span>
                  </div>
                </div>
              </div>

              <div className="manager-response">
                <span className="response-icon">⚡</span>
                <div>
                  <strong>Typical Response Time</strong>
                  <p>{property.manager.responseTime}</p>
                </div>
              </div>

              {/* Updated: View Full Profile button with navigation */}
              <button className="btn-view-profile" onClick={handleViewProfile}>
                View Full Profile
              </button>
            </div>

            {/* Safety Tips */}
            <div className="safety-card">
              <h3>🛡️ Safety Tips</h3>
              <ul>
                <li>Always visit the property in person</li>
                <li>Verify documents before payment</li>
                <li>Never share financial details via chat</li>
                <li>Report suspicious activity</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowContactForm(false)}>
                ×
              </button>
              <h2>Contact Property Manager</h2>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="tel" placeholder="Your Phone" required />
                <textarea placeholder="Your Message..." rows="4" required></textarea>
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}