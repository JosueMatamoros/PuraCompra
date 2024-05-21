import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Header from '../components/header/Header';

export default function Shop() {
  return (
    <>
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative">
        <input
          type="text"
          placeholder="Paste Url"
          className="pl-4 pr-10 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" size={50}
        />
        <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
      </div>
    </div>
    </>
  );
}
