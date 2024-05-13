import React from 'react'
import Image from '../../assets/Deliver.svg'

export default function BorderlessCard({ image, title, description}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 mt-10 m-1">
        <a href="#" className='flex justify-center items-center'>
            <img className="object-contain sm:w-20 md:w-28" src={image} alt="BenefitImage" />
        </a>
        <div className="px-5">
            <a href="#">
              <h1 className='text-xl font-bold '>{title}</h1>
                <p className="text-sm font-normal tracking-tight text-gray-900 dark:text-white">{description}</p>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              
            </div>
          
        </div>
    </div>
  )
}
