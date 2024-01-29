import React, { useState }from 'react';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function RegisterOne({ formData, setFormData }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    return (
        <React.Fragment>
                <div className='space-y-6 w-full'>
                    <input
                        type='text' placeholder='Email Address' 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none '
                    /><div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        </React.Fragment>
    )
}