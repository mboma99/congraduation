import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="max-w-screen-sm mx-auto">
            <ul className="flex justify-center items-center uppercase space-x-4 md:space-x-10 md:space-x-20">
                <li>
                    <p className="hover:text-gray-800 text-white"><Link to='/about'>About</Link></p>
                </li>
                <li>
                    <p className="hover:text-gray-800 text-white"><Link to='/about'>Delivery & Returns</Link></p>
                </li>
                <li className="group -m-2 flex items-center p-2">
                    <Link to='/cart' className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-800"
                            aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">0</span>
                        <span className="sr-only">items in cart, view bag</span>
                    </Link>
                </li>
            </ul>
            <hr className="my-2 border-t-2 border-b-2 border-white w-full" />
            <h1 className='text-2xl font-semibold text-white text-center cursor-pointer'><Link to='/'>congraduation</Link></h1>
        </footer>
    )
}

export default Footer
