import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './AllPets.css'; // Optional styling file
import { AuthContext } from '../context/AuthContext';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptMsg, setAdoptMsg] = useState('');
  const [adoptError, setAdoptError] = useState('');
  const [adoptSuccess, setAdoptSuccess] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('Failed to load pets. Please try again later.');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleAdoptClick = (pet) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setSelectedPet(pet);
    setShowModal(true);
    setAdoptMsg('');
    setAdoptError('');
    setAdoptSuccess('');
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setAdoptError('');
    setAdoptSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ petId: selectedPet._id, message: adoptMsg }),
      });
      if (!res.ok) throw new Error('Failed to submit application');
      setAdoptSuccess('Adoption request sent!');
      setShowModal(false);
    } catch (err) {
      setAdoptError('Could not send request.');
    }
  };

  if (loading) {
    return (
      <div className="all-pets-container">
        <div className="loading">Loading pets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-pets-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-pets-container">
      <h2>Available Pets for Adoption</h2>
      <div className="pets-grid">
        {pets.length === 0 ? (
          <p>No pets available for adoption at the moment.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img 
                src={
                  pet.image ||
                  `/images/pets/${pet.name.toLowerCase() === 'max' ? 'max.jpg' : pet.name.toLowerCase() === 'luna' ? 'luna.jpg' : pet.name.toLowerCase() === 'bugs' ? 'bugs.jpeg' : 'max.jpg'}`
                } 
                alt={pet.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/pets/max.jpg';
                }}
              />
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Status:</strong> <span className={pet.status.toLowerCase()}>{pet.status}</span></p>
              <p><strong>Description:</strong> {pet.description}</p>
              <button
                className="view-shelter-btn"
                onClick={() => handleAdoptClick(pet)}
              >
                Adopt Now
              </button>
            </div>
          ))
        )}
      </div>
      {/* Adoption Modal */}
      {showModal && (
        <div className="adopt-modal">
          <div className="adopt-modal-content">
            <h3>Request Adoption for {selectedPet.name}</h3>
            <form onSubmit={handleAdoptSubmit}>
              <textarea
                placeholder="Why do you want to adopt?"
                value={adoptMsg}
                onChange={e => setAdoptMsg(e.target.value)}
                required
                style={{ width: '100%', minHeight: '60px', borderRadius: '8px', border: '1.5px solid #0cc0df', marginBottom: '1rem', padding: '0.5rem' }}
              />
              <button type="submit" className="adopt-modal-btn">Send Request</button>
              <button type="button" className="adopt-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
            {adoptError && <div className="adopt-modal-error">{adoptError}</div>}
            {adoptSuccess && <div className="adopt-modal-success">{adoptSuccess}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPets;
