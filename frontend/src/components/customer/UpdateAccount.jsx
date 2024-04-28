import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const UpdateAccount = ({ user, onClose }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleUniversityChange = (e) => {
        const { value } = e.target;
        setUpdatedUser((prevUser) => ({ ...prevUser, university_id: value }));
    };

    const options = [
        { value: "", label: "Select University" },
        { value: "1", label: "De Montfort University" },
        { value: "2", label: "Staffordshire University" },
        { value: "3", label: "Nottingham Trent University" },
        { value: "4", label: "Birmingham University" }
    ]

    const handleUpdateProfile = () => {
        const auth_token = localStorage.getItem('auth_token');
        const auth_token_type = localStorage.getItem('auth_token_type');
        const token = auth_token_type + ' ' + auth_token;
        // Compare the updated user with the original user
        const personalProfileFields = {};
        const customerProfileFields = {};

        for (const key in updatedUser) {
            if (updatedUser[key] !== user[key]) {
                // Check if the key is one of the specified personal profile fields
                if (["first_name", "last_name", "phone_number"].includes(key)) {
                    personalProfileFields[key] = updatedUser[key];
                } else {
                    // Other fields go into customer profile
                    customerProfileFields[key] = updatedUser[key];
                }
            }
        }

        if (Object.keys(personalProfileFields).length !== 0) {
            axios
                .put("http://localhost:8000/customer/update_person_profile", personalProfileFields, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (Object.keys(customerProfileFields).length !== 0) {
            axios
                .put("http://localhost:8000/customer/update_customer_profile", customerProfileFields, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    console.log(response);
                    if (updatedUser.email !== user.email) {
                        const emailUpdatePayload = {
                            access_token: token,
                            token_type: auth_token_type,
                            email: updatedUser.email,
                        };
                        console.log('email payload:', emailUpdatePayload);
                        axios.post(
                            "http://localhost:8000/auth/token_refresh",
                            emailUpdatePayload
                        ).then((response) => {
                            console.log('NEW TOKEN Response:', response);
                            localStorage.setItem("auth_token", response.data.result.access_token);
                            localStorage.setItem("auth_token_type", response.data.result.token_type);
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        console.log('Updated Personal Profile:', personalProfileFields);
        console.log('Updated Customer Profile:', customerProfileFields);
        setTimeout(() => {
            onClose();
            window.location.reload();
        }, 1000);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <div className="bg-[#1B223C] p-8 font-outfit rounded-3xl">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-white hover:text-[#9291E8] duration-200">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex justify-center">
                    <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Update Profile</h1>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder='First Name'
                            value={updatedUser.first_name}
                            onChange={handleInputChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                        />
                    </div>

                    <div className="mb-4 ml-2">
                        <input
                            type="text"
                            name="last_name"
                            placeholder='Last Name'
                            value={updatedUser.last_name}
                            onChange={handleInputChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="email"
                        placeholder='Email'
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="phone_number"
                        placeholder='Phone Number'
                        value={updatedUser.phone_number}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                    />
                </div>
                <h1 className=" font-regular uppercase text-l mb-4 text-white text-center cursor-pointer mb-10">
                    university
                </h1>
                <select className=' mb-4 block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
                    value={updatedUser.university_id}
                    onChange={handleUniversityChange}>
                    {options.map((data) => {
                        if (data.value === "") {
                            return (
                                <option key={data.label} value={data.value} disabled>
                                    {data.label}
                                </option>
                            );
                        } else {
                            return (
                                <option key={data.label} value={data.value}>
                                    {data.label}
                                </option>
                            );
                        }
                    })}
                </select>



                <div className="flex justify-center">
                    <button
                        onClick={handleUpdateProfile}
                        className=" text-white duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue w-full py-3 rounded-3xl mb-1"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;
