import React, { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    return (
        <React.Fragment>
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-10 p-4">
                    <h1 className='tracking-[.3em] uppercase text-2xl font-semibold text-white text-center cursor-pointer'>congraduation</h1>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex text-base tracking-[.3em] uppercase flex-col mt-4 md:flex-row md:space-x-10 md:mt-0">
                            <li>
                                <a href="#" className="text-white hover:text-gray-800">Home</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 text-white">About</a>
                            </li>
                            <li>
                                <a href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-800"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}