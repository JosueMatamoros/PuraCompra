import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHeart } from "react-icons/io";
import Navbar from './Navbar';
import logo from '../../assets/JieShopLogo.png'; 

export default function Header() {
  return (
    <header className='flex justify-between items-center mx-4 py-2'>
        <div className='flex items-center gap-2'>
            <Link to='/'>
                <img src={logo} alt="JieShop Logo" className="h-14" />
            </Link>
            <h1 className='text-2xl font-bold'>Pura Compra</h1>
        </div>

        <Navbar />

        <div className='flex gap-4 pt-2'>
        <IoMdHeart className='text-2xl' />
        <TiShoppingCart className='text-2xl' />
        </div>
    </header>
  );
}
