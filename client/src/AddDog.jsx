import { useState } from "react";
import "./styling/AddDog.css";

export const AddDog = ({ cities, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, cityId: selectedCity });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add a New Dog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Dog</button>
        </form>
      </div>
    </div>
  );
};
