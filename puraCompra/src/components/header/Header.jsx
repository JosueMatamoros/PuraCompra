import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import Navbar from './Navbar';
import logo from '../../assets/JieShopLogo.png'; 
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Header() {
  return (
    <header className='flex justify-between items-center mx-4 py-2'> 
        <div className='flex items-center gap-2'>
            <Link to='/'>
                <img src={logo} alt="JieShop Logo" className="h-14" />
            </Link>
        </div>

        <Navbar />

        <div className='flex gap-4 pt-2 items-center'>
        <DarkThemeToggle />
        <IoMdHeart className='text-2xl' />
        <TiShoppingCart className='text-2xl' />
        <Link to='/register'>
            <FaRegUserCircle className='text-2xl' />
        </Link>
        </div>
    </header>
  );
}
