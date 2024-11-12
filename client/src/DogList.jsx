import { useEffect, useState } from "react";
import { getDogs, deleteDog } from "./apiManager";
import "./styling/DogList.css";
import { DogDetails } from "./DogDetails";

export const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    getDogs()
      .then(setDogs)
      .catch(() => console.log("Failed to fetch dogs"));
  };

  const handleDogClick = (dog) => setSelectedDog(dog);

  const handleRemoveDog = (dogId) => {
    deleteDog(dogId)
      .then(() => {
        fetchDogs(); // Refresh the dog list after deletion
      })
      .catch(() => console.log("Failed to delete dog"));
  };

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
              <button onClick={() => handleRemoveDog(dog.id)}>Remove</button>
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
