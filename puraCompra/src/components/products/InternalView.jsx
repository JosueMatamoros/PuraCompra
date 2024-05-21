import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import ProductsReview from './ProductsReview';

export default function InternalView() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [additionalImages, setAdditionalImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);

        // Fetch product images
        axios.get(`http://localhost:3000/productImages/${id}`)
          .then(response => {
            const images = response.data;
            if (images.length > 0) {
              setHoveredImage(`http://localhost:3000${productData.imageUrl}`);
              setHoveredColor(images[0].color);
              const availableColors = images.filter(img => img.type).map(img => img.color);
              setColors(availableColors);
            }
            setAdditionalImages(images);
          })
          .catch(error => {
            console.error('Error fetching images:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleColorClick = (color) => {
    const selectedImage = additionalImages.find(img => img.color === color);
    if (selectedImage) {
      setHoveredImage(`http://localhost:3000${selectedImage.imageUrl}`);
      setHoveredColor(color);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/4">
            <Swiper
              direction="vertical"
              slidesPerView={3}
              mousewheel={true}
              className="h-full vertical-swiper"
              spaceBetween={10}
            >
              {additionalImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="carousel-item p-2"
                    onMouseEnter={() => {
                      setHoveredImage(`http://localhost:3000${image.imageUrl}`);
                      setHoveredColor(image.color);
                    }}
                  >
                    <div className="w-full h-full overflow-hidden flex justify-center items-center">
                      <img
                        src={`http://localhost:3000${image.imageUrl}`}
                        alt={`Product ${index + 1}`}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="card border p-4 rounded shadow bg-white mb-4">
              <div className="w-96 h-96 overflow-hidden flex justify-center items-center">
                <img
                  src={hoveredImage}
                  alt="Hovered Product"
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer border ${color === hoveredColor ? 'border-gray-800' : 'border-black'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => handleColorClick(color)}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/4 flex flex-col items-start justify-center p-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg mb-2">{product.description}</p>
            <p className="text-xl font-bold text-red-600 mb-2">${product.price?.toFixed(2)}</p>
            <p className="text-lg mb-2">Stock: {product.stock}</p>
            <p className="text-lg">Seller: {product.Seller?.name}</p>
          </div>
        </div>
      </div>
      <ProductsReview productId={id} />
    </>
  );
}
