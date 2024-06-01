import React from 'react';
import { Avatar, Blockquote, Rating } from "flowbite-react";

export default function ReviewCard({ stars, date, reviewText, reviewerName,  reviewerLastname ,reviewerRole, reviewerProfilePicture }) {
  return (
    <figure className="w-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <Rating size="md">
          {Array.from({ length: stars }).map((_, index) => (
            <Rating.Star key={index} />
          ))}
          {Array.from({ length: 5 - stars }).map((_, index) => (
            <Rating.Star key={index} filled={false} />
          ))}
        </Rating>
        <time className="ml-2 text-gray-500 dark:text-gray-400" dateTime={date}>
          {new Date(date).toLocaleDateString()}
        </time>
      </div>
      <Blockquote>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {reviewText}
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex items-center space-x-3">
        <Avatar rounded size="xs" img={reviewerProfilePicture} alt="profile picture" />
        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">{reviewerName} {reviewerLastname}</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{reviewerRole}</cite>
        </div>
      </figcaption>
    </figure>
  );
}
