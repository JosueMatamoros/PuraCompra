import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductsCarrousel = ({ products, carrouselId }) => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: `.swiper-button-next-${carrouselId}`,
          prevEl: `.swiper-button-prev-${carrouselId}`,
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
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
            <div className="carousel-item border p-4 rounded shadow">
              <div className="w-full h-48 mb-4 overflow-hidden flex justify-center items-center">
                <img 
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name} 
                  className="object-contain max-h-full"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className={`swiper-button-prev swiper-button-prev-${carrouselId} `}>
        
      </div>
      <div className={`swiper-button-next swiper-button-next-${carrouselId}`}>
      </div>
    </div>
  );
};

export default ProductsCarrousel;
