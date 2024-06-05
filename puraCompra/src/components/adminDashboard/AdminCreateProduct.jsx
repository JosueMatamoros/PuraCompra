import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FileInput, Label, Dropdown, Button, Toast } from 'flowbite-react';
import ImagenNoDisponible from '../../../public/ImagenNoDisponible.png';
import { useNavigate } from 'react-router-dom';
import { HiCheck } from 'react-icons/hi';

export default function AdminCreateProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    seller: '',
    price: '',
    stock: '',
    mainImage: ImagenNoDisponible,
    images: [ImagenNoDisponible, ImagenNoDisponible, ImagenNoDisponible],
  });

  const navigate = useNavigate();

  const [sellers, setSellers] = useState({});
  const [selectedSeller, setSelectedSeller] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:3000/sellers');
      const data = await response.json();
      const sellersDict = data.reduce((acc, seller) => {
        if (seller.name !== 'Amazon') {
          acc[seller.SellersID] = seller.name;
        }
        return acc;
      }, {});
      setSellers(sellersDict);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductData((prevData) => {
        const newImages = [...prevData.images];
        const firstPlaceholderIndex = newImages.findIndex(img => img === ImagenNoDisponible);
        if (firstPlaceholderIndex !== -1) {
          newImages[firstPlaceholderIndex] = file;
        } else {
          newImages.push(file);
        }
        return {
          ...prevData,
          images: newImages,
          mainImage: prevData.mainImage === ImagenNoDisponible ? file : prevData.mainImage,
        };
      });
    }
  };

  const handleSellerSelect = (sellerId) => {
    setSelectedSeller(sellerId);
    setProductData((prevData) => ({
      ...prevData,
      seller: sellerId,
    }));
  };

  const createProduct = async () => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('seller', productData.seller);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);

    if (productData.images[0] !== ImagenNoDisponible) {
      formData.append('mainImage', productData.images[0]);
    }

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const product = await response.json();
        console.log('Product created successfully');
        await uploadAdditionalImages(product.ProductsID);
        setShowToast(true);
        setTimeout(() => {setShowToast(false); navigate('/products')}, 3000);
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const uploadAdditionalImages = async (productId) => {
    const additionalImages = productData.images.slice(1).filter(image => image !== ImagenNoDisponible);

    for (const image of additionalImages) {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('imageUrl', image);
      formData.append('type', 0);
      formData.append('color', null);
      formData.append('colorName', null);

      try {
        const response = await fetch('http://localhost:3000/productImages', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          console.log('Additional image uploaded successfully');
        } else {
          console.error('Failed to upload additional image');
        }
      } catch (error) {
        console.error('Error uploading additional image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {showToast && (
        <div className="fixed bottom-4 right-4 transform transition-transform duration-300 ease-in-out">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">The product was added successfully!</div>
          <Toast.Toggle />
        </Toast>
      </div>
      )}
      <div className="flex justify-center items-center m-4 w-1/2">
        <div className="mr-8 flex-1">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
        <div className='flex-1'>
          <label className="text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      <div className="flex justify-around w-1/2 ">
        <div className="flex-1 mr-8">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Seller:
          </label>
          <Dropdown
            label={selectedSeller ? sellers[selectedSeller] : "Select a seller"}
            color="gray"
          >
            {Object.entries(sellers).map(([id, name]) => (
              <Dropdown.Item key={id} onClick={() => handleSellerSelect(id)}>
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className="flex-1 flex">
          <div className="mr-4 w-1/2">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Price:
            </label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight border-transparent focus:border-transparent focus:ring-0"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-bold">
              Stock:
            </label>
            <input
              type="text"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight border-transparent focus:border-transparent focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex-shrink-0 w-1/4">
          <Swiper
            direction="vertical"
            slidesPerView={3}
            className="h-full vertical-swiper"
            spaceBetween={10}
          >
            {productData.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="carousel-item p-2">
                  <div
                    className="w-full h-48 flex justify-center items-center"
                    style={{ height: '200px', margin: '5px' }}
                  >
                    {image instanceof File ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="object-contain w-full h-full"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center flex-shrink-0">
          <Label
            htmlFor="dropzone-file"
            className="flex w-full h-5/6 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
        </div>
        <div className="w-1/4 flex flex-col items-start justify-center p-4 flex-shrink-0">
          <h2 className="text-2xl font-semibold">{productData.name}</h2>
          <p className="text-lg mb-2">{productData.description}</p>
          {productData.price !== '' && (
            <p className="text-lg mb-2 font-bold">${productData.price}</p>
          )}
          {productData.stock !== '' && (
            <p className="text-lg mb-2">
              <span className="font-bold">Stock:</span> {productData.stock}
            </p>
          )}
        </div>
      </div>
      <Button pill color="success" onClick={createProduct}>Create Product</Button>
    </div>
  );
}
