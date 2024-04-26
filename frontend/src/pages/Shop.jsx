import React, { useState, useEffect } from 'react';
import { SimpleGrid, Image, Divider } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Shop = () => {
  const { search_key } = useParams();
  const [allPhotos, setAllPhotos] = useState([]);

  const searchType = () => {
    if (search_key && search_key.includes('@')) {
      searchByEmail(search_key);
    } else if (search_key) {
      searchByUUID(search_key);
    } else {
      // Handle the case where search_key is undefined
      console.error('Search key is undefined');
    }
  };
  

  // Function to search by email
  const searchByEmail = (email) => {
    axios.get(`http://localhost:8000/photo/photos_by_customer_email/${email}`)
      .then((response) => {
        console.log(response);
        setAllPhotos(response.data.photos);
      })
      .catch((error) => {
        console.error('Error fetching photos by email:', error);
      });
    console.log('Searching by email:', email);
  };

  // Function to search by UUID
  const searchByUUID = (portfolio_id) => {
    axios.get(`http://localhost:8000/photo/all_photos/${portfolio_id}`)
      .then((response) => {
        console.log(response);
        setAllPhotos(response.data.photos);
      })
      .catch((error) => {
        console.error('Error fetching photos by UUID:', error);
      });
    console.log('Searching by UUID:', portfolio_id);
  };

  // Call searchType() when the component is rendered
  useEffect(() => {
    searchType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SimpleGrid columns={4} spacing={10}>
        {Array.isArray(allPhotos) && allPhotos.map((photo, index) => (
          <div key={index} className="relative group overflow-hidden">
            <Image
              borderRadius={25}
              boxSize={350}
              src={photo.image_url}
              fallback=''
              objectFit="cover"
              className="transition-opacity duration-300"
            />
            <div className="absolute space-x-3 inset-0 bg-gray-500 opacity-10 transition-opacity duration-300 group-hover:opacity-95 rounded-md flex items-center justify-center">
              <button>ADD to cart</button>
            </div>
          </div>
        ))}
        <Divider />
      </SimpleGrid>
    </div>
  );
  
};

export default Shop;

