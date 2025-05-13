// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e6fafd',
  },
  card: {
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(12,192,223,0.08)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    border: '1.5px solid #0cc0df',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#0cc0df',
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
    border: '1.5px solid #0cc0df',
    fontSize: '1rem',
    background: '#f9f9f9',
    color: '#222',
    transition: 'border 0.2s',
  },
  button: {
    background: 'linear-gradient(90deg, #0cc0df 60%, #099ab3 100%)',
    color: '#fff',
    border: 'none',
    padding: '0.9rem 0',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(12,192,223,0.08)',
    letterSpacing: '1px',
  },
  errorMessage: {
    color: '#d32f2f',
    background: '#fdeded',
    borderRadius: '4px',
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: '0.95rem',
  },
  helpText: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#222',
  },
  backLink: {
    display: 'block',
    marginTop: '1rem',
    color: '#0cc0df',
    textDecoration: 'none',
    fontWeight: '500',
  }
};

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/admins/login', credentials);
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminUsername', credentials.username);
      localStorage.setItem('adminToken', res.data.token);
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {localStorage.getItem('isAdmin') === 'true' ? (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your username"
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
        {localStorage.getItem('isAdmin') !== 'true' && (
          <div style={styles.helpText}>
            <p>Demo credentials: <strong>admin</strong> / <strong>admin123</strong></p>
            <Link to="/" style={styles.backLink}>Return to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;