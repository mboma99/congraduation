import React, { useState } from 'react';
import { XMarkIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const UpdatePassword = ({ user, onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const auth_token = localStorage.getItem('auth_token');
    const auth_token_type = localStorage.getItem('auth_token_type');
    const token = auth_token_type + ' ' + auth_token;

    const onSubmitHandler = async () => {
        const data = {
            email: user.email,
            new_password: password,
        };

        axios
            .post("http://localhost:8000/auth/forgot-password", data)
            .then((response) => {
                const token_refresh = {
                    access_token: token,
                    token_type: auth_token_type,
                    email: user.email,
                };
                axios.post(
                    "http://localhost:8000/auth/token_refresh",
                    token_refresh
                ).then((response) => {
                    console.log('NEW TOKEN Response:', response);
                    localStorage.setItem("auth_token", response.data.result.access_token);
                    localStorage.setItem("auth_token_type", response.data.result.token_type);
                })

                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isResetButtonEnabled =
        user.email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword;

    const handleResetPassword = () => {
        if (isResetButtonEnabled) {
            onSubmitHandler();
        }
    };

    return (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <div className="bg-[#1B223C] p-8 font-outfit rounded-3xl w-96">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-white hover:text-[#9291E8] duration-200">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex justify-center">
                    <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Update Password</h1>
                </div>

                <form>
                    <div className='space-y-6 w-full'>
                        <input
                            type='text'
                            readOnly={true}
                            placeholder='Email Address'
                            value={user.email}
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
                    </div>
                    <div className='text-center mt-6 text-white'>
                        <button
                            type='button'
                            onClick={handleResetPassword}
                            className={`duration-300 bg-[#364c78] ${isResetButtonEnabled
                                ? 'hover:bg-customDullBlue hover:border-customDullBlue'
                                : 'cursor-not-allowed opacity-50'
                                } w-full py-3 rounded-3xl mb-10`}
                            disabled={!isResetButtonEnabled}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
