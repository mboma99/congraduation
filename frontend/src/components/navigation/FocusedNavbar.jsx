import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const FocusedNavbar = () => {
    return (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pt-10 p-4">
            <h1 className='tracking-[.3em] uppercase text-2xl font-semibold text-white text-center cursor-pointer'><Link to='/'>congraduation</Link></h1>
        </div>
    )
}

export default FocusedNavbar