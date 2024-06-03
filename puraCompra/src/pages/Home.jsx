import React from 'react';
import Logo from '../assets/JieShopLogoWhite.png';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-black">
        <div className="flex flex-grow">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8">
            <div className="text-center text-white">
              <p className="text-2xl md:text-2xl lg:text-5xl font-bold">Buy everything you want with PuraCompra</p>
              <p className="text-lg md:text-4xl">The simpliest way to get your things</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src={Logo} alt="Imagen decorativa" className="w-full max-w-full h-auto object-contain md:object-cover" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
