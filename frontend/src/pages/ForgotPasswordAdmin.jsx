/**
 * ForgotPassword Component
 * A React component for handling the password recovery process.
 *
 * @component
 * @returns {JSX.Element} - Returns the JSX element for the ForgotPassword component.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

/**
 * Functional component for handling password recovery.
 *
 * @function ForgotPassword
 * @returns {JSX.Element} - Returns the JSX element for the ForgotPassword component.
 */
export const ForgotPassword = () => {
    // State variables for managing form input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accessId, setAccessId] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const onSubmitHandler = async () => {
        const data = {
            email: email,
            new_password: password,
            access_id : accessId
        };

        try {
            const response = await axios.post("http://localhost:8000/auth/forgot-password_photographer/", data);
            window.location.href = "/login-admin";
        } catch (error) {
            setError(error.response.data.detail);
        }
    };

    // Checks if the reset password button should be enabled
    const isResetButtonEnabled = email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword;

    const handleResetPassword = () => {
        if (isResetButtonEnabled) {
            onSubmitHandler();
        }
    };

    return (
        <div className="flex justify-center min-h-screen items-start relative pt-20">
            <div className='w-80'>
                <div>
                    <h1 className="font-regular uppercase text-xl text-white text-center mb-10">
                        Forgot your password
                    </h1>
                </div>
                <form>
                    <div className='space-y-6 w-full'>
                        <input
                            type='text'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ring-[#DFC9C2]'
                        />
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ring-[#DFC9C2]'
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                            >
                                {showPassword ? <LockOpenIcon className="h-6 w-6" /> : <LockClosedIcon className="h-6 w-6" />}
                            </span>
                        </div>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ring-[#DFC9C2]'
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                            >
                                {showConfirmPassword ? <LockOpenIcon className="h-6 w-6" /> : <LockClosedIcon className="h-6 w-6" />}
                            </span>
                        </div>
                        <input
                            type='text'
                            placeholder='Access ID'
                            value={accessId}
                            onChange={(e) => setAccessId(e.target.value)}
                            className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none ring-[#DFC9C2]'
                        />
                    </div>
                    <p className=' text-red-400 text-center mt-3'>{error}</p> 
                    
                    <div className='text-center mt-6 text-white'>
                        {/* Reset password button with conditional styling based on button state */}
                        <button
                            type='button'
                            onClick={handleResetPassword}
                            className={`duration-300 bg-[#364c78] ${
                                isResetButtonEnabled
                                    ? 'hover:bg-customDullBlue hover:border-customDullBlue'
                                    : 'cursor-not-allowed opacity-50'
                            } w-full py-3 rounded-3xl mb-10`}
                            disabled={!isResetButtonEnabled}
                        >
                            Reset Password
                        </button>
                    </div>
                    <div className='flex flex-col items-center mt-6'>
                        {/* Link to login page for users with existing accounts */}
                        <p className='text-center text-sm text-white font-light'>
                            Already have an account?
                        </p>
                        <Link to="/login-admin">
                            <p className='text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white'>
                                Login
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
