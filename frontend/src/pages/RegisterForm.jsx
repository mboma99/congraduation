import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterTwo from '../components/RegisterTwo';
import RegisterOne from '../components/RegisterOne';
import axios from 'axios';

export const RegisterForm = () => {
    const [page, setPage] = useState(0);
    const FormTitles = ["Create Your Account", "Complete Profile"];
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: "",
        postcode: "",
        ciy: "",
        university: "",
        phone_number: "",
    })

    const selectedPage = () => {
        if (page === 0) {
            return <RegisterOne formData={formData} setFormData={setFormData} setPage={setPage} />;
        }
        if (page === 1) {
            return <RegisterTwo formData={formData} setFormData={setFormData} setPage={setPage} />;
        }
    };
    var progressPercentage = 0
    if (page === 0) {
        progressPercentage = (0.5 / (FormTitles.length - 1)) * 100;
    } else {
        progressPercentage = (page / (FormTitles.length - 1)) * 100;
    }

    // sumbit form data to backend
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formData)
        // post data to backend
        axios
            .post("http://localhost:8000/auth/register", formData)
            .then((response) => {
                //console.log(response);
                // redirect to login page
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='flex justify-center min-h-screen items-start relative pt-20 '>
            <div className='w-80'>
                <div className='Header-Title flex flex-col  justify-center items-center'>
                    <h1 className=" font-regular uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                        {FormTitles[page]}
                    </h1>
                    <p className=' text-center mb-4 text-m text-customTextGrey font-light'>
                        Note: Email verification will be required before activating your account.
                    </p>
                </div>

                <div className='flex flex-col items-center mt-1 mb-5'>
                    <div className='w-full h-6 bg-gray-300 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-customDullBlue transition-all duration-500'
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className='flex justify-between w-full mt-2'>
                    </div>
                </div>
                {selectedPage()}
                <div className='flex justify-center  justify-evenly z-auto mt-6'>
                    {page > 0 && (
                        <div className='text-center text-white w-1/2 mr-10'>
                            <button
                                onClick={() => setPage((currPage) => currPage - 1)}
                                className='bg-customDullBlue w-full py-3 rounded-3xl'
                            >
                                Back
                            </button>
                        </div>
                    )}
                    <div className='text-center text-white w-1/2'>
                        <button
                            onClick={(event) => {
                                if (page === FormTitles.length - 1) {
                                    onSubmitHandler(event);
                                } else {
                                    setPage((currPage) => currPage + 1);
                                }
                            }}
                            className='bg-customDullBlue w-full py-3 rounded-3xl'
                        >
                            {page === FormTitles.length - 1 ? "Submit" : "Continue"}
                        </button>
                    </div>
                </div>

                <div className='flex flex-col items-center mt-6'>
                    <p className='text-center text-sm text-white font-light'>
                        Already have an account?
                    </p>
                    <Link to="/login">
                        <p className='text-[#9291E8] text-center duration-200 text-m cursor-pointer hover:text-white'>
                            Login
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm