import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const ProductsCarrousel = ({ products, carrouselId }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    const updateNavigation = () => {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    };

    if (swiperInstance) {
      swiperInstance.on('slideChange', updateNavigation);
      swiperInstance.on('reachEnd', updateNavigation);
      swiperInstance.on('reachBeginning', updateNavigation);

      // Initial update
      updateNavigation();
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', updateNavigation);
        swiperInstance.off('reachEnd', updateNavigation);
        swiperInstance.off('reachBeginning', updateNavigation);
      }
    };
  }, []);

  return (
    <div className="relative horizontal-swiper">
      <Swiper
        ref={swiperRef}
        direction="horizontal"
        spaceBetween={16}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
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
      <div 
        className={`swiper-button-prev swiper-button-prev-${carrouselId} absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${isBeginning ? 'hidden' : 'block'}`}
      ></div>
      <div 
        className={`swiper-button-next swiper-button-next-${carrouselId} absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${isEnd ? 'hidden' : 'block'}`}
      ></div>
    </div>
  );
};

export default ProductsCarrousel;
