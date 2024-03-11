import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

export default function RegisterTwo({ formData, setFormData }) {
    const options = [
        { value: "", label: "Select University" },
        { value: "De Montfort University", label: "De Montfort University" },
        { value: "Staffordshire University", label: "Staffordshire University" },
        { value: "Nottingham Trent University", label: "Nottingham Trent University" },
        { value: "Birmingham University", label: "Birmingham University" }
    ]
    return (
        <React.Fragment>
            <div className='space-y-6 w-full'>
                <div className='flex'>
                    <input
                        type='text' placeholder='Firstname'
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className='block text-sm py-3 px-4 rounded-3xl w-2/4 mr-2 border outline-none focus:ring focus:outline-none '
                    />
                    <input
                        type='text' placeholder='Surname'
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className='block text-sm py-3 px-4 rounded-3xl w-2/4 border outline-none focus:ring focus:outline-none '
                    />
                </div>

                <input
                    type='text' placeholder='Address'
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />

                <input
                    type='text' placeholder='Postcode'
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />
                <input
                    type='text' placeholder='City'
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />
                <input
                    type='text' placeholder='Phone Number'
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />
                <h1 className=" font-regular uppercase text-xl mb-4 text-white text-center cursor-pointer mb-10">
                    university
                </h1>
                <select className='block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}>
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