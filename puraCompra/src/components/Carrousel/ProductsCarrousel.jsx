import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const ProductsCarrousel = ({ products, carrouselId }) => {
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const productUrls = {
    1: 'https://www.bestbuy.com',
    2: '/product/2',
    3: '/product/3',
  };
  
  return (
    <div className="relative horizontal-swiper">
      <Swiper
        direction="horizontal"
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: `.swiper-button-next-${carrouselId}`,
          prevEl: `.swiper-button-prev-${carrouselId}`,
        }}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.ProductsID}>
            <div 
              className="carousel-item border p-4 rounded shadow cursor-pointer"
              onClick={() => handleCardClick(product.ProductsID)}
            >
              <div className="w-full h-48 mb-4 overflow-hidden flex justify-center items-center">
                <img 
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name} 
                  className="object-contain max-h-full"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className={`swiper-button-prev swiper-button-prev-${carrouselId} absolute left-0 top-1/2 transform -translate-y-1/2 z-10`}></div>
      <div className={`swiper-button-next swiper-button-next-${carrouselId} absolute right-0 top-1/2 transform -translate-y-1/2 z-10`}></div>
    </div>
  );
};

export default ProductsCarrousel;
