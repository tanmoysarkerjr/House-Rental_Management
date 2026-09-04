// pages/manager/AddProperty.jsx - Add New Property
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/AddProperty.css';

export default function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Apartment',
    price: '',
    address: '',
    city: 'Dhaka',
    area: '',
    bedrooms: 1,
    bathrooms: 1,
    propertyArea: '',
    amenities: [],
    furnished: false,
    parking: false,
    gym: false,
    pool: false,
    elevator: false,
    security: false,
    generator: false
  });

  const amenitiesList = [
    '24/7 Security', 'Elevator', 'Parking Space', 'Gym', 'Swimming Pool',
    'Generator', 'CCTV', 'Rooftop Garden', 'Intercom', 'Gas Connection',
    'WiFi', 'AC', 'Balcony', 'Store Room', 'Servant Room'
  ];

  const propertyTypes = ['Apartment', 'House', 'Studio', 'Villa', 'Penthouse', 'Condo'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity]
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadedImages = [];
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await api.post('/upload/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        uploadedImages.push({
          url: res.data.data.url,
          public_id: res.data.data.public_id,
          caption: ''
        });
      }

      setImages([...images, ...uploadedImages]);
    } catch (error) {
      alert('Failed to upload images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: Number(formData.price),
        location: {
          address: formData.address,
          city: formData.city,
          area: formData.area
        },
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.propertyArea),
        images: images,
        amenities: formData.amenities,
        features: {
          furnished: formData.furnished,
          parking: formData.parking,
          gym: formData.gym,
          pool: formData.pool,
          elevator: formData.elevator,
          security: formData.security,
          generator: formData.generator
        }
      };

      const res = await api.post('/properties', propertyData);

      if (res.data.success) {
        alert('Property added successfully! Waiting for admin approval.');
        navigate('/manager/properties');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add property');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="container">
        <div className="page-header">
          <h1>Add New Property</h1>
          <p>Fill in the details below to list your property</p>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label>Property Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Modern 2 Bedroom Apartment in Banani"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your property..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Property Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Monthly Rent (৳) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="35000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="form-section">
            <h2>Location</h2>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House 45, Road 12"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Banani, Gulshan, Dhanmondi..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="form-section">
            <h2>Property Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Area (sqft) *</label>
                <input
                  type="number"
                  name="propertyArea"
                  value={formData.propertyArea}
                  onChange={handleChange}
                  placeholder="1200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="form-section">
            <h2>Features</h2>
            <div className="features-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                />
                <span>Furnished</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                />
                <span>Parking</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="gym"
                  checked={formData.gym}
                  onChange={handleChange}
                />
                <span>Gym</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="pool"
                  checked={formData.pool}
                  onChange={handleChange}
                />
                <span>Swimming Pool</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="elevator"
                  checked={formData.elevator}
                  onChange={handleChange}
                />
                <span>Elevator</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="security"
                  checked={formData.security}
                  onChange={handleChange}
                />
                <span>24/7 Security</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="generator"
                  checked={formData.generator}
                  onChange={handleChange}
                />
                <span>Generator</span>
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div className="form-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  className={`amenity-btn ${formData.amenities.includes(amenity) ? 'active' : ''}`}
                  onClick={() => handleAmenityToggle(amenity)}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="form-section">
            <h2>Property Images *</h2>
            <p className="help-text">Upload at least 3 images (Max 10)</p>

            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                id="image-input"
                style={{ display: 'none' }}
              />
              <label htmlFor="image-input" className="upload-btn">
                📷 Upload Images
              </label>
            </div>

            {images.length > 0 && (
              <div className="image-preview-grid">
                {images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image.url} alt={`Property ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/manager/properties')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading || images.length === 0}
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
