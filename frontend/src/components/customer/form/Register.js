import React from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../../navigation/FocusedNavbar';
import BackgroundActions from '../../../backgrounds/BackgroundActions';

export default function Register(props) {

    return (
        <React.Fragment>
            <BackgroundActions/>
            <FocusedNavbar/>
            <div>
                <h1 className=" font-thin uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                    Create your account
                </h1>
                <p className='text-center mb-4 text-sm text-customTextGrey font-light'> note email verification will be required <br/> before activating your account.</p>
            </div>
            <form>
                <div className='space-y-6 w-full'>
                    <input
                        type='text' placeholder='Email Address'
                        className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none focus:ring focus:outline-none '
                    />
                    <input
                        type='password' placeholder='Password'
                        className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none '
                    />
                    <input
                        type='password' placeholder='Confirm Password'
                        className='block text-sm py-3 px-4 rounded-3xl w-full border text-center outline-none, focus:ring focus:outline-none'
                    />
                </div>
                <div className='text-center mt-6 text-white'>
                    <Link to="/?customer-details" onClick={()=>props.setPage("registerinfo")}>
                        <button type='submit' className='bg-customDullBlue w-full py-3 rounded-3xl'>
                            Continue
                        </button>
                    </Link>
                </div>
                <p className='text-center pt-7 text-sm text-white font-light'>already have an account ?</p>
                
                <Link to="/?login" onClick={()=>props.setPage("login")}>
                    <p className='text-center text-sm mt-2 underline cursor-pointer hover:text-white'>login</p>
                </Link>


            </form>
        </React.Fragment>
    )
}