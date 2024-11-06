import { useEffect, useState } from "react";
import { getDogs } from "./apiManager";
import "./DogList.css";
import { DogDetails } from "./DogDetails";

export const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch(() => {
        console.log("Failed to fetch dogs from the API");
      });
  }, []);

  const handleDogClick = (dog) => setSelectedDog(dog);

  const closeModal = () => setSelectedDog(null);
  return (
    <div>
      <h1>Dog List</h1>
      <div className="dog-container">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <div key={dog.id} className="dog-card">
              <h3 onClick={() => handleDogClick(dog)} className="dog-name">
                {dog.name}
              </h3>
            </div>
          ))
        ) : (
          <p>No dogs available</p>
        )}
      </div>
      {selectedDog && <DogDetails dog={selectedDog} onClose={closeModal} />}
    </div>
  );
};
