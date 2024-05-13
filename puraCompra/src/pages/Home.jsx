import React from 'react'
import Logo from '../assets/JieShopLogoWhite.png'
import Header from '../components/header/Header'
import Carrousel from '../components/Carrousel'


export default function Home() {
  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-grow">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8">
          <div className="text-center text-white">
            <p className="text-2xl md:text-2xl lg:text-5xl font-bold">Buy everything you want with PuraCompra</p>
            <p className="text-lg md:text-4xl">The simpliest way to get your things</p>
          </div>
        </div>

        <div className="w-full md:w-1/2  flex justify-center items-center">
          <img src={Logo} alt="Imagen decorativa" className="w-full max-w-full h-auto  object-contain md:object-cover" />
        </div>
      </div>

      <div className="flex-grow bg-white text-center p-4">
        <p className="text-black text-xl font-bold">Welcome to PuraCompra</p>
      </div>
    </div>

    <Carrousel />

    </>
  )
}
