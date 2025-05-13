import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users/profile', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setProfile({ username: data.username, email: data.email }));
  }, [user]);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('http://localhost:5000/api/users/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(profile)
    });
    if (res.ok) setMessage('Profile updated!');
    else setMessage('Update failed.');
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <input name="username" value={profile.username} onChange={handleChange} required />
        <input name="email" value={profile.email} onChange={handleChange} required />
        <button type="submit" className="profile-btn">Save</button>
        {message && <div className="profile-message">{message}</div>}
      </form>
    </div>
  );
};

export default UserProfile;
