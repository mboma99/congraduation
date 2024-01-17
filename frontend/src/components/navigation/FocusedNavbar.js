import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FocusedNavbar(props) {
    return (
        <React.Fragment>
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pt-10 p-4">
                    <h1 className='tracking-[.3em] uppercase text-2xl font-semibold text-white text-center cursor-pointer'>congraduation</h1>
                </div>
            </nav>
        </React.Fragment>
    )
}