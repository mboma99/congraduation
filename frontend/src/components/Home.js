import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from './navigation/FocusedNavbar';
import axios from "axios";

export default function Home(props) {
    return (
        <React.Fragment>
            <FocusedNavbar/>
            <div className="absolute -z-9 -right-10 top-0 h-[70%] w-[70%] translate-x-[30%] -translate-y-[20%] rounded-full bg-[#54B8D8] opacity-40 blur-[180px]"></div>
            <div className="absolute -z-9 h-[100%] w-[100%] -translate-x-[40%] translate-y-[20%] rounded-full bg-customIndigo opacity-40 blur-[200px]"></div>
            <div className="flex justify-center min-h-screen items-center relative font-outfit">
                <div className='w-80'>
                    <div>
                        <h1 className=" font-regular uppercase text-xl  text-white text-center  mb-10">
                            Welcome Back
                        </h1>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className='space-y-6 w-full'>
                            <input
                                type='text' placeholder='Email Address'
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none '
                                onChange={(event) => {
                                    onChangeForm("email", event)
                                }}
                            />
                            <input
                                type='password' placeholder='Password'
                                className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none '
                                onChange={(event) => {
                                    onChangeForm("password", event)
                                }}
                            />
                        </div>
                        <div className='text-center mt-6 text-white'>
                            <button type='submit' className='bg-customDullBlue w-full py-3 rounded-3xl'>
                                Login
                            </button>
                        </div>
                        <Link to="/?password-reset" onClick={() => props.setPage("forgot")}>
                            <p className='text-center pt-3 hover:text-white text-sm underline cursor-pointer'>forgot password</p>
                        </Link>
                        <p className='text-center pt-7 text-sm text-white font-light'>don't have and account yet? </p>
                        <Link to="/?create-account" onClick={() => props.setPage("register")}>
                            <p className='text-center text-sm hover:text-white underline cursor-pointer'>create one</p>
                        </Link>


                    </form>
                </div>
                
            </div>
        </React.Fragment>
    )
}