import React from "react";
import "../styles/About.css"; // create a new CSS file for About page

export default function About() {
  return (
    <div className="about-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>About RentEase</h1>
          <p>Your trusted platform to find rental properties across Dhaka</p>
        </div>
      </div>

      {/* About Content */}
      <div className="about-content container">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At RentEase, our mission is to simplify the rental process for tenants and property managers alike. 
            We provide a transparent platform to find verified properties, compare rent prices, and explore homes 
            that fit your lifestyle.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, RentEase started as a small initiative to connect tenants with trustworthy property managers 
            in Dhaka. Today, we serve thousands of users with detailed property listings, rent prediction tools, 
            and a seamless user experience.
          </p>
        </section>

        <section className="about-section">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" />
              <h3>Tanmoy Sarker</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" />
              <h3>Sarah Ahmed</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="Team Member" />
              <h3>Rafi Khan</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Team Member" />
              <h3>Leena Roy</h3>
              <p>Marketing Manager</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or want to list your property? Reach out to us at 
            <a href="mailto:support@rentease.com"> support@rentease.com</a> 
            or call +880 1234 567 890.
          </p>
        </section>
      </div>
    </div>
  );
}