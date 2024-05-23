import React, { useState } from 'react';
import { Button } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import PaymentDetails from './PaymentDetails';

const steps = [
  { title: 'Shipping address', content: 'Enter your shipping address details here.' },
  { title: 'Payment details', content: 'Enter your payment details here.' },
  { title: 'Review your order', content: 'Review your order before placing it.' },
];

export default function PaymentSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Lógica para realizar el pedido
    console.log("Order placed");
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-between p-6 bg-gray-50'>
      <div className='flex items-center justify-center'>
        {steps.map((step, index) => (
          <div key={index} className='flex items-center mt-20'>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-white ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}>
              {index < currentStep ? <HiCheck /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className='flex-auto border-t-2 ' style={{ borderColor: index < currentStep ? 'blue' : 'gray' }} />
            )}
            <div className='text-center ml-4 mr-12'>
              <span className={`text-sm ${index <= currentStep ? 'text-blue-500' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='w-full'>
        {currentStep === 1 ? (
          <PaymentDetails/>
        ) : (
          <div className='text-center'>
            <p>{steps[currentStep].content}</p>
          </div>
        )}
      </div>

      <div className='mb-20 flex justify-between w-full max-w-md space-x-4'>
        <Button onClick={handlePrev} disabled={currentStep === 0} className='bg-teal-600 hover:bg-teal-700'>
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext} className='bg-blue-600 hover:bg-blue-700'>
            Next
          </Button>
        ) : (
          <Button onClick={handlePlaceOrder} className='bg-green-600 hover:bg-green-700'>
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
}
