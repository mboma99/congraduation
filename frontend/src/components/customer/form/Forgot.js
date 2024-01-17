import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../../navigation/FocusedNavbar';
import BackgroundActions from '../../../backgrounds/BackgroundActions';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Forgot(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isResetButtonEnabled =
        email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword;

    const handleResetPassword = () => {
        if (isResetButtonEnabled) {

        }
    };

    return (
        <React.Fragment>
            <BackgroundActions />
            <FocusedNavbar />
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
                        <Link to="/?login" onClick={() => props.setPage('login')}>
                            <p className=' text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white'>
                                log in
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}
