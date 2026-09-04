import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price).replace('BDT', '৳');
  };

  return (
    <div className="property-card">
      {property.featured && (
        <div className="featured-badge">⭐ Featured</div>
      )}
      
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <div className="property-type-badge">{property.type}</div>
      </div>

      <div className="property-content">
        <div className="property-header">
          <h3 className="property-title">{property.title}</h3>
          <div className="property-rating">
            <span className="star">⭐</span>
            <span>{property.rating || '4.5'}</span>
          </div>
        </div>

        <div className="property-location">
          <span className="location-icon">📍</span>
          <span>{property.location}</span>
        </div>

        <div className="property-features">
          <div className="feature-item">
            <span className="feature-icon">🛏️</span>
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚿</span>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📐</span>
            <span>{property.area} sqft</span>
          </div>
        </div>

        <div className="property-footer">
          <div className="property-price">
            <span className="price-label">Monthly Rent</span>
            <span className="price-amount">{formatPrice(property.price)}</span>
          </div>
          <Link to={`/property/${property._id}`} className="btn-view-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}