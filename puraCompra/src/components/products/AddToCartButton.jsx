import React, { useContext, useState } from 'react';
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { Button } from "flowbite-react";
import "flowbite";
import { GiShoppingCart } from "react-icons/gi";

const AddToCartButton = ({ id }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [ showSuccessToast, setShowSuccessToast ] = useState(false);
  const [ showErrorToast, setShowErrorToast ] = useState(false);

  const handleAddToCart = () => {
    try {
      if (user && user.UsersID) {
      const userId = user.UsersID
      const quantity = 1;
      console.log(userId, id, quantity)
      addToCart(userId, id, quantity);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      }
      else {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        color="gray"
        pill
        className="flex items-center justify-center w-full border border-gray-400 hover:border-blue-300 space-x-2 mt-4"
        onClick={handleAddToCart}
      >
        <GiShoppingCart className="text-lg mr-4" />
        <span>Add to Cart</span>
      </Button>
      {showSuccessToast && (
        <Toast className="fixed bottom-5 right-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Added to cart.
          </div>
          <Toast.Toggle />
        </Toast>
      )}
      {showErrorToast && (
        <Toast className="fixed bottom-5 right-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Not logged in.
          </div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};


export default AddToCartButton;
