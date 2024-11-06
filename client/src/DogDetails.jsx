export const DogDetails = ({ dog, onClose }) => (
  <div>
    <div>
      <button onClick={onClose}>&times;</button>
      <h2>{dog.name}</h2>
      <p>Walker: {dog.walkerName || "No walker assigned"}</p>
      <p>City: {dog.cityName}</p>
    </div>
  </div>
);
