import React from 'react';
import { Button } from 'flowbite-react';
import 'flowbite';
import { GiShoppingCart } from 'react-icons/gi';

const AddToCartButton = () => {
  return (
    <Button
      color="gray"
      pill
      className="flex items-center justify-center w-full border border-gray-400 hover:border-blue-300 space-x-2 mt-4" 
    >
      <GiShoppingCart className="text-lg mr-4" />
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartButton;
