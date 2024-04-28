import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline'; // Import the copyright logo from Heroicons
import logo from '../assets/icons8-graduation-cap-64.png';

export const Footer = () => {
    return (
        <footer className="bg-black pb-28 md:pb-0">
            <div className='max-w-screen-sm pt-10 ml-5 mr-5 md:ml-auto md:mr-auto'>
                <ul className="flex justify-center items-center uppercase space-x-4 md:space-x-20">
                    <li>
                        <p className="hover:text-gray-800 text-white"><Link to='/'>Home</Link></p>
                    </li>
                    <li>
                        <p className="hover:text-gray-800 text-white"><Link to='/about#delivery-return'>Delivery & Returns</Link></p>
                    </li>
                    <li>
                        <p className="hover:text-gray-800 text-white"><Link to='/about'>About</Link></p>
                    </li>
                </ul>
                <hr className="my-2 border-t-2 border-b-2 border-white w-full" />
                <h1 className='w-full flex justify-center text-2xl uppercase font-semibold text-white text-center cursor-pointer pb-5'>
                    <Link to='/' className="flex"><img className='w-9' src={logo} alt="Your Logo" style={{ marginRight: '5px' }} /><span>congraduation</span></Link>
                </h1>
                <div className="flex justify-center items-center pb-5">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> {/* Using Heroicons ShieldCheckIcon */}
                    <p className="text-gray-500 text-sm ml-2">&copy; {new Date().getFullYear()} James Mboma. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
