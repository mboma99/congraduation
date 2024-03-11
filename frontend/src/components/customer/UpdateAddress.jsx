import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const UpdateAddress = ({ user, onClose }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleUpdateProfile = () => {
        const auth_token = localStorage.getItem('auth_token');
        const auth_token_type = localStorage.getItem('auth_token_type');
        const token = auth_token_type + ' ' + auth_token;
        const customerProfileFields = {};

        for (const key in updatedUser) {
            if (updatedUser[key] !== user[key]) {
                customerProfileFields[key] = updatedUser[key];
            }
        }

        if (Object.keys(customerProfileFields).length !== 0) {
            axios
                .put("http://localhost:8000/customer/update_customer_profile", customerProfileFields, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


        console.log('Updated Customer Profile:', customerProfileFields);

        onClose();
        window.location.reload();
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
                    <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Update Address</h1>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="address"
                        placeholder='Address'
                        value={updatedUser.address}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="city"
                        placeholder='City'
                        value={updatedUser.city}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="postcode"
                        placeholder='Postcode'
                        value={updatedUser.postcode}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                    />
                </div>


                <div className="flex justify-center">
                    <button
                        onClick={handleUpdateProfile}
                        className=" text-white duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue w-full py-3 rounded-3xl mb-1"
                    >
                        Update Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAddress;
