// src/context/DataContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Parallel API calls for better performance
      const [petsRes, sheltersRes, applicationsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/pets'),
        axios.get('http://localhost:5000/api/shelters'),
        axios.get('http://localhost:5000/api/applications')
      ]);
      
      setPets(petsRes.data);
      setShelters(sheltersRes.data);
      setApplications(applicationsRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh data function for manual refreshes
  const refreshData = () => {
    fetchData();
  };

  return (
    <DataContext.Provider value={{
      pets,
      shelters,
      applications,
      loading,
      error,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;