import React, { useState } from 'react';
import StockModal from '../modal/StockModal';

const ActionButtons = ({ productId, onStockChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    // Lógica para eliminar el producto
  };

  return (
    <>
      <div className="flex justify-end items-center gap-2">
        <button
          className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full p-2"
          onClick={handleEditClick}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-7 7-7-7" />
          </svg>
          <span className="sr-only">Edit</span>
        </button>
        <button
          className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full p-2"
          onClick={handleDeleteClick}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Delete</span>
        </button>
      </div>
      {isModalOpen && <StockModal productId={productId} onClose={() => setIsModalOpen(false)} onStockChange={onStockChange} />}
    </>
  );
};

export default ActionButtons;
