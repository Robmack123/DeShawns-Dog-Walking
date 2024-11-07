import { useEffect, useState } from "react";
import { getCities, getWalkersByCity } from "./apiManager";

export const Walkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => console.log("failed to fetch cities"));

    getWalkersByCity()
      .then(setWalkers)
      .catch(() => console.log("failed to fetch walkers"));
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    getWalkersByCity(cityId)
      .then(setWalkers)
      .catch(() => console.log("failed to fetch walkers for city"));
  };

  return (
    <div>
      <h1>Walkers</h1>
      <label>Filter by City: </label>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <div className="walkers-list">
        {walkers.length > 0 ? (
          walkers.map((walker) => (
            <div
              key={`${walker.walkerId}-${walker.cityId}`}
              className="walker-card"
            >
              <h3>{walker.walkerName}</h3>
              <p>City: {walker.cityName}</p>
            </div>
          ))
        ) : (
          <p>No walkers available</p>
        )}
      </div>
    </div>
  );
};
