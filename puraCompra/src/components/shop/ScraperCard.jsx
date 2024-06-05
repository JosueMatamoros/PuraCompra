import React from "react";
import { Rating } from "flowbite-react";

export default function ScraperCard({ name, imageUrl, price, rating }) {
  const roundedRating = Math.round(rating);
  const emptyStars = 5 - roundedRating;

  // Asegúrate de que el precio sea un número
  const numericPrice = Number(price);
  const formattedPrice = isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);

  return (
    <div className="flex w-6/12 items-start justify-center ">
      <div className="w-1/3">
        <img src={imageUrl} alt={name} className="w-full h-auto" />
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <Rating size="md">
          {Array.from({ length: roundedRating }).map((_, index) => (
            <Rating.Star key={index} />
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <Rating.Star key={roundedRating + index + 1} filled={false} />
          ))}
        </Rating>

        <p className="text-xl font-bold text-stone-800 mb-2">${formattedPrice}</p>
      </div>
    </div>
  );
}
