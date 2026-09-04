import { useState } from "react";

import "../styles/Properties.css";
import PropertyCard from "../pages/PropertyCard"; // default export, no {}

export default function Properties() {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    location: ""
  });

  const [sortBy, setSortBy] = useState("featured");
  const [viewType, setViewType] = useState("grid");

  // Dummy properties data
  const allProperties = [
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
    },
    {
      _id: "7",
      title: "Penthouse with City View",
      location: "Banani, Dhaka",
      price: 120000,
      type: "Penthouse",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      featured: true,
      rating: 5.0
    },
    {
      _id: "8",
      title: "Budget-Friendly Studio",
      location: "Mirpur, Dhaka",
      price: 18000,
      type: "Studio",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      featured: false,
      rating: 4.2
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="properties-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Find Your Perfect Home</h1>
          <p>Explore {allProperties.length} verified properties across Dhaka</p>
        </div>
      </div>

      <div className="properties-container">
        <div className="container">
          <div className="properties-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h3>Filters</h3>
                <button className="btn-reset">Reset All</button>
              </div>

              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label>Property Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="filter-input"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Bedrooms</label>
                <div className="bedroom-options">
                  {['1', '2', '3', '4', '5+'].map((num) => (
                    <button
                      key={num}
                      className={`bedroom-btn ${filters.bedrooms === num ? 'active' : ''}`}
                      onClick={() => handleFilterChange('bedrooms', num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Locations</option>
                  <option value="banani">Banani</option>
                  <option value="gulshan">Gulshan</option>
                  <option value="dhanmondi">Dhanmondi</option>
                  <option value="uttara">Uttara</option>
                  <option value="bashundhara">Bashundhara</option>
                  <option value="mirpur">Mirpur</option>
                  <option value="mohammadpur">Mohammadpur</option>
                </select>
              </div>

              <button className="btn-apply-filters">Apply Filters</button>
            </aside>

            {/* Properties List */}
            <main className="properties-main">
              {/* Toolbar */}
              <div className="properties-toolbar">
                <div className="toolbar-left">
                  <p className="results-count">
                    Showing <strong>{allProperties.length}</strong> properties
                  </p>
                </div>

                <div className="toolbar-right">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>

                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewType('grid')}
                      title="Grid View"
                    >
                      ⊞
                    </button>
                    <button
                      className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                      onClick={() => setViewType('list')}
                      title="List View"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid */}
              <div className={`properties-grid-view ${viewType}`}>
                {allProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button className="page-btn" disabled>Previous</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">Next</button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
