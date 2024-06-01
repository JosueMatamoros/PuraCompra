import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/${userId}`);
      console.log('Response from fetching cart items:', response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await axios.post('http://localhost:3000/cart/add', { userId, productId, quantity });
      console.log('Response from adding to cart:', response.data);
      fetchCartItems(userId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (userId, productId) => {
    try {
      await axios.delete('http://localhost:3000/cart/remove', { data: { userId, productId } });
      fetchCartItems(userId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
