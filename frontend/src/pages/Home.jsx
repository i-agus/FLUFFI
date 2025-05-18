import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './Home.css';

const Home = () => {
  const { pets, shelters, loading } = useContext(DataContext);

  return (
    <div className="home-page">
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Welcome to furever</h1>
          <p style={styles.subtitle}>
            At furever, we love helping people connect with pets who need a home.
            Join our community and make a difference, because every pet deserves a loving home.
          </p>
          <div style={styles.buttons}>
            <Link to="/shelters" style={styles.primaryButton}>
              Browse Shelters
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.infoSection}>
        <div style={styles.stats}>
          {loading ? (
            <p>Loading statistics...</p>
          ) : (
            <>
              <div style={styles.statBox}>
                <span style={styles.statNumber}>{shelters.length}</span>
                <span style={styles.statLabel}>Partner Shelters</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statNumber}>{pets.length}</span>
                <span style={styles.statLabel}>Pets Available</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Browse Shelters</h3>
            <p style={styles.stepDescription}>
              Explore our network of verified animal shelters and rescue organizations.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Find Your Pet</h3>
            <p style={styles.stepDescription}>
              View available pets at each shelter and learn about their stories.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>Apply To Adopt</h3>
            <p style={styles.stepDescription}>
              Complete an adoption application for your chosen pet companion.
            </p>
          </div>
        </div>
      </div>

      {!loading && pets.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recently Added Pets</h2>
          <div style={styles.featuredPets}>
            {pets.slice(0, 3).map(pet => (
              <div key={pet._id} style={styles.petCard}>
                <img 
                  src={pet.image || '/images/pets/default_pet.jpg'} 
                  alt={pet.name}
                  style={styles.petImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/pets/default_pet.jpg';
                  }}
                />
                <div style={styles.petInfo}>
                  <h3 style={styles.petName}>{pet.name}</h3>
                  <p>{pet.breed} · {pet.age} years old</p>
                  <Link 
                    to={`/shelters/${pet.shelterId?._id || pet.shelterId}`} 
                    style={styles.viewButton}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="nav-icons-section">
        <div className="nav-icons-container">
          <Link to="/about" className="nav-icon">
            <img src="/images/icons/about-icon.png" alt="About" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/icons/default-icon.png';
            }} />
            <span>About</span>
          </Link>
          <Link to="/contact" className="nav-icon">
            <img src="/images/icons/contact-icon.png" alt="Contact" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/icons/default-icon.png';
            }} />
            <span>Contact</span>
          </Link>
          <Link to="/faqs" className="nav-icon">
            <img src="/images/icons/faq-icon.png" alt="FAQs" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/icons/default-icon.png';
            }} />
            <span>FAQs</span>
          </Link>
          <Link to="/pets" className="nav-icon">
            <img src="/images/icons/pets-icon.png" alt="All Pets" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/icons/default-icon.png';
            }} />
            <span>All Pets</span>
          </Link>
          <Link to="/shelters" className="nav-icon">
            <img src="/images/icons/shelters-icon.png" alt="Shelters" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/icons/default-icon.png';
            }} />
            <span>Shelters</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '2rem',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/images/pets/happy_pets.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  primaryButton: {
    backgroundColor: '#e05e7c',
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1rem',
    letterSpacing: '1px',
    transition: 'background 0.2s',
  },
  infoSection: {
    marginBottom: '3rem',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    width: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#e05e7c',
  },
  statLabel: {
    marginTop: '0.5rem',
    color: '#e05e7c',
    fontSize: '1rem',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '2rem',
  },
  steps: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  step: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  stepNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    backgroundColor: '#e05e7c',
    color: 'white',
    borderRadius: '50%',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  stepTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  stepDescription: {
    color: '#555',
    lineHeight: '1.5',
  },
  featuredPets: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  petCard: {
    width: '300px',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  petImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  petInfo: {
    padding: '1rem',
    textAlign: 'center',
  },
  petName: {
    fontSize: '1.3rem',
    color: '#333',
    margin: '0 0 0.5rem 0',
  },
  viewButton: {
    display: 'inline-block',
    marginTop: '1rem',
    textDecoration: 'none',
    backgroundColor: '#e05e7c',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'background 0.2s',
  },
};

export default Home;