import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons8-graduation-cap-64.png';

export const Footer = () => {
    return (
        <footer className="max-w-screen-sm mx-auto pt-10">
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
            <h1 className='text-2xl items-center uppercase font-semibold text-white text-center cursor-pointer pb-10'>
                <Link to='/' className="flex" ><img  className=' w-9' src={logo} alt="Your Logo" style={{ marginRight: '5px' }} /><span>congraduation</span></Link>
            </h1>
            
            
        </footer>
    )
}

export default Footer
