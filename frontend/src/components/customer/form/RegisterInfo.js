import React from 'react';
import { Link } from 'react-router-dom';
import FocusedNavbar from '../../navigation/FocusedNavbar';
export default function RegisterInfo({ formData, setFormData }) {
    const options = [
    {value:"demontfort", label: "De Montfort University"},
    {value:"staffordshire", label: "Staffordshire University"},
    {value:"nottingham_trent", label: "Nottingham Trent University"},
    {value:"birmingham", label: "Birmingham University"}
    ]
    return (
        <React.Fragment>
                <div className='space-y-6 w-full'>
                    <div className='flex'>
                        <input
                            type='text' placeholder='Firstname' value={formData.first_name}
                            className='block text-sm py-3 px-4 rounded-3xl w-2/4 mr-2 border outline-none focus:ring focus:outline-none '
                        />
                        <input
                            type='text' placeholder='Surname' value={formData.last_name}
                            className='block text-sm py-3 px-4 rounded-3xl w-2/4 border outline-none focus:ring focus:outline-none '
                        />
                    </div>
                    
                    <input
                            type='text' placeholder='Address' value={formData.address}
                            className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                        />
                    
                    <input
                        type='text' placeholder='Postcode' value={formData.postcode}
                        className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                    />
                    <h1 className=" font-regular uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
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
        </React.Fragment>
    )
}