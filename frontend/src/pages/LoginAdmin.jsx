import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FocusedNavbar from '../components/navigation/FocusedNavbar';
import BackgroundActions from '../components/backgrounds/BackgroundActions';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export const LoginAdmin = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeForm = (label, event) => {
    switch (label) {
      case 'email':
        setLoginForm({ ...loginForm, email: event.target.value });
        break;
      case 'password':
        setLoginForm({ ...loginForm, password: event.target.value });
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    // Email validation: Check if email is null
    if (loginForm.email === '') {
      setEmailErrorMessage('please enter an email');
      setIsEmailValid(false);
      return;
    }
  
    if (
      loginForm.email !== '' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)
    ) {
      setIsEmailValid(false);
      setEmailErrorMessage('Invalid email format');
      return;
    } else {
      setIsEmailValid(true);
      setEmailErrorMessage('');
    }
  
    // Password validation: Check if password is not null or empty
    const isValidPassword = loginForm.password.trim() !== '';
    setIsPasswordValid(isValidPassword);
  
    if (!isValidPassword) {
      setPasswordErrorMessage('Password cannot be empty');
      return;
    } else {
      setPasswordErrorMessage('');
    }
  
    // Call API for login
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/login_photographer',
        loginForm
      );
      console.log(response);
  
      // Save token to local storage
      localStorage.setItem('auth_token', response.data.result.access_token);
      localStorage.setItem(
        'auth_token_type',
        response.data.result.token_type
      );
      const auth_token = localStorage.getItem('auth_token');
      const auth_token_type = localStorage.getItem('auth_token_type');
      const token = auth_token_type + ' ' + auth_token;
      axios
        .get('http://localhost:8000/photographer/', {
          headers: { Authorization: token },
        })
        .then((response) => {
          localStorage.setItem('user_type', response.data.result.user_type);
          const user  = response.data.result;
          console.log(response);
  
          // Redirect to account-admin page if user exists
          window.location.href = `/account-admin/${user.id}&${(user.first_name).charAt(0)}&${user.last_name}`;


        })
        .catch((error) => {
          console.log(error);
  
          // Handle email not found error (404)
          if (error.response.status === 404) {
            setEmailErrorMessage('Email not found');
            setIsEmailValid(false);
          }
        });
    } catch (error) {
      // Handle login failure
      console.error(error);
      setLoginFailed(true);
    }
  };
  

  return (
    <div className="flex justify-center min-h-screen items-start relative pt-20">
      <div className="w-80 ">
        <div>
          <h1 className="font-regular uppercase text-xl text-white text-center mb-10">
            Admin Login
          </h1>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-6 w-full">
            <input
              type="text"
              placeholder="Email Address"
              className={`block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ${isEmailValid ? 'ring-[#DFC9C2]' : 'ring-red-500'}`}
              onChange={(event) => {
                onChangeForm('email', event);
              }}
            />
            {emailErrorMessage && (
              <p className="text-red-500 text-sm  mt-2 text-center">{emailErrorMessage}</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none ${isPasswordValid ? 'ring-[#DFC9C2]' : 'ring-red-500'}`}
                onChange={(event) => {
                  onChangeForm('password', event);
                }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <LockOpenIcon className="h-6 w-6" />
                ) : (
                  <LockClosedIcon className="h-6 w-6" />
                )}
              </span>
            </div>
            {passwordErrorMessage && (
              <p className="text-red-500 text-sm mt-2 text-center">{passwordErrorMessage}</p>
            )}
          </div>
          <div className="text-center mt-6 text-white">
            <button
              type="submit"
              className="duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue w-full py-3 rounded-3xl mb-1"
            >
              Login
            </button>
            {loginFailed && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Login failed. Please check your credentials.
              </p>
            )}
          </div>
          <Link to="/forgot-password">
            <p className="mt-3 text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white">
              Forgot password?
            </p>
          </Link>
          <p className="text-center pt-20 text-sm text-white font-normal">
            Don't have an account yet?{' '}
          </p>
          <Link to="/register">
            <p className="text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white">
              Create one
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;