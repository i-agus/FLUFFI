import React, { useState } from 'react';
import './Donations.css';

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('Thank you for your donation!');
    setAmount('');
  };

  return (
    <div className="donations-container">
      <form className="donations-card" onSubmit={handleSubmit}>
        <h2>Support Our Mission</h2>
        <input
          type="number"
          min="1"
          placeholder="Donation Amount ($)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="donations-btn">Donate</button>
        {message && <div className="donations-message">{message}</div>}
      </form>
    </div>
  );
};

export default Donations;
