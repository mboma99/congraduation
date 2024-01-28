import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/navigation/Footer';
import Background from './components/backgrounds/Background';
import BackgroundActions from './components/backgrounds/BackgroundActions';

import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import RegisterForm from './pages/RegisterForm';
import ForgotPassword from './pages/ForgotPassword';
import CustomerAccount from './components/customer/CustomerAccount';

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const auth = localStorage.getItem('auth_token');
    setToken(auth);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative overflow-hidden bg-[#1B223C] font-outfit">
        <Background />
        <Navbar />
        <div className="flex flex-col max-w-screen-xl mx-auto relative z-10">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              {token !== null && token !== undefined ? (
                <Route path="/account" element={<CustomerAccount />} />
              ) : (
                <Route path="/login" element={<Login />} />
              )}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;