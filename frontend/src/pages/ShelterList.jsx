// src/pages/ShelterList.jsx
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import ShelterCard from '../components/ShelterCard';
import { Link } from 'react-router-dom';

const ShelterList = () => {
  const { shelters, loading, error } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter shelters based on search term
  const filteredShelters = shelters.filter(shelter => 
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading shelters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h3>Error Loading Shelters</h3>
        <p>{error}</p>
        <p>Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Available Pet Shelters</h1>
        <div style={styles.actions}>
          <input
            type="text"
            placeholder="Search shelters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <Link to="/" style={styles.homeButton}>Home</Link>
        </div>
      </div>

      {shelters.length === 0 ? (
        <div style={styles.noShelters}>
          <p>No shelters found. Please check back later.</p>
        </div>
      ) : (
        <>
          <p style={styles.shelterCount}>
            Found {filteredShelters.length} shelters
          </p>
          
          <div style={styles.shelterGrid}>
            {filteredShelters.map(shelter => (
              <ShelterCard key={shelter._id} shelter={shelter} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  title: {
    color: '#333',
    margin: '0',
    fontSize: '2rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  searchInput: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '250px',
  },
  homeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  shelterGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
  shelterCount: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '1rem',
  },
  noShelters: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
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
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
    color: '#c62828',
    maxWidth: '600px',
    margin: '3rem auto',
  },
};

export default ShelterList;