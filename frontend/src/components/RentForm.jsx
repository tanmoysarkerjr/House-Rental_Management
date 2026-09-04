import { useState } from "react";
import "../styles/RentForm.css";

export default function RentForm({ property, onRent }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRent({ propertyId: property._id, name, phone });
    alert("Rent request submitted!");
    setName("");
    setPhone("");
  };

  return (
    <form className="rent-form" onSubmit={handleSubmit}>
      <h3>Rent {property.title}</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Submit Rent Request</button>
    </form>
  );
}
