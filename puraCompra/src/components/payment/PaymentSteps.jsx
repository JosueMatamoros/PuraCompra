import React, { useState, useEffect, useContext } from "react";
import { Button, Toast } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiCheck, HiFire, HiExclamation } from "react-icons/hi";
import axios from "axios"; // Asegúrate de importar axios
import ShippingAddresses from "./ShippingAddresses";
import PaymentDetails from "./PaymentDetails";
import ReviewOrder from "./ReviewOrder";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const steps = [
  {
    title: "Shipping address",
    content: "Enter your shipping address details here.",
  },
  { title: "Payment details", content: "Enter your payment details here." },
  {
    title: "Review your order",
    content: "Review your order before placing it.",
  },
];

export default function PaymentSteps() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    lastName: "",
    address: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
  });

  const calculateTaxes = (price) => {
    // Calcula los impuestos como el 10% del precio total
    return price * 0.1;
  };

  const calculatePrice = () => {
    // Calcula el precio total de los artículos en el carrito
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

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

  const isPaymentInfoComplete = () => {
    const { cardNumber, cardName, expiryDate, cvv, bankAccountNumber, bankRoutingNumber } = paymentInfo;
    return (cardNumber && cardName && expiryDate && cvv) || (bankAccountNumber && bankRoutingNumber);
  };

  const handlePlaceOrder = async () => {
    if (!isPaymentInfoComplete()) {
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
      return;
    }

    const price = calculatePrice();
    const taxes = calculateTaxes(price);
    const date = new Date().toISOString();

    const orderData = {
      UsersID: user.UsersID,
      address: shippingInfo.address,
      date: date,
      price: price,
      taxes: taxes,
      cartItems: cartItems.map((item) => ({
        productID: item.product.ProductsID,
      })),
    };
    console.log("Order Date:", orderData);

    try {
      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData
      );
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        clearCart(user.UsersID);
        navigate('/account');
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    console.log("Current Step:", currentStep);
    console.log("Shipping Info:", shippingInfo);
    console.log("Payment Info:", paymentInfo);
  }, [currentStep, shippingInfo, paymentInfo]);

  return (
    <div className='h-screen w-full flex flex-col items-center justify-between p-6 bg-gray-50'>
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Order Completed!</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}

      {showErrorToast && (
        <div className="fixed bottom-4 right-4">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Please fill all the information</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}

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

      <div className='w-full flex flex-col items-center justify-center mt-12'>
        {currentStep === 0 && <ShippingAddresses shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />}
        {currentStep === 1 && <PaymentDetails paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />}
        {currentStep === 2 && <ReviewOrder cartItems={cartItems} shippingInfo={shippingInfo} paymentInfo={paymentInfo} />}
      </div>

      <div className='mt-4 mb-20 flex justify-between w-full max-w-md space-x-4'>
        <Button className='bg-blue-600 ' onClick={handlePrev} disabled={currentStep === 0} >
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext} className='bg-blue-600 ' >
            Next
          </Button>
        ) : (
          <Button onClick={handlePlaceOrder} className='bg-green-600'>
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
}
