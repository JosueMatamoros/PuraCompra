import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';

export default function InternalView({ productId }) {
  const [additionalImages, setAdditionalImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState('');
  const [hoveredColor, setHoveredColor] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/productImages/${productId}`)
      .then(response => {
        const images = response.data;
        if (images.length > 0) {
          setHoveredImage(`http://localhost:3000${images[0].imageUrl}`);
          setHoveredColor(images[0].color);
        }
        setAdditionalImages(images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, [productId]);

  return (
    <div className="flex">
      <div className="relative w-1/3">
        <Swiper
          direction="vertical"
          spaceBetween={16}
          slidesPerView={3}
          mousewheel={true}
          className="h-full"
        >
          {additionalImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="carousel-item border p-2 rounded shadow cursor-pointer bg-white"
                onMouseEnter={() => {
                  setHoveredImage(`http://localhost:3000${image.imageUrl}`);
                  setHoveredColor(image.color);
                }}
              >
                <div className="w-full h-32 overflow-hidden flex justify-center items-center">
                  <img 
                    src={`http://localhost:3000${image.imageUrl}`}
                    alt={`Product ${index + 1}`} 
                    className="object-contain max-h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-2/3 flex justify-center items-center">
        <div className="card border p-4 rounded shadow bg-white">
          <div className="w-64 h-64 overflow-hidden flex justify-center items-center">
            <img 
              src={hoveredImage} 
              alt="Hovered Product" 
              className="object-contain max-h-full"
            />
          </div>
          {hoveredColor && (
            <p className="text-center mt-2">{hoveredColor}</p>
          )}
        </div>
      </div>
    </div>
  );
}
