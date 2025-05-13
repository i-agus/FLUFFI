import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-dashboard-container">
      <h2>Welcome, {user?.username || 'User'}!</h2>
      <div className="user-dashboard-links">
        <Link to="/profile" className="user-dashboard-btn">Edit Profile</Link>
        <Link to="/applications" className="user-dashboard-btn">My Applications</Link>
        <Link to="/donations" className="user-dashboard-btn">Donations</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
