import React from 'react'

// Components
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHeart } from "react-icons/io";


// Assets
import logo from '../../assets/JieShopLogo.png'


export default function Header() {
  return (
    <header className='flex justify-between mx-4'>
        <div>
            <h1>Logo</h1>
            <Link to='/'>
                <img src='' />
            </Link>
        </div>


        <Navbar />

        <div className='flex gap-4'>
        <IoMdHeart className='text-2xl' />
        <TiShoppingCart className='text-2xl' />
        </div>
        
        
    
    </header>
  );
}