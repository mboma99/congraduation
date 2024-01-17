import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Footer() {
    return (
        <footer className="max-w-screen-2xl mx-auto">
            <ul className="flex justify-center items-center uppercase space-x-4 md:space-x-10 md:space-x-20">
                <li><a href="#" className="text-white hover:text-gray-800">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-800">About</a></li>
                <li className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-800" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                </li>
            </ul>
            <hr className="my-2 border-t-2 border-b-2 border-white w-full" />
            <h1 className='text-2xl font-semibold text-white text-center cursor-pointer'>congraduation</h1>
        </footer>
    );
}
