import React from "react";
import BAC from "../../assets/payment/BAC.png";
import { TextInput, Checkbox } from "flowbite-react";

const CreditCardForm = ({ paymentInfo, handleChange }) => {
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
    if (value.length > 19) {
      value = value.slice(0, 19); // Ensure the length is no more than 19 characters (16 digits + 3 spaces)
    }
    handleChange({
      target: {
        name: 'cardNumber',
        value: value,
      },
    });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Ensure the length is no more than 3 digits
    }
    handleChange({
      target: {
        name: 'cvv',
        value: value,
      },
    });
  };

  const handleCardNameChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove all non-letter characters
    handleChange({
      target: {
        name: 'cardName',
        value: value,
      },
    });
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    handleChange({
      target: {
        name: 'expiryDate',
        value: value,
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[400px] h-[250px] rounded-[20px] p-[20px] flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center relative custom-credit-card-form"
        style={{ backgroundImage: `url(${BAC})` }}
      >
        <form className="w-full">
          <div className="flex justify-between mb-2">
            <div className="w-2/3 mr-2">
              <TextInput
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="xxxx xxxx xxxx xxxx"
                required={true}
                className="bg-transparent border-transparent text-lg font-bold ml-3"
                value={paymentInfo.cardNumber}
                onChange={handleCardNumberChange}
                style={{ backgroundColor: "transparent", color: "white" }}
              />
            </div>
            <div className="w-3/12 mr-6">
              <TextInput
                id="cvv"
                name="cvv"
                type="text"
                placeholder="CVV"
                required={true}
                className="bg-transparent border-transparent placeholder:text-lg font-bold"
                value={paymentInfo.cvv}
                onChange={handleCvvChange}
                style={{ backgroundColor: "transparent", color: "white" }}
              />
            </div>
          </div>
          <div className="flex justify-around absolute bottom-3 w-full">
            <div className="mb-2 w-5/12">
              <TextInput
                id="cardName"
                name="cardName"
                type="text"
                placeholder="Cardholder Name"
                required={true}
                value={paymentInfo.cardName}
                onChange={handleCardNameChange}
                className="bg-transparent border-transparent text-lg font-bold"
                style={{ backgroundColor: "transparent", color: "white" }}
              />
            </div>
            <div className="mr-20 w-3/12">
              <TextInput
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                required={true}
                value={paymentInfo.expiryDate}
                onChange={handleExpiryDateChange}
                className="bg-transparent border-transparent text-lg font-bold"
                style={{ backgroundColor: "transparent", color: "white" }}
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
