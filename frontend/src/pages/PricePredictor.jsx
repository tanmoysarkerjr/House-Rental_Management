import React, { useState } from 'react';
import '../styles/PricePredictor.css'; 

function PricePredictor() {
  const [formData, setFormData] = useState({
    area: '',
    bed: '',
    bath: '',
    location: 'Gulshan 1, Gulshan, Dhaka' // Default location
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    
    try {
      // Backend URL (Flask API)
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Sending bed, bath, area, location
      });
      
      const data = await response.json();

      if (data.success) {
        setPrediction(data.price);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please ensure Flask (app.py) is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="price-predictor-page">
      <div className="container">
        <header className="predictor-header text-center mt-3">
          <h1>🏠 Dhaka House Rent Predictor</h1>
          <p>Predict house rent in Dhaka using Machine Learning</p>
        </header>

        <main className="predictor-main mt-2">
          <form onSubmit={handleSubmit} className="prediction-form">
            
            <div className="form-group mb-2">
              <label htmlFor="location">Location (Area in Dhaka)</label>
              <select
                id="location"
                className="form-control"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="Gulshan 1, Gulshan, Dhaka">Gulshan 1</option>
                <option value="Dhanmondi, Dhaka">Dhanmondi</option>
                <option value="Block H, Bashundhara R-A, Dhaka">Bashundhara R-A (Block H)</option>
                <option value="Sector 6, Uttara, Dhaka">Uttara (Sector 6)</option>
                <option value="Mirpur, Dhaka">Mirpur</option>
                <option value="Mohammadpur, Dhaka">Mohammadpur</option>
                <option value="Baridhara, Dhaka">Baridhara</option>
              </select>
              <small className="location-note">*Location must match the dataset exactly</small>
            </div>

            <div className="form-row">
              <div className="form-group mb-1">
                <label htmlFor="area">Area (sq ft)</label>
                <input
                  id="area"
                  type="number"
                  className="form-control"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  placeholder="e.g., 1200"
                  required
                />
              </div>

              <div className="form-group mb-1">
                <label htmlFor="bed">Bedrooms</label>
                <input
                  id="bed"
                  type="number"
                  className="form-control"
                  value={formData.bed}
                  onChange={(e) => setFormData({...formData, bed: e.target.value})}
                  placeholder="e.g., 3"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group mb-2">
                <label htmlFor="bath">Bathrooms</label>
                <input
                  id="bath"
                  type="number"
                  className="form-control"
                  value={formData.bath}
                  onChange={(e) => setFormData({...formData, bath: e.target.value})}
                  placeholder="e.g., 2"
                  required
                />
              </div>
              <div className="form-spacer"></div>
            </div>

            <button 
              type="submit" 
              className="predict-button mt-1" 
              disabled={loading}
            >
              {loading ? '🔄 Calculating...' : '✨ Check Estimated Rent'}
            </button>
          </form>

          {error && (
            <div className="error-message mt-2 text-center fade-in">
              <p>⚠️ {error}</p>
            </div>
          )}

          {prediction && (
            <div className="result-card mt-2 text-center fade-in">
              <h2>Estimated Rent</h2>
              <p className="price">
                ৳ {prediction.toLocaleString()} / month
              </p>
              <p className="disclaimer">
                *Estimate based on {formData.location} area trends.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PricePredictor;
