import React, { useState } from "react";

export default function QuantityModal({ item, onClose, onUpdateQuantity, onDeleteItem }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateClick = () => {
    onUpdateQuantity(Number(quantity));
  };

  const handleDeleteClick = () => {
    onDeleteItem();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Quantity</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
