import "./styling/DogDetails.css";

export const DogDetails = ({ dog, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2>{dog.name}</h2>
      <p>Walker: {dog.walkerName}</p>
      <p>City: {dog.cityName}</p>
    </div>
  </div>
);
