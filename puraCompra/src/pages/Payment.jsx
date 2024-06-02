import React, { useContext, useEffect, useState } from 'react';
import PaymentSteps from '../components/payment/PaymentSteps';
import { HiArrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Payment() {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user && user.UsersID) {
      fetchCartItems(user.UsersID);
    }
  }, [fetchCartItems, user]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      setTotal(totalAmount.toFixed(2));
    };

    if (cartItems.length > 0) {
      calculateTotal();
    }
  }, [cartItems]);

  return (
    <div className='flex h-screen'>
      <div className='bg-stone-100 w-1/4 p-6'>
        <Link to='/cart'>
          <HiArrowLeft className='text-2xl mb-4 text-slate-950' />
        </Link>
        <div className='mt-10 space-y-6'>
          <h1 className='font-medium text-gray-500'>Total</h1>
          <span className='font-bold text-3xl'>${total}</span>
          
          {cartItems.map((item) => (
            <div className='flex justify-between w-full' key={item.CartItemID}>
              <div>
                <h2 className='font-medium text-gray-500'>{item.product.name}</h2>
                <p className='text-sm text-gray-400'>Quantity: {item.quantity}</p>
              </div>
              <span className='font-bold text-xl'>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <PaymentSteps />
    </div>
  );
}
