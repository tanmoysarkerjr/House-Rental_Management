import { useEffect, useState } from "react";
import PropertyCard from "../pages/PropertyCard";
import "../styles/Home.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    type: "",
    price: ""
  });

  // Dummy data for frontend demo
  const dummyProperties = [
    {
      _id: "1",
      title: "Modern 2 Bedroom Apartment",
      location: "Banani, Dhaka",
      price: 35000,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      featured: true,
      rating: 4.8
    },
    {
      _id: "2",
      title: "Cozy Family House",
      location: "Gulshan, Dhaka",
      price: 65000,
      type: "House",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      featured: true,
      rating: 4.9
    },
    {
      _id: "3",
      title: "Luxury Studio in Dhanmondi",
      location: "Dhanmondi, Dhaka",
      price: 28000,
      type: "Studio",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      featured: false,
      rating: 4.6
    },
    {
      _id: "4",
      title: "Spacious 3 Bed Duplex",
      location: "Uttara, Dhaka",
      price: 48000,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1600563438938-a9a0e3a3b6f0?w=800&auto=format&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      featured: true,
      rating: 4.7
    },
    {
      _id: "5",
      title: "Elegant Villa with Garden",
      location: "Bashundhara, Dhaka",
      price: 95000,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      featured: true,
      rating: 5.0
    },
    {
      _id: "6",
      title: "Compact 1 Bed Flat",
      location: "Mohammadpur, Dhaka",
      price: 22000,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: 550,
      featured: false,
      rating: 4.4
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProperties(dummyProperties);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
    console.log("Search filters:", searchFilters);
    // Backend integration will go here
  };

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Rental Home</h1>
          <p className="hero-subtitle">
            Connect directly with verified property managers. Hassle-free, transparent, and fast.
          </p>

          <div className="search-bar">
            <div className="search-field">
              <span className="search-icon">📍</span>
              <input 
                type="text" 
                placeholder="Location, area or city..."
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              />
            </div>
            <div className="search-field">
              <select 
                value={searchFilters.type}
                onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div className="search-field">
              <select
                value={searchFilters.price}
                onChange={(e) => setSearchFilters({...searchFilters, price: e.target.value})}
              >
                <option value="">Any Price</option>
                <option value="0-25000">Under ৳25,000</option>
                <option value="25000-50000">৳25,000 - ৳50,000</option>
                <option value="50000-80000">৳50,000 - ৳80,000</option>
                <option value="80000+">Above ৳80,000</option>
              </select>
            </div>
            <button className="btn-search" onClick={handleSearch}>
              <span>🔍</span> Search
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <strong>12,450+</strong>
              <span>Active Listings</span>
            </div>
            <div className="stat-item">
              <strong>4.8/5</strong>
              <span>User Rating</span>
            </div>
            <div className="stat-item">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Everything You Need in One Place</h2>
            <p>Experience the future of hassle-free property rental</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Verified Listings</h3>
              <p>Every property is verified by our team to ensure authenticity and quality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Direct Contact</h3>
              <p>Chat directly with property owners and managers, no middlemen involved</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees or commissions, see the real price upfront</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Safe and encrypted payment processing for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING LISTINGS */}
      <section className="listings section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
            <p>Discover the most popular homes available right now</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing properties...</p>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="center mt-3">
            <button className="btn-outline-large">
              View All Properties →
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Simple Process</span>
            <h2>How It Works</h2>
            <p>Get your dream home in 3 easy steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>Search & Filter</h3>
              <p>Browse thousands of verified properties with advanced filters to find your perfect match</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">📞</div>
              <h3>Connect Directly</h3>
              <p>Chat with property managers, schedule visits, and ask all your questions</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">🎉</div>
              <h3>Move In</h3>
              <p>Complete the booking, sign the agreement, and get the keys to your new home</p>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED MANAGERS */}
      <section className="verified-managers section-padding bg-light">
        <div className="container">
          <div className="verified-flex">
            <div className="verified-text">
              <span className="section-label">Trusted Network</span>
              <h2>Connect with Verified Property Managers</h2>
              <p>
                Our network of 1,200+ verified property managers ensures you get professional 
                service and genuine listings. No brokers, no commission, just honest deals.
              </p>
              <ul className="verified-benefits">
                <li>✓ Background verified managers</li>
                <li>✓ Average response time: 2 hours</li>
                <li>✓ 98% customer satisfaction rate</li>
                <li>✓ Direct contact guaranteed</li>
              </ul>
              <button className="btn-primary-large">Browse All Managers</button>
            </div>

            <div className="managers-card">
              <div className="card-header">
                <h3>Top Rated Managers</h3>
                <span className="verified-badge">✓ Verified</span>
              </div>
              <div className="managers-list">
                {[
                  { 
                    name: "Tanmoy ", 
                    role: "Senior Property Manager", 
                    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&auto=format&fit=crop",
                    properties: 45,
                    rating: 4.9
                  },
                  { 
                    name: "Ayesha Begum", 
                    role: "Residential Specialist", 
                    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
                    properties: 32,
                    rating: 4.8
                  },
                  { 
                    name: "Samiul Islam", 
                    role: "Commercial Expert", 
                    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
                    properties: 28,
                    rating: 5.0
                  },
                ].map((manager, i) => (
                  <div className="manager-item" key={i}>
                    <img src={manager.img} alt={manager.name} className="manager-avatar" />
                    <div className="manager-info">
                      <strong>{manager.name}</strong>
                      <p>{manager.role}</p>
                      <div className="manager-meta">
                        <span>⭐ {manager.rating}</span>
                        <span>•</span>
                        <span>{manager.properties} properties</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="see-more">See All Managers →</a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reviews</span>
            <h2>What Our Clients Say</h2>
            <p>Real experiences from real renters</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Found my dream apartment in just 2 days! The direct contact with the owner made everything so smooth and transparent. Highly recommend!"</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop" alt="Sarah" />
                <div>
                  <strong>Sarah Ahmed</strong>
                  <span>Rented in Banani</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"No broker fees saved me thousands! The platform is easy to use and all listings are genuine. Best rental experience ever."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" alt="Karim" />
                <div>
                  <strong>Karim Rahman</strong>
                  <span>Rented in Gulshan</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"As a property manager, this platform helped me reach genuine tenants directly. No more dealing with brokers. Win-win!"</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop" alt="Fahim" />
                <div>
                  <strong>Fahim Hossain</strong>
                  <span>Property Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Join thousands of happy renters who found their perfect place</p>
            <div className="cta-buttons">
              <button className="btn-primary-large">Get Started Free</button>
              <button className="btn-outline-white">List Your Property</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-logo">🏠 RentEase</h3>
              <p>Making rental housing simple, transparent, and accessible for everyone.</p>
              <div className="social-links">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📸</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">💼</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>For Renters</h4>
              <ul>
                <li><a href="#">Browse Properties</a></li>
                <li><a href="#">Search by Location</a></li>
                <li><a href="#">Rental Guides</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>For Owners</h4>
              <ul>
                <li><a href="#">List Property</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Manager Resources</a></li>
                <li><a href="#">Success Stories</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 RentEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
