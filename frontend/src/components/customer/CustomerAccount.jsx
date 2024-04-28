import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Logout'
import UpdateAccount from './UpdateAccount';
import Popup from 'reactjs-popup';
import UpdateAddress from './UpdateAddress';
import UpdatePassword from './UpdatePassword';
import FindPhotos from './FindPhotos';

export const CustomerAccount = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // get token from local storage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;


    //  fetch data from get user api
    axios
      .get("http://localhost:8000/customer/", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex min-h-screen justify-center md:items-start relative text-white pt-7 md:pt-20">
        <div>
          <div className='md:flex-row ml-7 md:ml-auto'>
            <div className="md:flex md:justify-between">
              <div className="items-center w-80  md:w-1/2 text-center flex-row justify-center  bg-[#D9D9D9] bg-opacity-40 p-10 rounded-3xl mb-10">
                <div className='space-y-2 cursor-default'>
                  <div className="font-semibold text-3xl">{user.first_name}</div>
                  <div className="font-semibold text-3xl">{user.last_name}</div>
                  <div className="font-light text-xl">{user.university}</div>
                  <div className="font-light text-xl">{user.email}</div>
                  <div className="font-light text-xl">{user.phone_number}</div>
                  <div className="font-light text-xl">{user.address}</div>
                  <div className="font-light text-xl">{user.city}</div>
                  <div className="font-light text-xl">{user.postcode}</div>
                </div>
                <div className=''>
                  <Popup
                    trigger={<button className='mt-10 text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white'>update profile</button>}
                    modal
                    nested>
                    {(close) => (
                      <div>
                        <UpdateAccount user={user} onClose={close} />
                      </div>
                    )}
                  </Popup>

                </div>

              </div>
              <div>
                <div className=" md:ml-10  w-80 md:w-96 items-center text-center flex-row justify-center  bg-[#D9D9D9] bg-opacity-40 p-8 rounded-3xl mb-10 h-fit">
                  <div className='font-medium uppercase text-2xl'>Graduate photos</div>
                  <p className=' font-light'>Find photos  and other memorabilia from  your graduation</p>
                  <Popup
                    trigger={<button className='mt-10 text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white'>Find Photos</button>}
                    modal
                    nested>
                    {(close) => (
                      <div>
                        <FindPhotos onClose={close} />
                      </div>
                    )}
                  </Popup>
                </div>
                <div className=" md:ml-10 w-80 md:w-96 items-center text-center flex-row justify-center  bg-[#D9D9D9] bg-opacity-40 p-8 rounded-3xl mb-10 h-fit">
                  <div className='font-medium uppercase text-2xl'>Shipping Address</div>
                  <p className='font-light'>Make sure your address details are up to date.</p>
                  <div className=''>
                  <Popup
                    trigger={<button className='mt-10 text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white'>update address</button>}
                    modal
                    nested>
                    {(close) => (
                      <div>
                        <UpdateAddress user={user} onClose={close} />
                      </div>
                    )}
                  </Popup>

                </div>
                </div>
              </div>

            </div>
            <div className="md:flex">
              <div>
                <div className="items-center w-80 md:w-full text-center flex-row justify-center  bg-[#D9D9D9] bg-opacity-40 p-8 rounded-3xl mb-10 h-fit">
                  <div className='font-medium uppercase text-2xl'>password</div>
                  <p className='font-light'>Make your password stronger, or change it if someone else knows it.</p>
                  <Popup
                    trigger={<button className='mt-10 text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white'>Change Password</button>}
                    modal
                    nested>
                    {(close) => (
                      <div>
                        <UpdatePassword user={user} onClose={close} />
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
              <div className="md:ml-10 w-80 text-center flex-row bg-[#D9D9D9] bg-opacity-40 p-5 md:p-10 rounded-3xl mb-10">
                <div className='font-medium uppercase text-2xl'>order history</div>
                <p className='font-light'>Track orders and view previous orders.</p>
                <div className='mt-10 text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white'>
                track orders
                </div>
              </div>

            </div>
          </div>
          <div className='flex items-center justify-center  md:-full mb-10'>
            <Logout />
          </div>

        </div>
      </div>

    </>
  );
};

export default CustomerAccount;
