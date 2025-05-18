// src/pages/ShelterDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ShelterDetail = () => {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptMsg, setAdoptMsg] = useState('');
  const [adoptError, setAdoptError] = useState('');
  const [adoptSuccess, setAdoptSuccess] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/shelters/${id}`);
        setShelter(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching shelter details:', err);
        setError('Failed to load shelter details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading shelter details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        <button 
          style={styles.button}
          onClick={() => navigate('/shelters')}
        >
          Back to Shelters
        </button>
      </div>
    );
  }

  if (!shelter) {
    return (
      <div style={styles.notFoundContainer}>
        <h2>Shelter Not Found</h2>
        <p>The shelter you're looking for doesn't exist or has been removed.</p>
        <button 
          style={styles.button}
          onClick={() => navigate('/shelters')}
        >
          Back to Shelters
        </button>
      </div>
    );
  }

  const handleAdoptClick = (pet) => {
    if (!user) {
      setShowLoginPopup(true);
      setTimeout(() => {
        setShowLoginPopup(false);
        navigate('/login');
      }, 1500);
      return;
    }
    setSelectedPet(pet);
    setShowModal(true);
    setAdoptMsg('');
    setAdoptError('');
    setAdoptSuccess('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <Link to="/shelters" style={styles.backLink}>
          &larr; Back to All Shelters
        </Link>
      </div>

      <div style={styles.shelterHeader}>
        <div style={styles.imageContainer}>
          <img 
            src={shelter.image || '/images/shelters/happy_paws.jpg'} 
            alt={shelter.name} 
            style={styles.shelterImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/shelters/happy_paws.jpg';
            }}
          />
        </div>
        
        <div style={styles.shelterInfo}>
          <h1 style={styles.shelterName}>{shelter.name}</h1>
          
          <div style={styles.contactInfo}>
            <p><strong>Address:</strong> {shelter.address}</p>
            <p><strong>Phone:</strong> {shelter.phone}</p>
            <p><strong>Email:</strong> {shelter.email}</p>
          </div>
          
          <div style={styles.shelterDescription}>
            <h3>About this Shelter</h3>
            <p>{shelter.description || 'No description available for this shelter.'}</p>
          </div>
        </div>
      </div>

      <div style={styles.petsSection}>
        <h2 style={styles.petsSectionTitle}>Pets at this Shelter</h2>
        
        {!shelter.pets || shelter.pets.length === 0 ? (
          <p style={styles.noPets}>No pets currently available at this shelter.</p>
        ) : (
          <div style={styles.petsList}>
            {shelter.pets.map(pet => (
              <div key={pet._id} style={styles.petCard}>
                <img 
                  src={pet.image || '/images/pets/default_pet.jpeg'} 
                  alt={pet.name}
                  style={styles.petImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/pets/default_pet.jpeg';
                  }}
                />
                <div style={styles.petInfo}>
                  <h3 style={styles.petName}>{pet.name}</h3>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age} years</p>
                  <p><strong>Gender:</strong> {pet.gender}</p>
                  <p><strong>Status:</strong> <span style={getStatusStyle(pet.status)}>{pet.status}</span></p>
                  <p style={styles.petDescription}>{pet.description}</p>
                  {pet.status === 'Available' && (
                    <button
                      className="view-shelter-btn"
                      onClick={() => handleAdoptClick(pet)}
                    >
                      Adopt Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="adopt-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(224, 94, 124, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="adopt-modal-content" style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 4px 16px rgba(224, 94, 124, 0.15)',
            border: '1.5px solid #e05e7c'
          }}>
            <h3 style={{ color: '#e05e7c', marginTop: 0 }}>Request Adoption for {selectedPet.name}</h3>
            <form
              onSubmit={async (e) => {
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
              }}
            >
              <textarea
                placeholder="Why do you want to adopt?"
                value={adoptMsg}
                onChange={e => setAdoptMsg(e.target.value)}
                required
                style={{
                  width: '100%',
                  minHeight: '120px',
                  borderRadius: '8px',
                  border: '1.5px solid #e05e7c',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#fff',
                    color: '#e05e7c',
                    border: '1.5px solid #e05e7c',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#e05e7c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  Send Request
                </button>
              </div>
            </form>
            {adoptError && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fff5f7',
                color: '#e05e7c',
                borderRadius: '4px',
                border: '1.5px solid #e05e7c',
                fontSize: '0.9rem'
              }}>
                {adoptError}
              </div>
            )}
            {adoptSuccess && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fff5f7',
                color: '#e05e7c',
                borderRadius: '4px',
                border: '1.5px solid #e05e7c',
                fontSize: '0.9rem'
              }}>
                {adoptSuccess}
              </div>
            )}
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div style={{
          position: 'fixed',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#e05e7c',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(224, 94, 124, 0.2)',
          zIndex: 9999,
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: '1.5px solid #d14d6b',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          Please login first to adopt a pet.
        </div>
      )}
    </div>
  );
};

// Helper function to style pet status differently based on value
const getStatusStyle = (status) => {
  switch (status) {
    case 'Available':
      return { color: '#e05e7c', fontWeight: 'bold' };
    case 'Pending':
      return { color: '#d14d6b', fontWeight: 'bold' };
    case 'Adopted':
      return { color: '#222', fontWeight: 'bold' };
    default:
      return { fontWeight: 'bold' };
  }
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    background: '#fff5f7',
  },
  navigation: {
    marginBottom: '2rem',
  },
  backLink: {
    color: '#e05e7c',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.2s',
    ':hover': {
      color: '#d14d6b'
    }
  },
  shelterHeader: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  imageContainer: {
    flex: '0 0 400px',
  },
  shelterImage: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(224, 94, 124, 0.15)',
    border: '1.5px solid #e05e7c',
  },
  shelterInfo: {
    flex: '1 1 500px',
  },
  shelterName: {
    color: '#e05e7c',
    marginTop: 0,
    marginBottom: '1rem',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  contactInfo: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1.5px solid #e05e7c',
  },
  shelterDescription: {
    lineHeight: '1.6',
    color: '#444',
  },
  petsSection: {
    marginTop: '2rem',
  },
  petsSectionTitle: {
    textAlign: 'center',
    color: '#e05e7c',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '700',
  },
  petsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  petCard: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(224, 94, 124, 0.08)',
    border: '1.5px solid #e05e7c',
    flexWrap: 'wrap',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(224, 94, 124, 0.15)',
    }
  },
  petImage: {
    width: '300px',
    height: '250px',
    objectFit: 'cover',
  },
  petInfo: {
    flex: 1,
    padding: '1.5rem',
    minWidth: '300px',
  },
  petName: {
    margin: '0 0 1rem 0',
    color: '#e05e7c',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  petDescription: {
    margin: '1rem 0',
    color: '#666',
    lineHeight: '1.5',
  },
  adoptButton: {
    backgroundColor: '#e05e7c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    letterSpacing: '1px',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#d14d6b',
      transform: 'translateY(-2px)',
    }
  },
  noPets: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1.5px solid #e05e7c',
    color: '#e05e7c',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
  loadingSpinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #e05e7c',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff5f7',
    borderRadius: '8px',
    color: '#e05e7c',
    maxWidth: '600px',
    margin: '3rem auto',
    border: '1.5px solid #e05e7c',
  },
  notFoundContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff5f7',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '3rem auto',
    border: '1.5px solid #e05e7c',
    color: '#e05e7c',
  },
  button: {
    backgroundColor: '#e05e7c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#d14d6b',
      transform: 'translateY(-2px)',
    }
  },
};

export default ShelterDetail;