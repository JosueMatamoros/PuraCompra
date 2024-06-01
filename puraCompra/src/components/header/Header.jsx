import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle, HiOutlineAdjustments } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import Navbar from './Navbar';
import logo from '../../assets/JieShopLogo.png'; 
import { Avatar, ListGroup } from "flowbite-react";
import { AuthContext } from '../../context/AuthContext';
import sessionstorage from 'sessionstorage';
import hasbulla from '../../profileIcon/hasbulla.png'

export default function Header() {
  // cambiar variable por logica para ver si se esta registrado o no
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className='flex justify-between items-center mx-4 py-2 md:mx-8 lg:mx-16'> 
      <div className='flex items-center gap-2'>
        <Link to='/'>
          <img src={logo} alt="JieShop Logo" className="h-14" />
        </Link>
      </div>
      <Navbar />
      <div className='flex gap-4 pt-2 items-center relative'>
        <IoMdHeart className='text-2xl' />
        <TiShoppingCart onClick={() => handleNavigate('/cart')} className='text-2xl' />

        {user ? (
          <div onClick={toggleMenu}>
            <Avatar alt="User settings" img={`http://localhost:3000${user.profilePicture}`} rounded size={"sm"} className="cursor-pointer" />
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
    </header>
  );
}
