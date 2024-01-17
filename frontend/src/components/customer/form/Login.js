import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../../navigation/FocusedNavbar';
import BackgroundActions from '../../../backgrounds/BackgroundActions';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Login(props) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

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
  
  const handleLogin = async () => {
    setIsLoading(true);
    // your login code here
    setIsLoading(false);
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(loginForm)

    // Email validation: Check if email is null
    if (loginForm.email === '') {
      setEmailErrorMessage('please enter an email');
      setIsEmailValid(false);
      return;
    }

    if (loginForm.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
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
    // call api login
    await axios
      .post("http://localhost:8000/auth/login", loginForm)
      .then((response) => {
        console.log(response);
        // Save token to local storage
        localStorage.setItem("auth_token", response.data.result.access_token);
        localStorage.setItem(
          "auth_token_type",
          response.data.result.token_type
        );
        // reload page after success login
        setIsLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setIsLoading(false);
      })
      .catch((error) => {
        // add error notif
        
        console.log(error);
        setLoginFailed(true);
      });

    
  };



  return (
    <React.Fragment>
      <BackgroundActions />
      <FocusedNavbar />
      <div className="flex justify-center min-h-screen items-start relative pt-20">
        <div className="w-80 ">
          <div>
            <h1 className="font-regular uppercase text-xl text-white text-center mb-10">
              Welcome Back
            </h1>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="space-y-6 w-full">
              <input
                type="text"
                placeholder="Email Address"
                className={`block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ${
                  isEmailValid ? 'ring-[#DFC9C2]' : 'ring-red-500'
                }`}
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
                  className={`block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none ${
                    isPasswordValid ? 'ring-[#DFC9C2]' : 'ring-red-500'
                  }`}
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
            <Link to="/?password-reset" onClick={() => props.setPage('forgot')}>
              <p className="mt-3 text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white">
                forgot password ?
              </p>
            </Link>
            <p className="text-center pt-20 text-sm text-white font-normal">
              don't have an account yet?{' '}
            </p>
            <Link to="/?create-account" onClick={() => props.setPage('register')}>
              <p className="text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white">
                create one
              </p>
            </Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
