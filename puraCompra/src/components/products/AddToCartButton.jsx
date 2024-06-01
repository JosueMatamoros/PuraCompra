import React, { useContext } from 'react';
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import "flowbite";
import { GiShoppingCart } from "react-icons/gi";

const AddToCartButton = ({ id }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    try {
      if (user && user.UsersID) {
      const userId = user.UsersID
      const quantity = 1;
      console.log(userId, id, quantity)
      addToCart(userId, id, quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      color="gray"
      pill
      className="flex items-center justify-center w-full border border-gray-400 hover:border-blue-300 space-x-2 mt-4"
      onClick={handleAddToCart}
    >
      <GiShoppingCart className="text-lg mr-4" />
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartButton;
