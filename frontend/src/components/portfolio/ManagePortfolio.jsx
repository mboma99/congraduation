import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import chakraUI, { SimpleGrid, Image, HStack, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Spinner } from '@chakra-ui/react';
import UpdatePortfolio from './UpdatePortfolio';

const ManagePortfolio = () => {
    const { portfolio_id } = useParams(); // Extract portfolio ID from URL
    const [portfolio, setPortfolio] = useState(null);
    const [allPhotos, setAllPhotos] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
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

    const auth_token = localStorage.getItem('auth_token');
    const auth_token_type = localStorage.getItem('auth_token_type');
    const token = auth_token_type + ' ' + auth_token;

    const onInptChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
    };

    const onFileUpload = (e) => {
        setShowSpinner(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios.post(`http://localhost:8000/portfolio/${portfolio_id}/upload_photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
            },
        })
            .then((response) => {
                console.log(response);
                setUploadSuccess(!uploadSuccess);
                setShowSpinner(false);
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
                setShowSpinner(false);
            });

    }

    const deletePhoto = (photoId) => {
        axios.delete(`http://localhost:8000/portfolio/${portfolio_id}/delete_photo/${photoId}`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                console.log(response);
                setUploadSuccess(!uploadSuccess);
            })
            .catch((error) => {
                console.error('Error deleting photo:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/portfolio/specific_portfolio/${portfolio_id}`, {
                headers: { Authorization: token },
            })
            .then((response) => {
                setPortfolio(response.data);
                setAllPhotos(response.data.photos);
            })
            .catch((error) => {
                console.error('Error fetching specific portfolio:', error);
            });
    }, [uploadSuccess]);



    console.log(portfolio);
    return (
        <div className=''>


            <div className=' w-full min-h-screen justify-center items-center relative text-white '>
                <Breadcrumb ml={1} >
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/account-admin/{}">Account</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Manage Portfolio</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {portfolio ? (
                    <div className='w-full text-center bg-[#D9D9D9] bg-opacity-40 p-5 rounded-3xl mb-4'>
                        <h1 className='text-2xl font-semibold mb-4'>Portfolio Data</h1>
                        <div className='w-full md:flex justify-evenly text-xl'>
                            <p>{portfolio.customer_first_name} {portfolio.customer_last_name}</p>
                            <p>{portfolio.customer_email}</p>
                            <p>{getUniversityName(portfolio.university_id)}</p>
                            <p>{portfolio.graduation_year}</p>
                            <p>{portfolio.is_active ? 'Active' : 'Inactive'}</p>
                        </div>
                        <Popup
                            trigger={<button className=" text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white">update profile</button>}
                            modal
                            nested>
                            {(close) => (
                                <div>
                                    <UpdatePortfolio portfolio={portfolio} onClose={close} />
                                </div>
                            )}
                        </Popup>
                    </div>

                ) : (
                    <p>Loading...</p>
                )}
                <HStack className='w-full place-content-center bg-[#D9D9D9] bg-opacity-40 p-5 rounded-3xl mb-4 flex flex-col justify-center items-center'>
                    <input type='file' onChange={onInptChange} />
                    <button isDisabled={!isSelected} onClick={onFileUpload} className='text-white duration-300 bg-[#3577fb] hover:bg-customDullBlue hover:border-customDullBlue pl-4 pr-5 p-2 rounded-3xl'>
                        Upload Photo
                    </button>
                    {
                        showSpinner && (
                            <Center>
                                <Spinner className='h-5'></Spinner>
                            </Center>
                        )
                    }
                </HStack>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
                    {Array.isArray(allPhotos) && allPhotos.map((photo, index) => (
                        <div key={index} className="relative group overflow-hidden">
                                <Image
                                    borderRadius={15}
                                    src={photo.image_url}
                                    fallback=''
                                    objectFit="cover"
                                    className="transition-opacity duration-300"
                                />

                                <div className="absolute space-x-3 inset-0 bg-gray-500 opacity-10 transition-opacity duration-300 group-hover:opacity-95 rounded-md flex items-center justify-center">
                                    <Popup
                                        trigger={<button className='p-2  bg-slate-400 rounded-xl hover:bg-[#3577fb]'>DETAILS</button>}
                                        modal
                                        nested
                                    >
                                        {(close) => (
                                            <div className="p-8 bg-white rounded-md">
                                                <p>Photo ID: {photo.id}</p>
                                                <p>Photo URL: {photo.image_url}</p>
                                                <p>Price: {photo.price}</p>
                                                <div className="flex justify-center mt-4">
                                                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={close}>Close</button>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                    <Popup
                                        trigger={<button className='p-2 bg-slate-400 rounded-xl hover:bg-red-500'>DELETE</button>}
                                        modal
                                        nested
                                    >
                                        {(close) => (
                                            <div className="p-8 bg-white rounded-md">
                                                <p>Are you sure you want to delete this photo?</p>
                                                <div className="flex justify-center mt-4">
                                                    <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => { deletePhoto(photo.id); close(); }}>Yes</button>
                                                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={close}>Cancel</button>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                    ))}
                            <Divider />
                        </div>
            </div>
            </div>
            );
};

            export default ManagePortfolio;
