import { addDog, getCities, getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import { Dogs } from "./DogList";
import "./index.css";
import { AddDog } from "./AddDog";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [cities, setCities] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => console.log("Failed to fetch cities"));
  }, []);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    getDogs()
      .then(setDogs)
      .catch(() => console.log("Failed to fetch dogs"));
  };

  const handleAddDog = (newDog) => {
    addDog(newDog)
      .then(() => {
        fetchDogs();
      })
      .catch(() => console.log("Failed to add dog"));
  };

  return (
    <div>
      <p>{greeting.message}</p>
      <Dogs dogs={dogs} />
      <button onClick={() => setIsModalOpen(true)}>Add New Dog</button>
      {isModalOpen && (
        <AddDog
          cities={cities}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddDog}
        />
      )}
    </div>
  );
}
