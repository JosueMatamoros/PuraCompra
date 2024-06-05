import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AddReviewModal = ({ setIsModalOpen, handleAddReview, productId }) => {
  const { user } = useContext(AuthContext); // Obtiene el usuario autenticado
  const [stars, setStars] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async () => {
    const newReview = {
      UsersId: user.UsersID,
      ProductsId: productId,
      body: reviewText,
      star: stars,
    };

    try {
      const response = await axios.post('http://localhost:3000/reviews', newReview);
      handleAddReview(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Add a Review</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`w-10 h-10 ${star <= stars ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setStars(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Review</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="4"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
