import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCities, getWalkerById, updateWalker } from "./apiManager";

export const EditWalker = () => {
  const { walkerId } = useParams();
  const navigate = useNavigate();
  const [walker, setWalker] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => console.log("Failed to fetch cities"));

    getWalkerById(walkerId)
      .then((data) => {
        setWalker({
          ...data,
          cityIds: Array.isArray(data.cityIds) ? data.cityIds : [],
        });
      })
      .catch(() => console.log("Failed to fetch walker by ID"));
  }, [walkerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWalker({ ...walker, [name]: value });
  };

  const handleCityChange = (cityId) => {
    if (walker.cityIds.includes(cityId)) {
      setWalker({
        ...walker,
        cityIds: walker.cityIds.filter((id) => id !== cityId),
      });
    } else {
      setWalker({ ...walker, cityIds: [...walker.cityIds, cityId] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWalker(walkerId, walker)
      .then(() => navigate("/walkers"))
      .catch(() => console.log("Failed to update walker"));
  };

  if (!walker || cities.length === 0) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Walker Name:
        <input
          type="text"
          name="name"
          value={walker.name || ""}
          onChange={handleInputChange}
        />
      </label>

      <fieldset>
        <legend>Cities</legend>
        {cities.map((city) => (
          <div key={city.id}>
            <label>
              <input
                type="checkbox"
                checked={walker.cityIds.includes(city.id)}
                onChange={() => handleCityChange(city.id)}
              />
              {city.name}
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit">Update</button>
    </form>
  );
};
