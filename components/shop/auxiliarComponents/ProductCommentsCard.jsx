import React from "react";
import RatingStars from "../../product/auxiliarComponents/RatingStars";

const ProductCommentsCard = ({ rating = 4, date = '23 Enero 2024', comment = 'Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.'  }) => {
  return (
    <div className="flex flex-col w-full items-start justify-center py-4 gap-2">
      <div className="flex flex-row justify-between items-center w-full">
        <RatingStars rating={rating} />
        <span className="text-xs md:text-sm text-black/80">{date}</span>
      </div>
      <div className="flex flex-row w-full">
        <span className="text-xs md:text-base text-black/80 sm:w-4/5">
          {comment}
        </span>
      </div>
    </div>
  );
};

export default ProductCommentsCard;
