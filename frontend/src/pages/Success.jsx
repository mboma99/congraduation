import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Success() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [photoObjects, setPhotoObjects] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsData = localStorage.getItem('Products');
        if (productsData) {
          const parsedProducts = JSON.parse(productsData);
          setProducts(parsedProducts);

          const photoObjectsPromises = parsedProducts.map(async (product) => {
            const response = await axios.get(`http://localhost:8000/photo/specific_photo/${product.id}`);
            return response.data;
          });

          const resolvedPhotoObjects = await Promise.all(photoObjectsPromises);
          setPhotoObjects(resolvedPhotoObjects);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchProductData();
  }, []);

  const handleDownload = (imageUrl) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    // Set the download attribute to force download
    link.setAttribute('download', '');
    // Append the anchor to the body
    document.body.appendChild(link);
    // Trigger a click on the anchor
    link.click();
    // Remove the anchor from the body
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col mt-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order</h1>
      <p className="text-xl mb-4 ">Please find below images, which you have purchased, ready for download.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {error && <p>Error: {error.message}</p>}
        {photoObjects.map((photo) => (
          <div key={photo.id} className=''>
            
            <button onClick={() => handleDownload(photo.image_url)}><img className='rounded-2xl' src={photo.image_url} alt={`Photo ${photo.id}`} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Success;
