import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async () => {
        // Use the states directly instead of the forgotForm object
        const data = {
            email: email,
            new_password: password,
        };

        // post data to backend
        axios
            .post("http://localhost:8000/auth/forgot-password", data)
            .then((response) => {
                //console.log(response);
                // redirect to login page
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isResetButtonEnabled =
        email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword;

    const handleResetPassword = () => {
        if (isResetButtonEnabled) {
            onSubmitHandler();
        }
    };

    return (
        <div className="flex justify-center min-h-screen items-start relative pt-20">
            <div className='w-80'>
                <div>
                    <h1 className="font-regular uppercase text-xl  text-white text-center  mb-10">
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
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none ring-[#DFC9C2]'
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
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none ring-[#DFC9C2]'
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                            >
                                {showPassword ? <LockOpenIcon className="h-6 w-6" /> : <LockClosedIcon className="h-6 w-6" />}
                            </span>
                        </div>
                    </div>
                    <div className='text-center mt-6 text-white'>
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
                        <p className='text-center text-sm text-white font-light'>
                            Already have an account?
                        </p>
                        <Link to="/login">
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
