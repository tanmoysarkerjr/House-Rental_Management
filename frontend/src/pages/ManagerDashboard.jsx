
// import { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import "../styles/ManagerDashboard.css";

// export default function ManagerDashboard() {
//   const { manager } = useAuth();

//   // Initial dummy properties (can start empty)
//   const [properties, setProperties] = useState([]);

//   // Load properties from localStorage on mount
//   useEffect(() => {
//     const savedProperties = localStorage.getItem('rentease_properties');
//     if (savedProperties) {
//       setProperties(JSON.parse(savedProperties));
//     } else if (manager?.properties) {
//       setProperties(manager.properties);
//     }
//   }, [manager]);

//   // Form state
//   const [formData, setFormData] = useState({
//     id: null,
//     title: "",
//     location: "",
//     price: "",
//     bedrooms: "",
//     bathrooms: "",
//     area: "",
//     type: "",
//     image: null
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   // Filters & Sorting
//   const [filters, setFilters] = useState({ type: "", bedrooms: "", location: "" });
//   const [sortBy, setSortBy] = useState("newest");

//   // Handle form input
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Submit Add/Edit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     let updatedProperties;
//     if (isEditing) {
//       updatedProperties = properties.map((p) => (p.id === formData.id ? { ...formData, updatedAt: Date.now() } : p));
//       setIsEditing(false);
//     } else {
//       const newProperty = { 
//         ...formData, 
//         id: Date.now(),
//         createdAt: Date.now(),
//         featured: false,
//         rating: 4.5
//       };
//       updatedProperties = [...properties, newProperty];
//     }
    
//     setProperties(updatedProperties);
    
//     // Save to localStorage so Properties page can access
//     localStorage.setItem('rentease_properties', JSON.stringify(updatedProperties));
    
//     setFormData({
//       id: null,
//       title: "",
//       location: "",
//       price: "",
//       bedrooms: "",
//       bathrooms: "",
//       area: "",
//       type: "",
//       image: null
//     });
//   };

//   // Edit property
//   const handleEdit = (p) => {
//     setFormData(p);
//     setIsEditing(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Delete property
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       const updatedProperties = properties.filter((p) => p.id !== id);
//       setProperties(updatedProperties);
      
//       // Update localStorage
//       localStorage.setItem('rentease_properties', JSON.stringify(updatedProperties));
//     }
//   };

//   // Filtered and sorted properties
//   const displayedProperties = properties
//     .filter((p) => (!filters.type || p.type.toLowerCase() === filters.type.toLowerCase()))
//     .filter((p) => (!filters.bedrooms || p.bedrooms.toString() === filters.bedrooms))
//     .filter((p) => (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())))
//     .sort((a, b) => {
//       if (sortBy === "price-low") return a.price - b.price;
//       if (sortBy === "price-high") return b.price - a.price;
//       return b.id - a.id; // newest first
//     });

//   return (
//     <div className="manager-dashboard">
//       {/* Welcome Banner */}
//       <div className="welcome-banner">
//         <div className="welcome-content">
//           <div className="user-avatar-large">
//             {manager?.name?.charAt(0)?.toUpperCase() || "M"}
//           </div>
//           <div className="welcome-text">
//             <h1>Welcome Back, {manager?.name || "Manager"}! 👋</h1>
//             <p>Manage your properties and grow your rental business</p>
//           </div>
//         </div>
//         <div className="quick-stats">
//           <div className="stat-item">
//             <div className="stat-icon">🏘️</div>
//             <div className="stat-details">
//               <span className="stat-number">{properties.length}</span>
//               <span className="stat-label">Properties</span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-icon">💰</div>
//             <div className="stat-details">
//               <span className="stat-number">
//                 ৳{properties.reduce((sum, p) => sum + parseInt(p.price || 0), 0).toLocaleString()}
//               </span>
//               <span className="stat-label">Total Value</span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-icon">📊</div>
//             <div className="stat-details">
//               <span className="stat-number">{displayedProperties.length}</span>
//               <span className="stat-label">Showing</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters & Sort */}
//       <div className="filters-bar">
//         <select 
//           value={filters.type} 
//           onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//         >
//           <option value="">🏘️ All Types</option>
//           <option value="apartment">🏢 Apartment</option>
//           <option value="house">🏠 House</option>
//           <option value="villa">🏰 Villa</option>
//           <option value="studio">🏬 Studio</option>
//         </select>

//         <select 
//           value={filters.bedrooms} 
//           onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
//         >
//           <option value="">🛏️ Any Bedrooms</option>
//           <option value="1">1 Bedroom</option>
//           <option value="2">2 Bedrooms</option>
//           <option value="3">3 Bedrooms</option>
//           <option value="4">4+ Bedrooms</option>
//         </select>

//         <input
//           type="text"
//           placeholder="🔍 Search location..."
//           value={filters.location}
//           onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//         />

//         <select 
//           value={sortBy} 
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="newest">📅 Newest First</option>
//           <option value="price-low">💰 Price: Low → High</option>
//           <option value="price-high">💰 Price: High → Low</option>
//         </select>
//       </div>

//       {/* Add/Edit Property Form */}
//       <div className="add-edit-property-card">
//         <h2>{isEditing ? "Edit Property" : "Add New Property"}</h2>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="text" 
//             name="title" 
//             placeholder="Property Title" 
//             value={formData.title} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="location" 
//             placeholder="Location (e.g., Dhaka, Gulshan)" 
//             value={formData.location} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="number" 
//             name="price" 
//             placeholder="Monthly Rent (৳)" 
//             value={formData.price} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="number" 
//             name="bedrooms" 
//             placeholder="Number of Bedrooms" 
//             value={formData.bedrooms} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="number" 
//             name="bathrooms" 
//             placeholder="Number of Bathrooms" 
//             value={formData.bathrooms} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="number" 
//             name="area" 
//             placeholder="Area (sq ft)" 
//             value={formData.area} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="type" 
//             placeholder="Type (Apartment/House/Villa/Studio)" 
//             value={formData.type} 
//             onChange={handleChange} 
//             required 
//           />
//           <input 
//             type="file" 
//             name="image" 
//             accept="image/*" 
//             onChange={handleChange} 
//           />
//           <button type="submit">
//             {isEditing ? "✓ Update Property" : "+ Add Property"}
//           </button>
//         </form>
//       </div>

//       {/* Property Grid */}
//       <div className="properties-grid">
//         {displayedProperties.length === 0 && (
//           <p>📭 No properties found. Start by adding your first property!</p>
//         )}
//         {displayedProperties.map((p) => (
//           <div key={p.id} className="property-card">
//             {p.image && <img src={URL.createObjectURL(p.image)} alt={p.title} />}
//             <h4>{p.title}</h4>
//             <p>{p.location}</p>
//             <p>
//               <strong>৳{parseInt(p.price).toLocaleString()}/month</strong>
//               <br />
//               🛏️ {p.bedrooms} Bed • 🚿 {p.bathrooms} Bath • 📐 {p.area} sqft
//               <br />
//               🏷️ {p.type}
//             </p>
//             <div className="property-actions">
//               <button onClick={() => handleEdit(p)}>✏️ Edit</button>
//               <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



