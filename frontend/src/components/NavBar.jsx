import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Make sure you have a CSS file for styling
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, [location.pathname]);

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar-fancy">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/icons/logo.png" alt="Fluffi Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">FLUFFI</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/shelters" className="navbar-link">Shelters</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Link to="/faqs" className="navbar-link">FAQs</Link>
          <Link to="/pets" className="navbar-link">All Pets</Link>
          {isAdmin ? (
            <>
              <Link to="/admin" className="navbar-link">
                <FaUserCircle style={{marginRight: 8}} /> Admin Dashboard
              </Link>
              <button onClick={handleAdminLogout} className="navbar-link navbar-btn">
                <FaSignOutAlt style={{marginRight: 8}} /> Logout
              </button>
            </>
          ) : user ? (
            <>
              <Link to="/user" className="navbar-link">
                <FaUserCircle style={{marginRight: 8}} /> User Dashboard
              </Link>
              <button onClick={logout} className="navbar-link navbar-btn">
                <FaSignOutAlt style={{marginRight: 8}} /> Logout
              </button>
            </>
          ) : (
            <>
              <div
                className="navbar-dropdown"
                onMouseEnter={() => setUserDropdown(true)}
                onMouseLeave={() => setUserDropdown(false)}
              >
                <span className="navbar-link">User ▾</span>
                {userDropdown && (
                  <div className="navbar-dropdown-menu">
                    <Link to="/login" className="navbar-dropdown-item">Login</Link>
                    <Link to="/register" className="navbar-dropdown-item">Sign Up</Link>
                  </div>
                )}
              </div>
              <div
                className="navbar-dropdown"
                onMouseEnter={() => setAdminDropdown(true)}
                onMouseLeave={() => setAdminDropdown(false)}
              >
                <span className="navbar-link">Admin ▾</span>
                {adminDropdown && (
                  <div className="navbar-dropdown-menu">
                    <Link to="/admin/login" className="navbar-dropdown-item">Login</Link>
                    <Link to="/admin/signup" className="navbar-dropdown-item">Sign Up</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(224, 94, 124, 0.08)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '3px solid #e05e7c',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#e05e7c',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  logoIcon: {
    marginRight: '0.5rem',
    fontSize: '1.75rem',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    }
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '@media (max-width: 768px)': {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '1rem',
    }
  },
  navLink: {
    color: '#222',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    fontSize: '1.1rem',
    '@media (max-width: 768px)': {
      marginLeft: 0,
      marginBottom: '0.5rem',
      width: '100%',
    }
  },
  activeLink: {
    color: '#e05e7c',
    fontWeight: 'bold',
    borderBottom: '2px solid #e05e7c',
    background: 'rgba(224, 94, 124, 0.08)'
  },
  adminLink: {
    backgroundColor: '#e05e7c',
    color: '#fff',
    '@media (max-width: 768px)': {
      width: '100%',
    }
  },
  activeAdminLink: {
    backgroundColor: '#222',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#f7fafc',
    color: '#222',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      width: '100%',
      marginTop: '0.5rem',
    }
  }
};

export default NavBar;