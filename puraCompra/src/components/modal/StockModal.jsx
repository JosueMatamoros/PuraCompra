import React, { useState } from 'react';

const StockModal = ({ productId, onClose, onStockChange }) => {
  const [newStock, setNewStock] = useState('');

  const handleStockChange = (e) => {
    setNewStock(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock }),
      });
      if (response.ok) {
        onStockChange(productId, newStock);
        onClose();
      } else {
        console.error('Failed to update stock');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Stock</h2>
        <input
          type="number"
          className="border p-2 w-full mb-4 border-transparent focus:border-transparent focus:ring-0"
          placeholder="Enter new stock"
          value={newStock}
          onChange={handleStockChange}
        />
        <div className="flex justify-end gap-4">
          <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
