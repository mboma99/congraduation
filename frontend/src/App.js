import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/navigation/Footer';
import Background from './components/backgrounds/Background';
import BackgroundActions from './components/backgrounds/BackgroundActions';

import Navbar from './components/navigation/Navbar';
import FocusedNavbar from './components/navigation/FocusedNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';

import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import RegisterForm from './pages/RegisterForm';
import ForgotPassword from './pages/ForgotPassword';
import CustomerAccount from './components/customer/CustomerAccount';
import PhotographerAccount from './components/photographer/PhotographerAccount';
import ManagePortfolio from './components/portfolio/ManagePortfolio';



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

  return (
    <BrowserRouter>
      <div className="relative bg-[#1B223C] font-outfit bg-gradient-to-br from-[#54B8D8]/55 to-customIndigo/40">
        <NotAdminUser>
        <Navbar />
        </NotAdminUser>
        <AdminUser>
            <FocusedNavbar />
        </AdminUser>
        <div className="flex flex-col justify-between max-w-screen-xl mx-auto">
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
              <Route path="/cart" element={<Cart />} />
                <Route path="/account/:userId" element={
                  <NormalUser>
                    <CustomerAccount />
                  </NormalUser>
              } />
              <Route path="/account-admin/:userId" element={<AdminUser><PhotographerAccount /></AdminUser>} />
              
              <Route path='/manage-portfolio/:portfolio_id' element={<AdminUser><ManagePortfolio /></AdminUser>} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
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