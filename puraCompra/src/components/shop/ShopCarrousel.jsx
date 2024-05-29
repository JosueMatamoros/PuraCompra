import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";

import BestBuy from "../../assets/shopIcons/BestBuy.png";
import Walmart from "../../assets/shopIcons/Walmart.png";
import MicroCenter from "../../assets/shopIcons/MicroCenter.png";
import Gymshark from "../../assets/shopIcons/Gymshark.png";

const products = [
  {
    id: 1,
    imageUrl: BestBuy,
  },
  {
    id: 2,
    imageUrl: Walmart,
  },
  {
    id: 3,
    imageUrl: MicroCenter,
  },
  {
    id: 4,
    imageUrl: Gymshark,
  },
];

export default function ShopCarrousel() {
  return (
    <div className="relative horizontal-swiper">
      <Swiper
        direction="horizontal"
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="carousel-item border p-4 rounded shadow cursor-pointer">
              <div className="w-full h-48 mb-4 overflow-hidden flex justify-center items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-contain h-full w-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
