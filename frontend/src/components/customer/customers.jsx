import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Background from '../components/backgrounds/Background';
import Home from '../components/customer/pages/Home';
import About from '../components/customer/pages/About';
import Shop from '../components/customer/pages/Shop';
import Cart from '../components/customer/pages/Cart';
import Login from '../components/customer/pages/Login';
import ForgotPassword from '../components/customer/pages/ForgotPassword';
import RegisterForm from '../components/customer/pages/RegisterForm';
import Footer from './components/navigation/Footer';
import BackgroundActions from './components/backgrounds/BackgroundActions';

export const customers = () => {
  return (
    <div className="relative overflow-hidden bg-[#1B223C] font-outfit">
        <Background />
        <Navbar />
        <div className="flex flex-col max-w-screen-xl mx-auto relative z-10">
          <div className='flex-grow'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={<Login />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='/register' element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
  )
}
