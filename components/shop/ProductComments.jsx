import React, { useState } from "react";
import ProductCommentsCard from "./auxiliarComponents/ProductCommentsCard";
import RatingStars from "../product/auxiliarComponents/RatingStars";

const ProductComments = () => {
  const comments = [
    {
      id: 1,
      rating: 4,
      date: "23 Enero 2024",
      comment:
        "Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.",
    },
    {
      id: 2,
      rating: 2,
      date: "21 Diciembre 2023",
      comment: "Es perfecta! La compré para un regalo y le encanto.",
    },
    {
      id: 3,
      rating: 4,
      date: "23 Enero 2024",
      comment:
        "Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.",
    },
    {
      id: 4,
      rating: 2,
      date: "21 Diciembre 2023",
      comment: "Es perfecta! La compré para un regalo y le encanto.",
    },
    {
      id: 5,
      rating: 4,
      date: "23 Enero 2024",
      comment:
        "Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.",
    },
    {
      id: 6,
      rating: 2,
      date: "21 Diciembre 2023",
      comment: "Es perfecta! La compré para un regalo y le encanto.",
    },
    {
      id: 7,
      rating: 4,
      date: "23 Enero 2024",
      comment:
        "Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.",
    },
    {
      id: 8,
      rating: 2,
      date: "21 Diciembre 2023",
      comment: "Es perfecta! La compré para un regalo y le encanto.",
    },
    {
      id: 9,
      rating: 4,
      date: "23 Enero 2024",
      comment:
        "Es perfecta! La calidad excleente! La compré para un regalo ya esta en mi lista de compras para mi. Super recomendable, no es tan grande como en la foto pero es divina.",
    },
    {
      id: 10,
      rating: 2,
      date: "21 Diciembre 2023",
      comment: "Es perfecta! La compré para un regalo y le encanto.",
    },
  ];
  const [showAllComments, setShowAllComments] = useState(false);

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };
  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="max-w-screen-lg flex flex-col w-full">
        <div className="flex flex-row justify-start items-center gap-4 w-full py-4">
          <span className="text-sm font-medium md:text-lg">
            Opniones del Producto
          </span>
          <RatingStars />
        </div>
        {/* CARD */}
        <div className="flex flex-col justify-center items-center divide-y-2">
          {showAllComments
            ? comments.map((c) => (
                <ProductCommentsCard
                  key={c.id}
                  rating={c.rating}
                  date={c.date}
                  comment={c.comment}
                />
              ))
            : comments
                .slice(0, 2)
                .map((c) => (
                  <ProductCommentsCard
                    key={c.id}
                    rating={c.rating}
                    date={c.date}
                    comment={c.comment}
                  />
                ))}
        </div>
        <div className="text-center">
          {!showAllComments && comments.length > 2 && (
            <button onClick={handleShowMoreComments} className="text-blue-500">
              Mostrar todas la opiniones
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
