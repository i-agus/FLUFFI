// src/pages/AddEditPet.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AddEditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    age: '',
    breed: '',
    type: 'Dog',
    gender: 'Male',
    status: 'Available',
    description: '',
    image: '',
    shelterId: ''
  });

  // Fetch shelters for dropdown
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shelters');
        setShelters(response.data);
      } catch (err) {
        console.error("Failed to fetch shelters:", err);
        setError("Failed to load shelters. Please try again.");
      }
    };

    fetchShelters();
  }, []);

  // Fetch pet data if editing
  useEffect(() => {
    const fetchPetData = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
          setForm(response.data);
        } catch (err) {
          setError('Failed to load pet data. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPetData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/pets/${id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/pets', form);
      }
      setSuccess(true);
      
      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError('Failed to save pet. Please check your inputs and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading pet data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{id ? 'Edit Pet' : 'Add New Pet'}</h1>
        <Link to="/admin" style={{
          ...styles.backButton,
          ':hover': {
            backgroundColor: '#e05e7c',
            color: '#fff'
          }
        }}>
          Back to Dashboard
        </Link>
      </div>
      
      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={styles.successMessage}>
          Pet {id ? 'updated' : 'created'} successfully! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Pet Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter pet name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="age" style={styles.label}>Age*</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter age in years"
              min="0"
              step="0.1"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="type" style={styles.label}>Pet Type*</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Hamster">Hamster</option>
              <option value="Guinea Pig">Guinea Pig</option>
              <option value="Fish">Fish</option>
              <option value="Reptile">Reptile</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="breed" style={styles.label}>Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={form.breed}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter breed"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="gender" style={styles.label}>Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="status" style={styles.label}>Status*</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter image URL"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="shelterId" style={styles.label}>Shelter*</label>
            <select
              id="shelterId"
              name="shelterId"
              value={form.shelterId}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Shelter</option>
              {shelters.map(shelter => (
                <option key={shelter._id} value={shelter._id}>
                  {shelter.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Enter pet description"
            rows="4"
          />
        </div>
        
        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            style={{
              ...styles.cancelButton,
              ':hover': {
                backgroundColor: '#e05e7c',
                color: '#fff'
              }
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit"
            style={{
              ...styles.submitButton,
              ':hover': {
                backgroundColor: '#d14d6b',
                transform: 'translateY(-2px)'
              }
            }}
            disabled={loading || success}
          >
            {loading ? 'Saving...' : id ? 'Update Pet' : 'Create Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1rem',
    background: '#fff5f7',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#e05e7c',
    margin: 0,
    fontSize: '1.75rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    color: '#e05e7c',
    border: '1.5px solid #e05e7c',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  form: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(224, 94, 124, 0.08)',
    border: '1.5px solid #e05e7c',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#e05e7c',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1.5px solid #e05e7c',
    borderRadius: '4px',
    backgroundColor: '#fff',
    transition: 'border 0.2s',
  },
  select: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1.5px solid #e05e7c',
    borderRadius: '4px',
    backgroundColor: '#fff',
    transition: 'border 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1.5px solid #e05e7c',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontFamily: 'inherit',
    transition: 'border 0.2s',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e05e7c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    color: '#e05e7c',
    border: '1.5px solid #e05e7c',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
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
    borderTop: '4px solid #0cc0df',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  errorMessage: {
    backgroundColor: '#e6fafd',
    color: '#0cc0df',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    border: '1.5px solid #0cc0df',
  },
  successMessage: {
    backgroundColor: '#e6fafd',
    color: '#0cc0df',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    border: '1.5px solid #0cc0df',
  },
};

export default AddEditPet;