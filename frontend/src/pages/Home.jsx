import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Background from '../components/backgrounds/Background';
import GraduateImage from '../components/assets/graduate_main.svg';

export const Home = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex flex-col justify-start min-h-screen items-start relative pt-20 ml-5">
            <div className='main-banner flex'>
                <div className='left-side w-1/2' >
                    <h1 className='flex font-semibold text-6xl mb-10 tracking-[.08em] text-white'>Celebrate your hard work. <br />Memories deserve to be captured.</h1>
                    <p className='text-white uppercase'>already Graduated ?</p>
                    <div className="flex items-center mt-5 mb-10">
                        <input
                            placeholder='Enter Image Ref | Graduate Email'
                            type='text'
                            value={inputValue}
                            onChange={handleInputChange}
                            className='block text-m py-3 px-4 text-[#696969] rounded-s-full w-80 h-16 border text-center outline-none focus:ring focus:outline-none'
                        />
                        <Link to={inputValue ? `/shop/${inputValue}` : '/'} className="-m-7 text-center w-40 h-16 py-3 px-4 uppercase font-normal bg-customDullBlue  transition duration-300 hover:bg-[#6b90dc] text-white rounded-full">my photos</Link>
                    </div>
                    <p className='text-white uppercase mb-5'>Not Graduated yet?</p>
                    <button type="submit" className=" w-48 border h-16 py-3 px-4 uppercase font-normal bg-transparent  transition duration-300 hover:bg-customDullBlue text-white rounded-full">find out more</button>
                </div>
                <div className='right-side w-1/2 translate-x-1'>
                    <img src={GraduateImage} alt="Graduate" className=' w-fit ' />
                </div>

            </div>
        </div>
    )
}

export default Home
