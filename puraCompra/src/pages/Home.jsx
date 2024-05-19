import React from 'react'
import Logo from '../assets/JieShopLogoWhite.png'
import Header from '../components/header/Header'
import BorderlessCard from '../components/borderlessCard/BorderlessCard'

const cards = [
  {
    image: "/src/assets/Deliver.svg",
    title: "Seguridad y Confiabilidad",
    description: "Tenemos la mayor frecuencia de vuelos de la región."
  },
  {
    image: "src/assets/Return.svg",
    title: "Pagos seguros",
    description: "Utilizamos la última tecnología para garantizar un ambiente de pagos seguro."
  },
  {
    image: "src/assets/Security.svg",
    title: "Devoluciones fáciles",
    description: "Si no estás satisfecho con tu compra, te facilitamos la devolución, sin costo adicional."
  },
  {
    image: "src/assets/Taxes.svg",
    title: "Ahorra en impuestos",
    description: "Ahorra el 7% de impuesto de ventas en Estados Unidos al usar tu dirección de Aeropost."
  }
];


export default function Home() {
  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-grow ">
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

      <div className="flex flex-grow bg-white text-center p-4">
        <p className="text-black text-xl font-bold">Beneficios</p>
        <div className="flex flex-row">
          {cards.map((card, index) => (
            <BorderlessCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            />
          ))
          }
        </div>
      </div>
    </div>

    </>
  )
}
