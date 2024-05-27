import React from 'react';
import PaymentSteps from '../components/payment/PaymentSteps';
import { HiArrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function Payment() {
  return (
    <div className='flex h-screen'> 
      <div className='bg-stone-100 w-1/4 p-6'>
        <Link to='/'>
          <HiArrowLeft className='text-2xl mb-4 text-slate-950' />
        </Link>
        <div className='mt-10 space-y-6'>
          
          <h1 className='font-medium text-gray-500'>Total</h1>
          <a className='font-bold text-3xl'>$134.98</a>
       
          <div className='flex justify-between w-full'>
            <div>
              <h2 className='font-medium text-gray-500'>Professional plan</h2>
              <p className='text-sm text-gray-400'>Monthly subscription</p>
            </div>
            <span className='font-bold text-xl'>$15.00</span>
          </div>
          <div className='flex justify-between w-full'>
            <div>
              <h2 className='font-medium text-gray-500'>Dedicated support</h2>
              <p className='text-sm text-gray-400'>Included in the Professional plan</p>
            </div>
            <span className='font-bold text-xl'>Free</span>
          </div>
          <div className='flex justify-between w-full'>
            <div>
              <h2 className='font-medium text-gray-500'>Hardware</h2>
              <p className='text-sm text-gray-400'>Devices needed for development</p>
            </div>
            <span className='font-bold text-xl'>$69.99</span>
          </div>
          <div className='flex justify-between w-full'>
            <div>
              <h2 className='font-medium text-gray-500'>Landing page template</h2>
              <p className='text-sm text-gray-400'>License</p>
            </div>
            <span className='font-bold text-xl'>$49.99</span>
          </div>
        </div>
      </div>
      
        <PaymentSteps />
        

      
      
    </div>
  );
}
