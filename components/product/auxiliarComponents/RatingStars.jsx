import React, { useState } from "react";

const StarIcon = ({ value, rating, action }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${value <= rating ? "#fde047" : "lightgray"}`}
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 22 20"
      onClick={() => action(value)}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};

const RatingStars = () => {
  const [rating, setRating] = useState(4);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon
          key={value}
          className={`w-4 h-4 cursor-pointer `}
          value={value}
          rating={rating}
          action={handleRatingClick}
        />
      ))}
      <span className="text-sm pl-2">{rating} de 5</span>
    </div>
  );
};

export default RatingStars;
