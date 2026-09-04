from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app) 

# Directory setup (model and code must be in same folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1. Load model and location encoder
try:
    model = joblib.load(os.path.join(BASE_DIR, 'house_rent_model_dhaka.pkl'))
    le_location = joblib.load(os.path.join(BASE_DIR, 'location_encoder.pkl'))
    print("✅ All models and encoders loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    print("Ensure 'house_rent_model_dhaka.pkl' and 'location_encoder.pkl' are in the same folder.")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Debug: Print received data
    print("\n" + "="*50)
    print("📥 RECEIVED REQUEST:")
    print(f"Data: {data}")
    print("="*50 + "\n")
    
    try:
        # 2. Receive input data
        # Frontend must send these keys: 'location', 'area', 'bed', 'bath'
        
        # Check if all required keys exist
        required_keys = ['location', 'area', 'bed', 'bath']
        missing_keys = [key for key in required_keys if key not in data]
        
        if missing_keys:
            error_msg = f"Missing required fields: {', '.join(missing_keys)}"
            print(f"❌ ERROR: {error_msg}")
            return jsonify({
                'success': False,
                'error': error_msg
            }), 400
        
        loc_input = data['location']
        area_input = float(data['area'])
        bed_input = int(data['bed'])
        bath_input = int(data['bath'])
        
        print(f"✅ Parsed inputs:")
        print(f"   Location: {loc_input}")
        print(f"   Area: {area_input} sq ft")
        print(f"   Bedrooms: {bed_input}")
        print(f"   Bathrooms: {bath_input}")
        
        # 3. Location encoding (handle unknown locations)
        try:
            # Location name must exactly match training data (e.g., "Gulshan 1, Gulshan, Dhaka")
            location_enc = le_location.transform([loc_input])[0]
            print(f"✅ Location encoded: {location_enc}")
        except ValueError:
            # If user provides a location not in our dataset
            error_msg = f"Location '{loc_input}' not supported within trained dataset."
            print(f"❌ ERROR: {error_msg}")
            return jsonify({
                'success': False,
                'error': error_msg
            }), 400
        
        # 4. Create feature array (in training order: Location, Area, Bed, Bath)
        features = np.array([[
            location_enc, 
            area_input, 
            bed_input, 
            bath_input
        ]])
        
        print(f"✅ Feature array: {features}")
        
        # 5. Prediction
        prediction = model.predict(features)[0]
        
        print(f"✅ PREDICTION: ৳{prediction:,.2f}")
        print("="*50 + "\n")
        
        # 6. Success response
        return jsonify({
            'success': True,
            'price': round(prediction, 2),
            'currency': 'BDT'
        })
        
    except KeyError as e:
        # Key error - missing field
        error_msg = f"Missing field: {str(e)}"
        print(f"❌ KeyError: {error_msg}")
        return jsonify({
            'success': False,
            'error': error_msg
        }), 400
        
    except ValueError as e:
        # Value error - invalid data type
        error_msg = f"Invalid value: {str(e)}"
        print(f"❌ ValueError: {error_msg}")
        return jsonify({
            'success': False,
            'error': error_msg
        }), 400
        
    except Exception as e:
        # General error
        error_msg = str(e)
        print(f"❌ Unexpected error: {error_msg}")
        return jsonify({
            'success': False,
            'error': error_msg
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='127.0.0.1')
