// src/pages/ManageApplications.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/applications');
      setApplications(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${id}`, { status });
      setSuccessMessage(`Application ${status.toLowerCase()} successfully!`);
      fetchApplications();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error("Failed to update application:", err);
      setError("Failed to update application status. Please try again.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading applications data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Adoption Applications</h1>
        <Link to="/admin" style={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          {error}
          <button style={styles.retryButton} onClick={fetchApplications}>
            Try Again
          </button>
        </div>
      )}

      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {applications.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No adoption applications have been submitted yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pet</th>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Date Applied</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} style={styles.tr}>
                  <td style={styles.td}>{app.petId?.name || 'Deleted Pet'}</td>
                  <td style={styles.td}>{app.userId}</td>
                  <td style={styles.td}>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(app.status)}>
                      {app.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.messageContainer}>
                      {app.message}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button 
                        style={{
                          ...styles.actionButton,
                          ...styles.approveButton,
                          opacity: app.status === 'Approved' ? 0.5 : 1
                        }}
                        onClick={() => updateStatus(app._id, 'Approved')}
                        disabled={app.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button 
                        style={{
                          ...styles.actionButton,
                          ...styles.rejectButton,
                          opacity: app.status === 'Rejected' ? 0.5 : 1
                        }}
                        onClick={() => updateStatus(app._id, 'Rejected')}
                        disabled={app.status === 'Rejected'}
                      >
                        Reject
                      </button>
                      <button 
                        style={{
                          ...styles.actionButton,
                          ...styles.pendingButton,
                          opacity: app.status === 'Pending' ? 0.5 : 1
                        }}
                        onClick={() => updateStatus(app._id, 'Pending')}
                        disabled={app.status === 'Pending'}
                      >
                        Mark Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Helper function for status styles
const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'inline-block',
  };
  
  switch (status) {
    case 'Approved':
      return {...baseStyle, backgroundColor: '#e6fafd', color: '#0cc0df', border: '1.5px solid #0cc0df'};
    case 'Rejected':
      return {...baseStyle, backgroundColor: '#f5f5f5', color: '#222', border: '1.5px solid #eaeaea'};
    case 'Pending':
    default:
      return {...baseStyle, backgroundColor: '#e6fafd', color: '#099ab3', border: '1.5px solid #0cc0df'};
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
    color: '#3a4756',
    margin: 0,
    fontSize: '1.75rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f7fafc',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #eaeaea',
    color: '#4a5568',
    fontSize: '0.875rem',
    fontWeight: '600',
    backgroundColor: '#f9fafb',
  },
  tr: {
    borderBottom: '1px solid #eaeaea',
  },
  td: {
    padding: '1rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    verticalAlign: 'top',
  },
  messageContainer: {
    maxWidth: '300px',
    maxHeight: '100px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  actionButton: {
    padding: '0.4rem 0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'center',
  },
  approveButton: {
    backgroundColor: '#0cc0df',
    color: 'white',
  },
  rejectButton: {
    backgroundColor: '#099ab3',
    color: 'white',
  },
  pendingButton: {
    backgroundColor: '#e6fafd',
    color: '#0cc0df',
    border: '1.5px solid #0cc0df',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    color: '#6b7280',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6fafd',
    color: '#0cc0df',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1.5px solid #0cc0df',
  },
  successMessage: {
    backgroundColor: '#e6fafd',
    color: '#0cc0df',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1.5px solid #0cc0df',
  },
  retryButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.8rem',
    cursor: 'pointer'
  }
};

export default ManageApplications;