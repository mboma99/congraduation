import React, { useState } from 'react';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons8-graduation-cap-64.png';
import axios from 'axios';

export const FocusedNavbar = () => {
    const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUserIconClick = () => {
    const userType = localStorage.getItem('user_type');
    const auth_token = localStorage.getItem('auth_token');
    const auth_token_type = localStorage.getItem('auth_token_type');
    const token = auth_token_type + ' ' + auth_token;
    if (userType === 'customer') {

      navigate('/account');
    } else if(userType === 'photographer') {
        axios
        .get('http://localhost:8000/photographer/', {
          headers: { Authorization: token },
        })
        .then((response) => {
          const user = response.data.result;
          navigate(`/account-admin/${user.id}&${user.first_name.charAt(0)}&${user.last_name}`);
        })
        .catch((error) => {
          console.error('Error fetching photographer:', error);
          navigate('/login-admin');
        });
      navigate('/admin-account');
    } else {
      navigate('/login');
    }
  };

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-10 p-4">
      <h1 className='tracking-[.3em] uppercase text-2xl font-semibold text-white text-center cursor-pointer'>
          <Link to='/' className="flex items-center" ><img  className=' w-9' src={logo} alt="Your Logo" style={{ marginRight: '5px' }} /><span>congraduation</span></Link>
        </h1>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`w-full md:block md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="flex text-base tracking-[.3em] uppercase flex-col mt-4 md:flex-row md:space-x-10 md:mt-0">
            <li>
              <p className="hover:text-gray-800 text-white">
                <Link to='/about' onClick={toggleMobileMenu}>
                  About
                </Link>
              </p>
            </li>
            <li>
              <button onClick={handleUserIconClick} className="focus:outline-none">
                <UserIcon className="h-6 w-6 text-white hover:text-gray-800" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default FocusedNavbar