import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link }from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UpdatePortfolio = ({ portfolio, onClose }) => {
    const [updatedPortfolio, setUpdatedPortfolio] = useState({ ...portfolio });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPortfolio((prevPortfolio) => ({ ...prevPortfolio, [name]: value }));
    };
    const { portfolio_id } = useParams(); // Extract portfolio ID from URL

    const handleUniversityChange = (e) => {
        const { value } = e.target;
        setUpdatedPortfolio((prevPortfolio) => ({ ...prevPortfolio, university_id: value }));
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
       

        if (Object.keys(updatedPortfolio).length !== 0) {
            if (updatedPortfolio.graduation_year) {
              updatedPortfolio.graduation_year = parseInt(updatedPortfolio.graduation_year);
            }
            updatedPortfolio.is_active = JSON.parse(updatedPortfolio.is_active);
            delete updatedPortfolio.photos;
            
            axios
              .put(`http://localhost:8000/portfolio/update_portfolio/${portfolio_id}`, updatedPortfolio, {
                headers: { Authorization: token },
              })
              .then((response) => {
                //reload the page
                //window.location.reload();
                console.log(response);
                console.log(updatedPortfolio);
              })
              .catch((error) => {
                console.log(error);
                console.log(updatedPortfolio);
              });
          }
        setTimeout(() => {
            onClose();
            //window.location.reload();
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
                    <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Update Portfolio</h1>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="customer_first_name"
                            placeholder='First Name'
                            value={updatedPortfolio.customer_first_name}
                            onChange={handleInputChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                        />
                    </div>

                    <div className="mb-4 ml-2">
                        <input
                            type="text"
                            name="customer_last_name"
                            placeholder='Last Name'
                            value={updatedPortfolio.customer_last_name}
                            onChange={handleInputChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="customer_email"
                        placeholder='Email'
                        value={updatedPortfolio.customer_email}
                        onChange={handleInputChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                    />
                </div>
                <h1 className=" font-regular uppercase text-l text-white text-center cursor-pointer mb-10">
                    university
                </h1>
                <select className=' mb-4 block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
                    value={updatedPortfolio.university_id}
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

export default UpdatePortfolio;
