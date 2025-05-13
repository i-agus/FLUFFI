// src/pages/AdminDashboard.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './AdminDashboard.css';
import { FaDog, FaCheckCircle, FaHourglassHalf, FaHome, FaUserCircle, FaSignOutAlt, FaSyncAlt, FaPaw, FaBuilding, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
  const { pets, shelters, applications, loading, error, refreshData } = useContext(DataContext);
  const [statistics, setStatistics] = useState({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    pendingApplications: 0
  });
  const navigate = useNavigate();

  // Calculate dashboard statistics
  useEffect(() => {
    if (!loading && !error) {
      setStatistics({
        totalPets: pets.length,
        availablePets: pets.filter(pet => pet.status === 'Available').length,
        adoptedPets: pets.filter(pet => pet.status === 'Adopted').length,
        pendingApplications: applications.filter(app => app.status === 'Pending').length
      });
    }
  }, [pets, applications, loading, error]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button style={styles.button} onClick={refreshData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container fancy-bg">
      <div className="admin-dashboard-topbar">
        <div className="admin-dashboard-logo">
          <img src="/images/icons/logo.png" alt="Fluffi Logo" className="fluffi-logo" />
          <span className="fluffi-title">FLUFFI Admin</span>
        </div>
        <div className="admin-dashboard-user">
          <FaUserCircle size={32} color="#0cc0df" style={{marginRight: 8}} />
          <span className="admin-dashboard-username">{localStorage.getItem('adminUsername') || 'Admin'}</span>
          <button className="admin-dashboard-logout" onClick={handleLogout} title="Logout">
            <FaSignOutAlt size={20} style={{marginRight: 6}} /> Logout
          </button>
        </div>
      </div>
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-dashboard-title"><FaPaw style={{marginRight: 10, color: '#0cc0df'}} />Admin Dashboard</h1>
          <p>Welcome, <b>{localStorage.getItem('adminUsername') || 'Admin'}</b></p>
        </div>
        <button className="admin-dashboard-refresh" onClick={refreshData} title="Refresh Data">
          <FaSyncAlt style={{marginRight: 6}} /> Refresh Data
        </button>
      </div>
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-stat-card">
          <FaDog size={36} color="#0cc0df" style={{marginBottom: 8}} />
          <div className="admin-dashboard-stat-title">Total Pets</div>
          <div className="admin-dashboard-stat-value">{statistics.totalPets}</div>
        </div>
        <div className="admin-dashboard-stat-card">
          <FaCheckCircle size={36} color="#0cc0df" style={{marginBottom: 8}} />
          <div className="admin-dashboard-stat-title">Available Pets</div>
          <div className="admin-dashboard-stat-value">{statistics.availablePets}</div>
        </div>
        <div className="admin-dashboard-stat-card">
          <FaHourglassHalf size={36} color="#0cc0df" style={{marginBottom: 8}} />
          <div className="admin-dashboard-stat-title">Adopted Pets</div>
          <div className="admin-dashboard-stat-value">{statistics.adoptedPets}</div>
        </div>
        <div className="admin-dashboard-stat-card">
          <FaClipboardList size={36} color="#0cc0df" style={{marginBottom: 8}} />
          <div className="admin-dashboard-stat-title">Pending Applications</div>
          <div className="admin-dashboard-stat-value">{statistics.pendingApplications}</div>
        </div>
      </div>
      <div className="admin-dashboard-sections">
        <div className="admin-dashboard-section">
          <div className="admin-dashboard-section-header">
            <div className="admin-dashboard-section-title"><FaDog style={{marginRight: 8, color: '#0cc0df'}} />Manage Pets</div>
            <Link to="/admin/pets" className="admin-dashboard-add-btn">Add New Pet</Link>
          </div>
          <div className="admin-dashboard-list-container">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="admin-dashboard-empty-message">No pets found. Add your first pet!</td>
                  </tr>
                ) : (
                  pets.slice(0, 5).map(pet => (
                    <tr key={pet._id}>
                      <td>{pet.name}</td>
                      <td>{pet.breed}</td>
                      <td>{pet.age}</td>
                      <td>
                        <span className={`status-badge ${pet.status.toLowerCase()}`}>
                          {pet.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/admin/pets/${pet._id}`} className="admin-dashboard-edit-btn">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {pets.length > 5 && (
              <p className="admin-dashboard-view-more">
                Displaying 5 of {pets.length} pets
              </p>
            )}
          </div>
        </div>

        <div className="admin-dashboard-section">
          <div className="admin-dashboard-section-header">
            <div className="admin-dashboard-section-title"><FaBuilding style={{marginRight: 8, color: '#0cc0df'}} />Manage Shelters</div>
            <Link to="/admin/shelters" className="admin-dashboard-add-btn">Add New Shelter</Link>
          </div>
          <div className="admin-dashboard-list-container">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shelters.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-dashboard-empty-message">No shelters found. Add your first shelter!</td>
                  </tr>
                ) : (
                  shelters.slice(0, 5).map(shelter => (
                    <tr key={shelter._id}>
                      <td>{shelter.name}</td>
                      <td>{shelter.address}</td>
                      <td>{shelter.phone}</td>
                      <td>
                        <Link to={`/admin/shelters/${shelter._id}`} className="admin-dashboard-edit-btn">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {shelters.length > 5 && (
              <p className="admin-dashboard-view-more">
                Displaying 5 of {shelters.length} shelters
              </p>
            )}
          </div>
        </div>

        <div className="admin-dashboard-section">
          <div className="admin-dashboard-section-header">
            <div className="admin-dashboard-section-title"><FaClipboardList style={{marginRight: 8, color: '#0cc0df'}} />Recent Applications</div>
            <Link to="/admin/applications" className="admin-dashboard-view-btn">View All</Link>
          </div>
          <div className="admin-dashboard-list-container">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>User ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-dashboard-empty-message">No applications received yet.</td>
                  </tr>
                ) : (
                  applications.slice(0, 5).map(app => (
                    <tr key={app._id}>
                      <td>{app.petId?.name || 'Unknown Pet'}</td>
                      <td>{app.userId}</td>
                      <td>
                        <span className={`status-badge ${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {applications.length > 5 && (
              <p className="admin-dashboard-view-more">
                Displaying 5 of {applications.length} applications
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling status tags
const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  };
  
  switch (status) {
    case 'Available':
      return {...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32'};
    case 'Pending':
      return {...baseStyle, backgroundColor: '#fff8e1', color: '#f57f17'};
    case 'Adopted':
      return {...baseStyle, backgroundColor: '#e3f2fd', color: '#1565c0'};
    default:
      return {...baseStyle, backgroundColor: '#f5f5f5', color: '#616161'};
  }
};

const getApplicationStatusStyle = (status) => {
  const baseStyle = {
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  };
  
  switch (status) {
    case 'Approved':
      return {...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32'};
    case 'Pending':
      return {...baseStyle, backgroundColor: '#fff8e1', color: '#f57f17'};
    case 'Rejected':
      return {...baseStyle, backgroundColor: '#ffebee', color: '#c62828'};
    default:
      return {...baseStyle, backgroundColor: '#f5f5f5', color: '#616161'};
  }
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
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    margin: 0,
  },
  refreshButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  statTitle: {
    color: '#555',
    fontSize: '1rem',
    margin: '0 0 0.5rem 0',
    fontWeight: 'normal',
  },
  statValue: {
    color: '#333',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    padding: '1rem',
    borderBottom: '1px solid #eaeaea',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  viewAllButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  listContainer: {
    padding: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '1rem',
    color: '#666',
  },
  editButton: {
    color: '#2196F3',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  viewMoreText: {
    textAlign: 'right',
    color: '#666',
    fontSize: '0.8rem',
    margin: '0.5rem 0 0 0',
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
  button: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

export default AdminDashboard;