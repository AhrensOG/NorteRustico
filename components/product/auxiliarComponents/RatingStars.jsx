import React from "react";
import StarIcon from "./StarIcon";

const RatingStars = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon
          key={value}
          className={`w-4 h-4 cursor-pointer `}
          value={value}
        />
      ))}
      <span className="text-sm pl-2">4 de 5</span>
    </div>
  );
};

export default RatingStars;
