import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Logout';
import UpdateAccount from './UpdatePhotographerAccount';
import PortfolioList from '../portfolio/PortfolioList';
import CreatePortfolio from '../portfolio/CreatePortfolio';
import Popup from 'reactjs-popup';

export const PhotographerAccount = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    // get token from local storage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    setToken(token);

    // fetch data from get user api
    axios
      .get("http://localhost:8000/photographer/", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex ml-5 min-h-screen justify-center items-start relative text-white pt-20">
        <div>
          <div className=''>
            <div className="w-full flex-row bg-[#D9D9D9] bg-opacity-40 p-5 rounded-3xl mb-4 flex-wrap">
              <div className="flex-grow flex-shrink-0 w-1/2 md:w-auto md:flex-grow-0 md:flex-shrink-1 ">
                <ul className="flex flex-col justify-evenly md:flex-row md:items-center">
                  <li className="font-semibold text-3xl">{user.first_name}</li>
                  <li className="font-semibold text-3xl">{user.last_name}</li>
                  <li className="font-light text-xl">{user.email}</li>
                  <li className="font-light text-xl">{user.phone_number}</li>
                  <li>
                    <Popup
                      trigger={<button className=" text-[#69A9D7] uppercase text-center duration-200 text-xl cursor-pointer hover:text-white">update profile</button>}
                      modal
                      nested
                    >
                      {(close) => (
                        <div>
                          <UpdateAccount user={user} onClose={close} />
                        </div>
                      )}
                    </Popup>
                  </li>
                </ul>
              </div>


            </div>

            <div className="flex">
              <div className="text-center flex-row bg-[#D9D9D9] bg-opacity-40 p-5 rounded-3xl mb-10">
                {user && Object.keys(user).length > 0 && (
                  <PortfolioList photographer_id={`${user.id}`} />
                )}
                <div className='mt-10'>
                  <Popup
                    trigger={<button className='text-white duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue py-3 rounded-3xl pl-3 pr-3 mb-1'>Create Portfolio</button>}
                    modal
                    nested>
                    {(close) => (
                      <div className='flex items-center justify-center w-full mb-10'>
                        {user && Object.keys(user).length > 0 && (
                          <CreatePortfolio photographer_id={`${user.id}`} onClose={close} />
                        )}
                      </div>
                    )}
                  </Popup>
                </div>

              </div>
            </div>
          </div>
          <div className='flex items-center justify-center w-full mb-10'>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotographerAccount;
