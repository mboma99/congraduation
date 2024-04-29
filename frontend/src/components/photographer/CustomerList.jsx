import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UniversitySelect from '../UniversitySelect';

const CustomerList = ({ photographer_id }) => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [editId, setEditID] = useState('');
    const [updatedCustomer, setUpdatedCustomer] = useState({ ...customers });
    const [accessCode, setAccessCode] = useState('');


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUpdatedCustomer((prevCustomer) => ({ ...prevCustomer, [name]: newValue }));
    };


    const handleUniversityChange = (e) => {
        const { value } = e.target;
        setUpdatedCustomer((prevCustomer) => ({ ...prevCustomer, university_id: value }));
    };

    const handleAccessCodeChange = (e) => {
        setAccessCode(e.target.value);
    };

    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    const options = [
        { value: "", label: "Select University" },
        { value: "1", label: "De Montfort University" },
        { value: "2", label: "Staffordshire University" },
        { value: "3", label: "Nottingham Trent University" },
        { value: "4", label: "Birmingham University" }
    ];

    const getUniversityName = (id) => {
        const selectedOption = options.find(option => option.value === id);
        return selectedOption ? selectedOption.label : "Unknown";
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/customer/all_customers`, {
                headers: { Authorization: token }
            })
            .then((response) => {
                setCustomers(response.data.result);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
                setError('Error: Customers not found.');
            });
    }, []);

    const handleEdit = (id) => {
        setEditID(id);
    };

    const handleUpdate = ({ id, updatedCustomer }) => {

        // Find the customer to update
        const customer = axios.get(`http://localhost:8000/customer/${id}`, {
            headers: { Authorization: token },
        }).then((response) => {
            return response.data.result;
        })

        console.log("Customer to update: ", customer);
        // Compare the updated user with the original user
        const personalProfileFields = {};
        const customerProfileFields = {};

        for (const key in updatedCustomer) {
            if (updatedCustomer[key] !== customer[key]) {
                // Check if the key is one of the specified personal profile fields
                if (["first_name", "last_name", "phone_number"].includes(key)) {
                    personalProfileFields[key] = updatedCustomer[key];
                } else {
                    // Other fields go into customer profile
                    customerProfileFields[key] = updatedCustomer[key];
                }
            }
        }

        if (Object.keys(personalProfileFields).length !== 0) {
            axios
                .put(`http://localhost:8000/customer/update_profile/${id}`, personalProfileFields, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    //console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    setError(error.response.data.detail);
                    // console.log(error);
                });
        }

        if (Object.keys(customerProfileFields).length !== 0) {
            axios
                .put(`http://localhost:8000/customer/update_customer/${id}`, customerProfileFields, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    //console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    setError(error.response.data.detail);
                    //console.log(error);
                });
        }

        console.log('Updated Personal Profile:', personalProfileFields);
        console.log('Updated Customer Profile:', customerProfileFields);
    };

    const handleDelete = ({ email, accessCode }) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this customer?");
        console.log(email, accessCode);
        if (isConfirmed) {
            console.log(email, accessCode);
            axios.delete(`http://localhost:8000/auth/delete/customer/`, {
                data: { email, access_id: accessCode },
                headers: { Authorization: token },
            })
                .then((response) => {
                    setCustomers(customers.filter(customer => customer.id !== email));
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.response.data.detail);
                });
        }
    };



    return (
        <>
            <div className='lg:flex lg:justify-center lg:space-x-5'>
                <h2 className='font-semibold text-2xl md:text-3xl uppercase'> Manage Customers</h2>

                <input
                    type="text"
                    placeholder='Access Code'
                    className=' text-black lg:absolute lg:right-5 rounded-3xl h-10 pl-5'
                    value={accessCode}
                    onChange={handleAccessCodeChange}
                />
            </div>
            <div className='lg:mt-1'>
                <p className=' text-red-400 mb-3 lg:absolute lg:right-5 '>{error}</p>
            </div>

            <div className="overflow-auto rounded-xl lg:mt-8">
                <table className="border-collapse text-black pointer ">
                    <thead>
                        <tr className=" bg-gray-300 border-b-2 border-gray-400">
                            <th className="border-gray-400 md:p-4 xl:w-full">ID</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Name</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Email</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">University</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Phone Number</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Address</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Postcode</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">City</th>
                            <th className="border-gray-400 md:p-4 xl:w-full">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y'>
                        {customers.map(customer => (
                            <tr key={customer.id} className={customer.id === editId ? "bg-[#d8c9c9] text-sm text-gray-800" : "px-10 py-10 text-sm text-gray-800 bg-gray-100"}>
                                <td className="  font-semibold  border-gray-400 px-4 py-2">
                                    {customer.id}
                                </td>
                                <td className=' p-2'>
                                    {customer.id === editId ? (
                                        <React.Fragment>
                                            <input type='text' className="mb-2 pl-1" placeholder="First Name" value={updatedCustomer.first_name || customer.first_name} name="first_name" onChange={handleInputChange} />
                                            <input className="pl-1" type='text' placeholder="Last Name" value={updatedCustomer.last_name || customer.last_name} name="last_name" onChange={handleInputChange} />
                                        </React.Fragment>
                                    ) : (
                                        `${customer.first_name} ${customer.last_name}`
                                    )}
                                </td>
                                <td className="">
                                    {customer.id === editId ? (
                                        <input className="pl-1" type='text' placeholder='customer@email.com' value={updatedCustomer.email || customer.email} name="email" onChange={handleInputChange} />
                                    ) : (
                                        customer.email
                                    )}
                                </td>
                                <td className="whitespace-nowrap pl-3 pr-3">
                                    {customer.id === editId ? (
                                        <select className=' mb-4 block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
                                            value={updatedCustomer.university_id}
                                            onChange={handleUniversityChange}>
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
                                    ) : (
                                        getUniversityName(customer.university_id)
                                    )}
                                </td>
                                <td className="whitespace-nowrap pl-3 pr-3">
                                    {customer.id === editId ? (
                                        <input className="pl-1" type='text' placeholder='Phone Number' value={updatedCustomer.phone_number || customer.phone_number} name="phone_number" onChange={handleInputChange} />
                                    ) : (
                                        customer.phone_number
                                    )}
                                </td>
                                <td className="pl-3 pr-3">
                                    {customer.id === editId ? (
                                        <input className="pl-1" type='text' placeholder='Address' value={updatedCustomer.address || customer.address} name="address" onChange={handleInputChange} />
                                    ) : (
                                        customer.address
                                    )}
                                </td>
                                <td className="whitespace-nowrap pl-3 pr-3">
                                    {customer.id === editId ? (
                                        <input className="pl-1" type='text' placeholder='Postcode' value={updatedCustomer.postcode || customer.postcode} name="postcode" onChange={handleInputChange} />
                                    ) : (
                                        customer.postcode
                                    )}
                                </td>
                                <td className="whitespace-nowrap pl-3 pr-3">
                                    {customer.id === editId ? (
                                        <input className="pl-1" type='text' placeholder='City' value={updatedCustomer.city || customer.city} name="city" onChange={handleInputChange} />
                                    ) : (
                                        customer.city
                                    )}
                                </td>
                                <td className="pl-2.5 whitespace-nowrap">
                                    {customer.id === editId ? (
                                        <button className="hover:font-bold transition" onClick={() => handleUpdate({ id: customer.id, updatedCustomer: updatedCustomer })}>Update</button>
                                    ) : (
                                        <React.Fragment>
                                            <button className="text-blue-500 hover:font-bold mr-4" onClick={() => handleEdit(customer.id)}>Edit</button>
                                            <button className='text-red-500 hover:font-bold mr-4' onClick={() => handleDelete({ email: customer.email, accessCode: accessCode })}>Delete</button>
                                        </React.Fragment>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomerList;
