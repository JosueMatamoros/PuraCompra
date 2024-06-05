import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function StarIcon({ filled, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "#e3a008" : "none"}
      stroke={filled ? "#e3a008" : "#d1d5db"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer"
      style={{ cursor: 'pointer' }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

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

  const handleStarClick = (star) => {
    setStars(star);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Write a Review</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={star <= stars}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Review</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about the product..."
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
