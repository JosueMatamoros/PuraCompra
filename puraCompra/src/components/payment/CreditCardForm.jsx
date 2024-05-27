import React from 'react';
import BAC from '../../assets/payment/BAC.png';
import { TextInput, Checkbox} from 'flowbite-react';

const CreditCardForm = () => {
  return (
    <div className='flex flex-col items-center'>
    
    <div
      className="w-[400px] h-[250px] rounded-[20px] p-[20px] flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center relative custom-credit-card-form"
      style={{ backgroundImage: `url(${BAC})` }}
    >
      <form className="w-full">
        <div className="flex justify-between mb-2">
          <div className="w-2/3 mr-2">
            <TextInput
              id="cardNumber"
              type="text"
              placeholder="xxxx xxxx xxxx xxxx"
              required={true}
              className="bg-transparent border-transparent text-lg font-bold ml-3"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
          <div className="w-3/12 mr-6">
            <TextInput
              id="cvv"
              type="text"
              placeholder="CVV"
              required={true}
              className="bg-transparent border-transparent placeholder:text-lg font-bold"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
        </div>
        <div className="flex justify-around absolute bottom-3 w-full">
          <div className="mb-2 w-5/12">
            <TextInput
              id="cardName"
              type="text"
              placeholder="Cardholder Name"
              required={true}
              className="bg-transparent border-transparent text-lg font-bold"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
          <div className="mr-20 w-3/12">
            <TextInput
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              required={true}
              className="bg-transparent border-transparent text-lg font-bold"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
        </div>
      </form>
      
    </div>
    <div className="flex items-center mt-4">
      <Checkbox id="saveCard" className="mr-2" />
      <label htmlFor="saveCard" className="text-sm text-gray-500">
      Remember credit card details 
      </label>
    </div>
    </div>
  );
};

export default CreditCardForm;
