import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Background from '../components/backgrounds/Background';
import GraduateImage from '../components/assets/graduate_main.svg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [showValidation, setShowValidation] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowValidation(false); // Hide validation message when input changes
    };

    const handleSearch = () => {
        // Validate input only when the search button is clicked
        const isValidFormat = validateInput(inputValue);
        setShowValidation(!isValidFormat);
        if (isValidFormat) {
            window.location.href = `/shop/${inputValue}`;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            handleSearch();
        }
    };

    const validateInput = (value) => {
        // Regular expressions for email and UUID validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

        // Check if input matches either email or UUID format
        const isValidFormat = emailRegex.test(value) || uuidRegex.test(value);
        setIsValid(isValidFormat);
        return isValidFormat;
    };

    return (
        <div className="flex flex-col justify-start min-h-screen items-start relative md:pt-20">
            <div className='flex'>
                <div className='left-side md:w-1/2'>
                    <h1 className='text-5xl font-semibold md:text-6xl mb-10 tracking-[.08em] text-white'>Celebrate your hard work. <br />Memories deserve to be captured.</h1>
                    <p className='text-white uppercase'>already Graduated ?</p>
                    <form className="flex flex-row w-full mt-5 mb-2 items-center bg-[#1f1f1f] hover:bg-customDullBlue rounded-3xl">
                        <input
                            placeholder='Enter Image Ref | Grad Email'
                            type='text'
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown} // Listen for Enter key
                            className={`w-full text-m py-3 px-3 text-[#696969] rounded-s-full border text-left outline-none focus:ring focus:outline-none ${isValid ? '' : 'border-red-500'}`} // Add red border for invalid input
                        />
                        <MagnifyingGlassIcon onClick={handleSearch} className="h-6 w-6 ml-4 mr-4 text-gray-400 cursor-pointer hover:text-white" />
                    </form>
                    {showValidation && !isValid && <p className='text-red-500'>Please enter a valid email or UUID.</p>}
                    <p className='text-white uppercase mb-5'>Not Graduated yet?</p>
                    <Link to="/about" ><button type="submit" className="w-48 border h-16 py-3 px-4 uppercase font-normal bg-transparent transition duration-300 hover:bg-customDullBlue text-white rounded-full">find out more</button></Link>
                </div>
                <div className='hidden  md:right-side md:w-1/2 md:translate-x-1 sm:flex'>
                    <img src={GraduateImage} alt="Graduate" className='w-fit' />
                </div>
            </div>
        </div>
    )
}

export default Home;
