import React, { useState, useEffect, useContext } from 'react';
import { Image, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, ChakraProvider } from '@chakra-ui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import SadCat from '../components/assets/sad_cat.jpeg';


export const Shop = () => {
  const { search_key } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const cart = useContext(CartContext);
  const [noPhotosFound, setNoPhotosFound] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const searchType = () => {
    if (search_key && search_key.includes('@')) {
      searchByEmail(search_key);
    } else if (search_key) {
      searchByUUID(search_key);
    } else {
      console.error('Search key is undefined');
    }
  };

  const searchByEmail = (email) => {
    axios.get(`http://localhost:8000/photo/photos_by_customer_email/${email}`)
      .then((response) => {
        setPortfolio(response.data);
        setAllPhotos(prevPhotos => {
          const updatedPhotos = prevPhotos.slice(); // Create a shallow copy of the existing array
          response.data.photos.forEach(newPhoto => {
            if (!updatedPhotos.some(photo => photo.id === newPhoto.id)) {
              updatedPhotos.push(newPhoto); // Add new photo if it doesn't already exist
            }
          });
          return updatedPhotos;
        });
        localStorage.setItem('Products', JSON.stringify(response.data.photos));
      })
      .catch((error) => {
        //console.error('Error fetching photos by email:', error);
      });
  };

  const searchByUUID = (portfolio_id) => {
    axios.get(`http://localhost:8000/photo/all_photos/${portfolio_id}`)
      .then((response) => {
        setPortfolio(response.data);
        setAllPhotos(prevPhotos => {
          const updatedPhotos = prevPhotos.slice(); // Create a shallow copy of the existing array
          response.data.photos.forEach(newPhoto => {
            if (!updatedPhotos.some(photo => photo.id === newPhoto.id)) {
              updatedPhotos.push(newPhoto); // Add new photo if it doesn't already exist
            }
          });
          return updatedPhotos;
        });
        localStorage.setItem('Products', JSON.stringify(response.data.photos));
      })
      .catch((error) => {
        //console.error('Error fetching photos by UUID:', error);
      });
  };

  useEffect(() => {
    searchType();
  }, []);

  useEffect(() => {
    if (allPhotos.length > 0) {
      const quantities = {};
      allPhotos.forEach(photo => {
        quantities[photo.id] = cart.getProductQuantity(photo.id);
      });
      setProductQuantities(quantities);
    } else {
      setNoPhotosFound(true);
    }
  }, [allPhotos, cart]);

  return (
    <div className='flex flex-col justify-start min-h-screen items-center relative pt-3 md:pt-10 text-white'>
      {portfolio && (
        <h1 className='self-start uppercase font-light text-xl text-white tracking-[.1em] mb-3'>check out <span className='font-bold'>{portfolio.customer_first_name}'s </span> graduation photos</h1>
      )}
      {allPhotos.length > 0 ? (
        <>
          <hr className="my-2 border-t-1 border-b-1 border-white w-full mb-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.isArray(allPhotos) && allPhotos.map((photo, index) => (
              <div key={index} className="relative group overflow-hidden">
                <div style={{ position: 'relative' }}>
                  <Image
                    borderRadius={15}
                    src={photo.image_url}
                    fallback=''
                    objectFit="cover"
                    className="transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center opacity-40 justify-center transform -rotate-45">
                    <span className="text-white text-5xl">CONGRADUATION</span>
                  </div>
                </div>
                <div className="absolute space-x-3 inset-0  opacity-0 transition-opacity z-10 duration-300 group-hover:opacity-100 rounded-md flex items-center justify-center">
                  <div className="absolute bottom-2">
                    <button onClick={() => setSelectedPhoto(photo)} className="mr-4 px-4 py-2 bg-[#313131] hover:bg-white hover:text-black rounded-md" >View Photo</button>
                  </div>
                  {productQuantities[photo.id] > 0 ?
                    <div className="absolute top-2 right-2 bg-white text-black p-3">

                      <button onClick={() => cart.addOneToCart(photo.id)} className='text-xl'>+</button>
                      <span className=" rounded-full px-2 py-1">{productQuantities[photo.id]}</span>
                      <button onClick={() => cart.removeOneFromCart(photo.id)} className='text-2xl'>-</button>
                    </div>
                    :
                    <div className="absolute top-2 right-2">
                      <button onClick={() => cart.addOneToCart(photo.id)} className='mr-4 px-4 py-2 bg-[#364c78] hover:bg-customDullBlue text-white rounded-md'><ShoppingCartIcon className='w-6' /></button>
                    </div>
                  }

                </div>
              </div>
            ))}
            <Divider />
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center '>
          <img src={SadCat} alt="Graduate" className=' w-96 rounded-xl' />
          <p className=' text-9xl font-bold tracking-[.2em] '>404</p>
          <p className="text-white text-2xl text-center">Oh no! We couldn't <br />find any photos for {search_key}</p>
          <Link to="/" ><button type="submit" className="mt-4 mb-10 w-48 border h-16 py-3 px-4 uppercase font-normal bg-transparent transition duration-300 hover:bg-customDullBlue text-white rounded-full">go home</button></Link>

        </div>
      )}
      {selectedPhoto && (
        <ChakraProvider >
          <Modal isOpen={true} onClose={() => setSelectedPhoto(null)} >
            <ModalOverlay />
            <ModalContent className='font-outfit rounded-2xl' >
              <ModalHeader className='text-center' >ID: {selectedPhoto.id}</ModalHeader>
              <ModalCloseButton />
              <ModalBody className='' >
              <div style={{ position: 'relative' }}>
                  <Image
                    borderRadius={15}
                    src={selectedPhoto.image_url}
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center opacity-40 justify-center transform rotate-45">
                    <span className="text-white text-5xl">CONGRADUATION</span>
                  </div>
                  
                </div>
                <div className='text-xl font-semibold text-center'>
                    Price: {selectedPhoto.price}
                  </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      )}
    </div>
  );
};

export default Shop;
