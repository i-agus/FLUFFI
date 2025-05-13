import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShelterList from './pages/ShelterList';
import ShelterDetail from './pages/ShelterDetail';
import AdminDashboard from './pages/AdminDashboard';
import AddEditPet from './pages/AddEditPet';
import AddEditShelter from './pages/AddEditShelter';
import ManageApplications from './pages/ManageApplications';
import NotFound from './pages/NotFound';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import AllPets from './pages/AllPets';
import AdminSignUp from './pages/AdminSignUp';
// User pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import UserApplications from './pages/UserApplications';
import Donations from './pages/Donations';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [enteredSite, setEnteredSite] = useState(false);
  
  const handleEnterClick = () => {
    setEnteredSite(true);
  };
  
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            {!enteredSite ? (
              <div className="splash-screen">
                <div className="splash-content">
                  <h1>Welcome to FLUFFI</h1>
                  <p>Find Your Perfect Pet Companion</p>
                  <button onClick={handleEnterClick} className="enter-btn">Enter</button>
                </div>
              </div>
            ) : (
              <>
                <NavBar />
                <main className="app-container">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/shelters" element={<ShelterList />} />
                    <Route path="/shelters/:id" element={<ShelterDetail />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/pets" element={<AllPets />} />
                    {/* User Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* User Private Routes */}
                    <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    <Route path="/applications" element={<PrivateRoute><UserApplications /></PrivateRoute>} />
                    <Route path="/donations" element={<PrivateRoute><Donations /></PrivateRoute>} />
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/pets" element={<AdminRoute><AddEditPet /></AdminRoute>} />
                    <Route path="/admin/pets/:id" element={<AdminRoute><AddEditPet /></AdminRoute>} />
                    <Route path="/admin/shelters" element={<AdminRoute><AddEditShelter /></AdminRoute>} />
                    <Route path="/admin/shelters/:id" element={<AdminRoute><AddEditShelter /></AdminRoute>} />
                    <Route path="/admin/applications" element={<AdminRoute><ManageApplications /></AdminRoute>} />
                    <Route path="/admin/signup" element={<AdminSignUp />} />
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            )}
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
