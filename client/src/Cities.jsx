import { useEffect, useState } from "react";
import { getCities, addCity } from "./apiManager";
import "./styling/Cities.css";

export const Cities = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => console.log("Failed to fetch cities"));
  }, []);

  const handleAddCity = () => {
    if (newCity.trim()) {
      addCity(newCity)
        .then((city) => {
          setCities((prevCities) => [...prevCities, city]);
          setNewCity("");
        })
        .catch(() => console.log("Failed to add city"));
    }
  };

  return (
    <div className="cities-container">
      <h1>Cities</h1>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter city name"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
      />
      <button onClick={handleAddCity}>Add City</button>
    </div>
  );
};
