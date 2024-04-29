
import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';



const FindPhotos = ({onClose}) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <div className="bg-[#1B223C] p-8 font-outfit w-full ml-3 mr-3 md:w-3/5 rounded-3xl">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-white hover:text-[#9291E8] duration-200">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex justify-center">
                    <h1 className=" uppercase tracking-[.2em] text-xl text-white -mt-6 mb-4">Find Photos</h1>
                </div>
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
                </div>
                
            </div>

)} 
export default FindPhotos;






