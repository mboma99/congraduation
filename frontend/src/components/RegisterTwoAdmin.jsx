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
                    type='phone' placeholder='Phone Number'
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />
                <input
                    type='text' placeholder='Access ID'
                    value={formData.access_id}
                    onChange={(e) => setFormData({ ...formData, access_id: e.target.value })}
                    className='block text-sm py-3 px-4 rounded-3xl w-full border outline-none focus:ring focus:outline-none '
                />


            </div>
        </React.Fragment>
    )
}