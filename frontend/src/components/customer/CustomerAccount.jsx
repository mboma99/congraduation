import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const onClickHandler = (event) => {
    event.preventDefault();

    // remove token form local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");

    // reload page
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div>

      <div className="flex justify-center min-h-screen items-start relative  text-white pt-20">
        <div className="w-80 ">
          <h1 className=' text-2xl'>CustomerAccount</h1>
          <div className=''> name: {user.first_name} {user.last_name}</div>
          <div className=''> email: {user.email} </div>
          <div className=''> phone: {user.phone_number} </div>
          <div className=''> address: </div>
          <div className=''> city: </div>
          <div className=''> Univeristy: </div>
          <button
            onClick={(event) => {
              onClickHandler(event);
            }}
            className="duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue w-full py-3 rounded-3xl mb-1"
          >
            Log out
          </button>


        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
