import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../components/navigation/FocusedNavbar';
import BackgroundActions from '../components/backgrounds/BackgroundActions';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Proile(props) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

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
    // ... (rest of the code remains unchanged)
  };

  return (
    <React.Fragment>
      <BackgroundActions />
      <FocusedNavbar />
      <div className=" -top-40 flex justify-center min-h-screen items-center relative">
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
