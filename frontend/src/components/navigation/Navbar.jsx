import React, { useState, useContext } from 'react';
import { ShoppingBagIcon, UserIcon, InformationCircleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Divider } from '@chakra-ui/react';
import logo from '../assets/icons8-graduation-cap-64.png';
import axios from 'axios';
import { CartContext } from '../../CartContext';
import CartProduct from '../CartProduct';
import { loadStripe } from '@stripe/stripe-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ChakraProvider
} from '@chakra-ui/react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cart = useContext(CartContext);
  const [stripePromise, setStripePromise] = useState(null);

  useState(() => {
    const stripe = loadStripe('pk_test_51HLUDEAxTn6e6ofy786wd731S8fvF30ZKoHQFI2Bc5cONfgSrOMA447wEk9SdA3asLlWgNAebYPiK6PLsOThmJmE00gOaqfO6U');
    setStripePromise(stripe);
  }, []);

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  const handleUserIconClick = () => {
    const userType = localStorage.getItem('user_type');
    const auth_token = localStorage.getItem('auth_token');
    const auth_token_type = localStorage.getItem('auth_token_type');
    const token = auth_token_type + ' ' + auth_token;

    if (userType === 'customer') {
      axios
        .get("http://localhost:8000/customer/", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const user = response.data.result;
          window.location.href = `/account/${user.id}&${(user.first_name).charAt(0)}&${user.last_name}`;
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Remove token and user type from local storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_token_type');
            localStorage.removeItem('user_type');
            navigate('/login');
          }
          console.error(error);
        });

    } else if (userType === 'photographer') {
      axios
        .get('http://localhost:8000/photographer/', {
          headers: { Authorization: token },
        })
        .then((response) => {
          const user = response.data.result;
          navigate(`/account-admin/${user.id}&${user.first_name.charAt(0)}&${user.last_name}`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Remove token and user type from local storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_token_type');
            localStorage.removeItem('user_type');
            navigate('/login-admin');
          }
          console.error('Error fetching photographer:', error);
          navigate('/login-admin');
        });
    } else {
      navigate('/login');
    }
  };

  const checkout = async () => {
    try {
        const stripe = await stripePromise;
        
        axios.post('http://localhost:8000/stripe/checkout/', {
            items: cart.items
        })
        .then(response => {
            localStorage.setItem('Stripe_data',response)
            localStorage.setItem('Products', JSON.stringify(cart.items));
            // Handle response data
            if (response && response.data) {
                const result = stripe.redirectToCheckout({
                    sessionId: response.data.id
                });
                
                if (result.error) {
                    console.error('Error during checkout:', result.error);
                }
            } else {
                console.error('Invalid response:', response);
            }
        })
        .catch(error => {
            console.error('Error during checkout:', error);
        });
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};




  return (
    <nav>
      <div className="max-w-screen-xl md:flex md:flex-wrap mb:items-center md:justify-between md:mx-auto md:pt-10 md:ml-5 md:mr-5 xl:ml-auto xl:mr-auto">
        <h1 className='sm:w-full md:w-auto tracking-[.3em] flex justify-center mt-5 md:mt-0 uppercase text-2xl font-semibold text-white text-center cursor-pointer'>
          <Link to='/' className="flex items-center" ><img className='w-10 md:w-9' src={logo} style={{ marginRight: '5px' }} /><span>congraduation</span></Link>
        </h1>
        <button
          type="button"
          className="inline-flex items-center md:p-2 md:w-10 md:h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden">
        </button>

        <div className=" w-full rounded-full md:ml-0 md:mr-0 md:block pt-7 h-20 md:pt-0 md:h-0 md:w-auto bg-gray-700 z-20 bottom-4 md:bottom-0 fixed md:relative md:bg-transparent" id="navbar-default">
          <ul className="flex text-base justify-evenly tracking-[.3em] uppercase flex-row md:space-x-10 md:mt-0">
            <li className="block md:hidden "> 
            <Link to='/'>
              <HomeIcon className="h-6 w-6 text-white hover:text-blue-600 " />
            </Link>
            </li>
            <li className="hidden md:block">
              <p className="hover:text-gray-800 text-white">
                <Link to='/about'>
                  About
                </Link>
              </p>
            </li>

            <li className="block md:hidden">
              <Link to='/about'>
                <InformationCircleIcon className="h-6 w-6 text-white hover:text-blue-600 md:hover:text-gray-800" />
              </Link>
            </li>
            <li>
              <button onClick={handleUserIconClick} className="focus:outline-none">
                <UserIcon className="h-6 w-6 text-white hover:text-blue-600 md:hover:text-gray-800" />
              </button>
            </li>
            <li>

              <div onClick={onOpen} className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-white hover:text-blue-600 md:group-hover:text-gray-800"
                  aria-hidden="true"
                />
                {productsCount > 0 ?
                  <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">({productsCount})</span>
                  : null
                }
              </div>

            </li>
          </ul>
        </div>
      </div>
      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="font-outfit">
            <ModalHeader> <h1 className='text-2xl'>Shopping Basket</h1></ModalHeader>
            <ModalCloseButton />
            <ModalBody className='bg-white'>
              {productsCount > 0 ?
                <>
                  <p>Items in Basket</p>
                  {cart.items.map((item, index) => (
                    <CartProduct key={index} product={item} />
                  ))}
                  <div className='flex text-xl font-semibold justify-between mt-2'>
                    Total: <h1 className='mr-9'>£  {cart.getTotalCost().toFixed(2)}</h1>
                  </div>

                </>
                : <p>No items in cart</p>}
            </ModalBody>

            <ModalFooter>
              <Button onClick={checkout} className="bg-[#1B223C] text-white hover:bg-[#54B8D8] tracking-[.15em]" variant='success'>Purchase</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>

    </nav>
  );
};

export default Navbar;
