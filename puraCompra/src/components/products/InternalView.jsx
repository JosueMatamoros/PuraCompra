import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import ProductsReview from './ProductsReview';
import AddToCartButton from './AddToCartButton';

export default function InternalView() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [additionalImages, setAdditionalImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');
  const [colors, setColors] = useState([]);
  const [promotion, setPromotion] = useState(null);

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
              setHoveredColor(images[0].colorName);
              const availableColors = images.filter(img => img.type).map(img => ({
                hex: img.color,
                name: img.colorName
              }));
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

    // Fetch promotion details
    axios.get(`http://localhost:3000/promotions/${id}`)
      .then(response => {
        const promotions = response.data;
        if (promotions.length > 0) {
          setPromotion(promotions[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching promotion details:', error);
      });
  }, [id]);

  const handleColorClick = (color) => {
    const selectedImage = additionalImages.find(img => img.color === color.hex);
    if (selectedImage) {
      setHoveredImage(`http://localhost:3000${selectedImage.imageUrl}`);
      setHoveredColor(selectedImage.colorName);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount);
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
              spaceBetween={10} // Espacio mínimo entre slides
            >
              {additionalImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="carousel-item p-2"
                    onMouseEnter={() => {
                      setHoveredImage(`http://localhost:3000${image.imageUrl}`);
                      setHoveredColor(image.colorName);
                    }}
                  >
                    <div className="w-full h-48 flex justify-center items-center" style={{ height: '200px', margin: '5px' }}>
                      <img
                        src={`http://localhost:3000${image.imageUrl}`}
                        alt={`Product ${index + 1}`}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="card p-4 bg-white mb-4">
              <div className="w-full h-96 md:w-120 md:h-120 overflow-hidden flex justify-center items-center">
                <img
                  src={hoveredImage}
                  alt="Hovered Product"
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          </div>

          <div className="w-1/4 flex flex-col items-start justify-center p-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg mb-2">{product.description}</p>
            {promotion ? (
              <div className='flex justify-between w-full'>
                <div className='flex'>
                  <p className="text-xl font-bold text-stone-800 mb-2 line-through">${product.price?.toFixed(2)}</p>
                  <p className="text-lg font-bold text-red-500 mb-2 ml-2">{(promotion.discount * 100).toFixed(0)}%</p>
                </div>
                <p className="text-xl font-bold text-green-600 mb-2">
                  ${calculateDiscountedPrice(product.price, promotion.discount).toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-stone-800 mb-2">${product.price?.toFixed(2)}</p>
            )}
            <div className="flex justify-between w-full">
              {colors.length > 0 && (
                <p className="text-lg mb-2">
                  <span className="text-stone-800 font-bold">Color:</span> {hoveredColor || colors[0].name}
                </p>
              )}
              <p className="text-lg mb-2">
                <span className="text-stone-800 font-bold">Stock:</span> {product.stock}
              </p>
            </div>

            {colors.length > 0 && (
              <div className="flex space-x-4 mt-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer border ${color.name === hoveredColor ? 'border-gray-800' : 'border-black'}`}
                    style={{ backgroundColor: color.hex}}
                    onClick={() => handleColorClick(color)}
                  ></div>
                ))}
              </div>
            )}
            <AddToCartButton
              id={id}
            />
          </div>
        </div>
      </div>
      <ProductsReview />
    </>
  );
}
