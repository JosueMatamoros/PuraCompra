import React, { useState } from "react";

export default function QuantityModal({ item, onClose, onUpdateQuantity, onDeleteItem, isDelete }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleUpdateClick = () => {
    onUpdateQuantity(Number(quantity));
  };

  const handleDeleteClick = () => {
    onDeleteItem();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {isDelete ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {item.product.name}?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Edit Quantity</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:bg-gray-100 border-transparent focus:border-transparent focus:ring-0"
                min="1"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdateClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
