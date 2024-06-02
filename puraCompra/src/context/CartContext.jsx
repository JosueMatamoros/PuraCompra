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

  const removeCartItem = async (userId, productId) => {
    try {
      await axios.delete('http://localhost:3000/cart/remove', { data: { userId, productId } });
      setCartItems((prevItems) => prevItems.filter((item) => item.ProductID !== productId));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const clearCart = async (userId) => {
    try {
      await axios.post('http://localhost:3000/cart/clear', { userId });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  

  const updateCartItemQuantity = async (userId, productId, quantity) => {
    try {
      await axios.put('http://localhost:3000/cart/update', { userId, productId, quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.ProductID === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, updateCartItemQuantity, removeCartItem, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
