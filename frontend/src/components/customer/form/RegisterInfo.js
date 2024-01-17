import React from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../../navigation/FocusedNavbar';
export default function RegisterInfo(props) {
    const options = [
    {value:"demontfort", label: "De Montfort University"},
    {value:"staffordshire", label: "Staffordshire University"},
    {value:"nottingham_trent", label: "Nottingham Trent University"},
    {value:"birmingham", label: "Birmingham University"}
    ]
    return (
        <React.Fragment>
            <FocusedNavbar/>
            <div>
                <h1 className=" font-thin uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                    complete profile
                </h1>
                <p className='text-center mb-4 text-sm text-customTextGrey font-light'> note email verification will be required <br /> before activating your account.</p>
            </div>
            <form>
                <div className='space-y-6 w-full'>
                    <div className='flex'>
                        <input
                            type='text' placeholder='Firstname'
                            className='block text-sm py-3 px-4 rounded-3xl w-2/4 mr-2 border outline-none focus:ring focus:outline-none '
                        />
                        <input
                            type='text' placeholder='Surname'
                            className='block text-sm py-3 px-4 rounded-3xl w-2/4 border outline-none focus:ring focus:outline-none '
                        />
                    </div>
                    
                    <input
                            type='text' placeholder='Address'
                            className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                        />
                    
                    <input
                        type='text' placeholder='Postcode'
                        className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                    />
                    <h1 className=" font-thin uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                        university
                    </h1>
                    <select className='block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'>
                        {options.map((data) => {
                            if (data.value === "") {
                                return (
                                    <option key={data.label} value={data.value} disabled>
                                        {data.label}
                                    </option>
                                );
                            } else {
                                return (
                                    <option key={data.label} value={data.value}>
                                        {data.label}
                                    </option>
                                );
                            }
                        })}
                    </select>

                    
                </div>
                <div className='text-center mt-6 text-white'>
                    <button type='submit' className='bg-customDullBlue w-full py-3 rounded-3xl'>
                        Continue
                    </button>
                </div>
                <p className='text-center pt-7 text-sm text-white font-light'>already have an account ?</p>
                <Link to="/?login" onClick={()=>props.setPage("login")}>
                    <p className='text-center text-sm mt-2 underline cursor-pointer hover:text-white'>login</p>
                </Link>


            </form>
        </React.Fragment>
    )
}