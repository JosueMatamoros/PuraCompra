import React from 'react'
import Logo from '../assets/JieShopLogoWhite.png'


export default function Home() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-grow">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8">
          <div className="text-center text-white">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold">Buy everything you want with PuraCompra</p>
            <p className="text-lg md:text-xl">The simpliest way to get your things</p>
          </div>
        </div>

        <div className="w-full md:w-1/2  flex justify-center items-center">
          <img src={Logo} alt="Imagen decorativa" className="w-full max-w-full h-auto  object-contain md:object-cover" />
        </div>
      </div>

      <div className="flex-grow bg-white text-center p-4">
        <p className="text-black">Welcome to PuraCompra</p>
      </div>
    </div>

    </>
  )
}
