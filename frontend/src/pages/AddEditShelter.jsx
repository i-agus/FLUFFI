// src/pages/AddEditShelter.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AddEditShelter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const fetchShelterData = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/shelters/${id}`);
          setForm(response.data);
        } catch (err) {
          setError('Failed to load shelter data. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShelterData();
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
        await axios.put(`http://localhost:5000/api/shelters/${id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/shelters', form);
      }
      setSuccess(true);
      
      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError('Failed to save shelter. Please check your inputs and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading shelter data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{id ? 'Edit Shelter' : 'Add New Shelter'}</h1>
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
          Shelter {id ? 'updated' : 'created'} successfully! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Shelter Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter shelter name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter phone number"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="address" style={styles.label}>Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter shelter address"
              required
            />
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
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Enter shelter description"
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
          >
            {loading ? 'Saving...' : id ? 'Update Shelter' : 'Create Shelter'}
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

export default AddEditShelter;