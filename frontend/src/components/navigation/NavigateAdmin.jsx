import React, { useEffect } from 'react';
import axios from 'axios';

const NavigateAdmin = () => {
  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token');
    const auth_token_type = localStorage.getItem('auth_token_type');
    const token = auth_token_type + ' ' + auth_token;

    axios
      .get('http://localhost:8000/photographer/', {
        headers: { Authorization: token },
      })
      .then((response) => {
        localStorage.setItem('user_type', response.data.result.user_type);
        const user = response.data.result;


        // Redirect to account-admin page if user exists
        window.location.href = `/account-admin/${user.id}&${user.first_name.charAt(0)}&${user.last_name}`;
      })
      .catch((error) => {
        console.error('Error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_type');
        localStorage.removeItem('user_type');
      });
  }, []);

  return null; // This component doesn't render anything visible
};

export default NavigateAdmin;
