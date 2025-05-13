// src/components/ShelterCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ShelterCard = ({ shelter }) => {
  const petCount = shelter.pets?.length || 0;
  
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={shelter.image || '/images/shelters/default_shelter.jpg'} 
          alt={shelter.name}
          style={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/shelters/default_shelter.jpg';
          }}
        />
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.name}>{shelter.name}</h3>
        
        <div style={styles.details}>
          <p style={styles.location}>{shelter.address}</p>
          <p style={styles.petCount}>{petCount} {petCount === 1 ? 'pet' : 'pets'} available</p>
        </div>
        
        <p style={styles.description}>
          {shelter.description 
            ? (shelter.description.length > 120 
                ? shelter.description.substring(0, 120) + '...' 
                : shelter.description)
            : 'No description available for this shelter.'}
        </p>
        
        <Link to={`/shelters/${shelter._id}`} style={styles.viewButton}>
          View Details
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  },
  imageContainer: {
    height: '180px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    color: '#333',
    fontSize: '1.3rem',
    marginTop: 0,
    marginBottom: '0.5rem',
  },
  details: {
    marginBottom: '0.75rem',
  },
  location: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0 0 0.25rem 0',
  },
  petCount: {
    color: '#0cc0df',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    margin: 0,
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0 0 1rem 0',
    lineHeight: '1.4',
    flex: 1,
  },
  viewButton: {
    backgroundColor: '#0cc0df',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start',
    letterSpacing: '1px',
    transition: 'background 0.2s',
  },
};

export default ShelterCard;