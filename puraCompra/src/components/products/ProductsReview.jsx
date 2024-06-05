import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Hasbulla from "../../profileIcon/hasbulla.png"; // Ajusta la importación de la imagen
import AddReviewModal from '../modal/AddReviewModal';
import { Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

const ProductsReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);


  const fetchReviews = () => {
    axios.get(`http://localhost:3000/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
    fetchReviews();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const starCount = {
    ONE_STAR: 1,
    TWO_STAR: 2,
    TREE_STAR: 3,
    FOUR_STAR: 4,
    FIVE_STAR: 5
  };

  return (
    <div className="container mx-auto p-4">
      {showToast && (
        <div className="fixed bottom-4 right-4 transform transition-transform duration-300 ease-in-out">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Your review has been posted!</div>
          <Toast.Toggle />
        </Toast>
      </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Product Reviews</h2>
        <button
          className="flex items-center text-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add a review
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reviews.map(review => {
          if (!review.User) {
            return null; // O puedes renderizar un mensaje de error o un componente vacío
          }

          const reviewerProfilePicture = review.User.profilePicture
            ? `http://localhost:3000${review.User.profilePicture}`
            : Hasbulla;

          return (
            <ReviewCard
              key={review.reviewsId}
              stars={starCount[review.star]}
              date={review.date}
              reviewText={review.body}
              reviewerName={review.User.name}
              reviewerLastname={review.User.lastname}
              reviewerProfilePicture={reviewerProfilePicture}
              reviewerRole="user"
            />
          );
        })}
      </div>
      {isModalOpen && <AddReviewModal setIsModalOpen={setIsModalOpen} handleAddReview={handleAddReview} productId={id} />}
    </div>
  );
};

export default ProductsReview;
