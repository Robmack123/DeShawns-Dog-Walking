import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  assignWalkerToDog,
  getAvailableDogsForWalker,
  getWalkerById,
} from "./apiManager";
import "./styling/DogDetails.css";

export const AvailableDogs = () => {
  const { walkerId } = useParams();
  const [availableDogs, setAvailableDogs] = useState([]);
  const [walkerName, setWalkerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getWalkerById(walkerId).then((walker) => setWalkerName(walker.name));
  }, []);

  useEffect(() => {
    getAvailableDogsForWalker(walkerId)
      .then(setAvailableDogs)
      .catch(() => console.log("Failed to fetch available dogs"));
  }, [walkerId]);

  const handleDogSelect = (dogId) => {
    assignWalkerToDog(walkerId, dogId)
      .then(() => {
        alert("Walker successfully assigned to the dog");
        navigate("/walkers");
      })
      .catch(() => console.log("failed to assign walker to dog"));
  };

  return (
    <div className="available-dogs-container">
      <h1>Available Dogs for {walkerName}</h1>
      {availableDogs.length > 0 ? (
        <div className="available-dogs-list">
          {availableDogs.map((dog) => (
            <div key={dog.id} className="dog-card">
              <h3>{dog.name}</h3>
              <p>City: {dog.cityName}</p>
              <button onClick={() => handleDogSelect(dog.id)}>
                Assign Walker
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No available dogs in this walker's cities</p>
      )}
      <button onClick={() => navigate("/walkers")}>Back to Walkers</button>
    </div>
  );
};
