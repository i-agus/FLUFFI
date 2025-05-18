import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff5f7',
  },
  card: {
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(224, 94, 124, 0.08)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    border: '1.5px solid #e05e7c',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#e05e7c',
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '0.9rem 1rem',
    borderRadius: '8px',
    border: '1.5px solid #e05e7c',
    fontSize: '1rem',
    background: '#f9f9f9',
    color: '#222',
    transition: 'border 0.2s',
  },
  inputFocus: {
    borderColor: '#e05e7c',
    outline: 'none',
  },
  button: {
    background: 'linear-gradient(90deg, #e05e7c 60%, #d14d6b 100%)',
    color: '#fff',
    border: 'none',
    padding: '0.9rem 0',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(224, 94, 124, 0.08)',
    letterSpacing: '1px',
  },
  buttonHover: {
    background: 'linear-gradient(90deg, #d14d6b 60%, #e05e7c 100%)',
  },
  message: {
    marginTop: '1.2rem',
    fontSize: '1rem',
    color: '#e05e7c',
  },
  errorMessage: {
    color: '#c62828',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  linkContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  link: {
    color: '#e05e7c',
    textDecoration: 'none',
    fontSize: '0.9rem',
  }
};

const AdminSignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admins/register', form);
      setMessage('Admin registered successfully!');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminUsername', form.username);
      localStorage.setItem('adminToken', res.data.token);
      setTimeout(() => {
        navigate('/admin');
      }, 500);
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Sign Up</h2>
        
        {message && <div style={styles.message}>{message}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
            required
            minLength="3"
            maxLength="20"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
            minLength="6"
          />
          <button
            type="submit"
            style={buttonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Sign Up
          </button>
        </form>
        
        {/* Additional navigation links */}
        <div style={styles.linkContainer}>
          <Link to="/admin/login" style={styles.link}>
            Already have an account? Login
          </Link>
          <Link to="/" style={styles.link}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;