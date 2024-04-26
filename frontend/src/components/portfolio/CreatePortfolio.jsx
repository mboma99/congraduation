// CreatePortfolio.js

import React, { useState } from 'react';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import UniversitySelect from '../UniversitySelect';

const CreatePortfolio = ({ photographer_id, onClose }) => {
  const [portfolioData, setPortfolioData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;
  
    e.preventDefault();
    try {
      console.log(portfolioData);
      await axios.post(`http://localhost:8000/portfolio/create_portfolio/${photographer_id}`, portfolioData, {
        headers: { Authorization: token }
      });
      onClose();
      // Reload the page 
      console.log(portfolioData)
      //window.location.reload();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      console.log(photographer_id);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({ ...portfolioData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPortfolioData({ ...portfolioData, [name]: checked });
  };

  const handleUniversityChange = (selectedValue) => {
    setPortfolioData((prevData) => ({
        ...prevData,
        university_id: selectedValue
    }));
};


  
  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="bg-[#1B223C] p-8 font-outfit rounded-3xl">
        <div className="flex justify-end">
            <button onClick={onClose} className="text-white hover:text-[#9291E8] duration-200">
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
        <div className="flex justify-center">
            <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Create Portfolio</h1>
        </div>
        <div className='flex justify-between text-black'>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="customer_first_name"
                            placeholder='First Name'
                            onChange={handleChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                        />
                    </div>

                    <div className="mb-4 ml-2 ">
                        <input
                            type="text"
                            name="customer_last_name"
                            placeholder='Last Name'
                            onChange={handleChange}
                            className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                        />
                    </div>
        </div>
        <div className="mb-4">
                    <input
                        type="text"
                        name="customer_email"
                        placeholder='Customer Email'
                        onChange={handleChange}
                        className="w-full text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none"
                    />
        </div>
        <h1 className=" font-regular uppercase text-l mb-4 text-white text-center cursor-pointer">
            university
        </h1>
        <div className="flex" >
          <UniversitySelect  onChange={handleUniversityChange} />
        </div>
        <div className='mt-4 flex '>
          <input className = " text-sm py-3 px-4 rounded-3xl border outline-none focus:ring focus:outline-none" type="number" placeholder= "Graduation Year"name="graduation_year" onChange={handleChange} />
          <label className='text-white ml-5 pt-3'>
            Is Active:
            <input type="checkbox" className="ml-2" name="is_active" checked={portfolioData.is_active} onChange={handleCheckboxChange} />
          </label>
        </div>
        <div className='mt-10 flex items-center justify-center w-full'>
            <button type="submit" className='text-white duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue py-3 rounded-3xl pl-3 pr-3 mb-1'>Create Portfolio</button>
        </div>
        </form>
    </div>
  );
};

export default CreatePortfolio;
