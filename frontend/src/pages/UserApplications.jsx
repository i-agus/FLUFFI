import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './UserApplications.css';

const UserApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/applications', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setApplications(data));
  }, [user]);

  return (
    <div className="applications-container">
      <h2>My Adoption Applications</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Pet</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr><td colSpan="3">No applications yet.</td></tr>
          ) : (
            applications.map(app => (
              <tr key={app._id}>
                <td>{app.petId?.name || 'Unknown'}</td>
                <td>{app.status}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserApplications;
