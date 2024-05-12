import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/navigation/Footer';
import Background from './components/backgrounds/Background';
import BackgroundActions from './components/backgrounds/BackgroundActions';
import axios from 'axios';
import Navbar from './components/navigation/Navbar';
import FocusedNavbar from './components/navigation/FocusedNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import ForgotPasswordAdmin from './pages/ForgotPasswordAdmin';
import RegisterFormAdmin from './pages/RegisterFormAdmin';

import { Shop } from './pages/Shop';
import RegisterForm from './pages/RegisterForm';
import ForgotPassword from './pages/ForgotPassword';
import CustomerAccount from './components/customer/CustomerAccount';
import PhotographerAccount from './components/photographer/PhotographerAccount';
import ManagePortfolio from './components/portfolio/ManagePortfolio';
import CartProvider from './CartContext';


const USER_TYPES = {
  PUBLIC: 'Public User',
  NORMAL_USER: "customer",
  ADMIN_USER: "photographer"
}

const CURRENT_USER_TYPE = localStorage.getItem('user_type');

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const auth = localStorage.getItem('auth_token');
    setToken(auth);
  }, []);

  

// Set the base URL for axios requests
  axios.defaults.baseURL = 'https://congraduation-fastapi-backend-production-4309.up.railway.app'; 
  
  return (
    <BrowserRouter>
    <CartProvider>
      <div className=" flex-1 ju overflow-hidden bg-[#1B223C] font-outfit bg-gradient-to-br from-[#54B8D8]/55 to-customIndigo/40 items-center">
        <NotAdminUser>
        <Navbar />
        </NotAdminUser>
        <AdminUser>
            <FocusedNavbar />
        </AdminUser>
        <div className="flex flex-col justify-between md:max-w-screen-xl mx-auto ml-5 mr-5 xl:ml-auto xl:mr-auto ">
          <div className="flex-grow">
            <Routes>
              <Route path="/" 
              element={ 
              <PublicElement>
                <Home />
              </PublicElement>
             } />
              <Route path='*' element= {<Home/>}/>
              <Route path="/about" element={<About />} />
              <Route path="/shop/:search_key" element={<Shop />} />
                <Route path="/account/:userId" element={
                  <NormalUser>
                    <CustomerAccount />
                  </NormalUser>
              } />
              <Route path="/account-admin/:userId" element={<AdminUser><PhotographerAccount /></AdminUser>} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/success" element={<Success />} />
              <Route path='/manage-portfolio/:portfolio_id' element={<AdminUser><ManagePortfolio /></AdminUser>} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password-admin" element={<ForgotPasswordAdmin />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/register-admin" element={<RegisterFormAdmin />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
      </CartProvider>
    </BrowserRouter>
  );
}
function PublicElement({children}) {
  return <>{children}</>
}
function NotAdminUser({children}){
  if(CURRENT_USER_TYPE !== USER_TYPES.ADMIN_USER){
    return <>{children}</>;
  } else {
    return <></>
  }
}
function NormalUser({children}){
  if(CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER){
    return <>{children}</>;
  } else {
    return <></>
  }
}
function AdminUser({children}){
  if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER){
    return <>{children}</>;
  } else {
    return <></>
  }
}
export default App;