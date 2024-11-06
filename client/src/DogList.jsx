import { useEffect, useState } from "react";
import { getDogs } from "./apiManager";
import "./DogList.css";

export const Dogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch(() => {
        console.log("Failed to fetch dogs from the API");
      });
  }, []);

  return (
    <div>
      <h1>Dog List</h1>
      {dogs.length > 0 ? (
        dogs.map((dog) => (
          <div className="dog-container">
            <div key={dog.id} className="dog-card">
              <h3>• {dog.name}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>No dogs available</p>
      )}
    </div>
  );
};
