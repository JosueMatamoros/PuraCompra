import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import Navbar from './Navbar';
import logo from '../../assets/JieShopLogo.png'; 
import { Avatar, ListGroup } from "flowbite-react";
import { AuthContext } from '../../context/AuthContext';
import sessionstorage from 'sessionstorage';
import hasbulla from '../../profileIcon/hasbulla.png';
import hasbullaAdmin from '../../profileIcon/hasbullaAdmin.jpg'
import ShoppingCart from '../../pages/ShoppingCart';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    sessionstorage.removeItem('user');
    logout();
    navigate('/');
  }

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Cerrar el menú después de la navegación
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const profilePicture = user?.profilePicture 
    ? `http://localhost:3000${user.profilePicture}` 
    : (user?.role === 'admin' ? hasbullaAdmin : hasbulla);


  return (
    <header className='flex justify-between items-center mx-4 py-2 md:mx-8 lg:mx-16'> 
      <div className='flex items-center gap-2'>
        <Link to='/'>
          <img src={logo} alt="JieShop Logo" className="h-14" />
        </Link>
      </div>
      <Navbar />
      <div className='flex gap-4 pt-2 items-center relative'>
        <TiShoppingCart className='text-2xl cursor-pointer' onClick={() => setIsCartOpen(true)} />

        {user ? (
          <div onClick={toggleMenu}>
            <Avatar alt="User settings" img={profilePicture} rounded size={"sm"} className="cursor-pointer" />
          </div>
        ) : (
          <FaRegUserCircle className='text-2xl cursor-pointer' onClick={toggleMenu} />
        )}

        {isMenuOpen && (
          <div className="absolute top-full mt-4 right-0 bg-white rounded-md shadow-lg transition-transform transform origin-top animate-dropdown">
            <ListGroup className="w-48">
              {user ? (
                <>
                  <ListGroup.Item onClick={() => handleNavigate('/account')} icon={HiUserCircle}>
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item onClick={logOut} icon={IoIosLogOut}>
                    Logout
                  </ListGroup.Item>
                </>
              ) : (
                <ListGroup.Item onClick={() => handleNavigate('/register')} icon={HiUserCircle}>
                  Login
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        )}
      </div>
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </header>
  );
}
