import { useEffect, useState } from "react";
import { getCities, getWalkersByCity, deleteWalker } from "./apiManager";
import { useNavigate } from "react-router-dom";
import "./styling/Walkers.css";

export const Walkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [allWalkers, setAllWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => console.log("Failed to fetch cities"));

    fetchWalkers();
  }, []);

  const fetchWalkers = () => {
    getWalkersByCity()
      .then((walkers) => {
        const updatedWalkers = walkers.map((walker) => ({
          ...walker,
          cityNames:
            walker.cityNames.length > 0
              ? walker.cityNames
              : ["No cities assigned"],
        }));
        setAllWalkers(updatedWalkers);
        setWalkers(updatedWalkers);
      })
      .catch(() => console.log("Failed to fetch walkers"));
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    if (cityId === "") {
      // If "All Cities" is selected, show all walkers
      setWalkers(allWalkers);
    } else {
      // Filter walkers based on the selected city
      const filteredWalkers = allWalkers.filter((walker) =>
        walker.cityIds.includes(parseInt(cityId))
      );
      setWalkers(filteredWalkers);
    }
  };

  const handleAddDogClick = (walkerId) => {
    navigate(`/walkers/${walkerId}/dogs`);
  };

  const handleEditWalkerClick = (walkerId) => {
    navigate(`/walkers/${walkerId}/edit`);
  };

  const handleRemoveWalker = (walkerId) => {
    deleteWalker(walkerId)
      .then(() => {
        fetchWalkers(); // Refresh the list of walkers after deleting
      })
      .catch(() => console.log("Failed to delete walker"));
  };

  return (
    <div className="walkers-container">
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
            <div key={walker.id} className="walker-card">
              <h3>{walker.name}</h3>
              <p>Cities: {walker.cityNames.join(", ")}</p>
              <button onClick={() => handleAddDogClick(walker.id)}>
                Add Dog
              </button>
              <button onClick={() => handleEditWalkerClick(walker.id)}>
                Edit Walker
              </button>
              <button onClick={() => handleRemoveWalker(walker.id)}>
                Remove Walker
              </button>
            </div>
          ))
        ) : (
          <p>No walkers available</p>
        )}
      </div>
    </div>
  );
};
