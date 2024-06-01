import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Hasbulla from "../../assets/profileIcon/Hasbulla.jpg"; // Ajusta la importación de la imagen

const ProductsReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews for the product
    axios.get(`http://localhost:3000/reviews/${id}`)
    
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  const starCount = {
    ONE_STAR: 1,
    TWO_STAR: 2,
    THREE_STAR: 3,
    FOUR_STAR: 4,
    FIVE_STAR: 5
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reviews.map(review => {
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
    </div>
  );
};

export default ProductsReview;
