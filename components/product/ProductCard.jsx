import Image from "next/image";
import React from "react";
import RatingStars from "./auxiliarComponents/RatingStars";

const ProductCard = () => {
  return (
    <div className="max-w-[220px] min-w-[220px] py-4">
      <Image src={'/Product.png'} width={1000} height={1000} alt='ProductImage' className="w-[220px] h-[230px] rounded-2xl object-cover object-center" priority={true}/>
      
      {/* Loading Image effect */}

      {/* <div className="bg-slate-300 w-[220px] h-[230px] rounded-2xl" /> */}
      <div className="flex flex-col gap-1 items-start justify-center py-3 min-w-[220px] max-w-[220px]">
        <span className="text-xl font-medium text-black/85">Producto</span>
        <div className="flex flex-row gap-1 justify-center items-center">
          <RatingStars/>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-2xl font-medium">$1500</span>
          <span className="bg-[#C9140F] text-xl text-white font-medium tracking-widest px-2">
            -30%
          </span>
        </div>
        <span className="text-2xl line-through text-black/50">$1950</span>
        <div className="flex flex-row items-center justify-center w-full">
          <span className="text-[#C9140F] text-sm flex flex-row items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-[#C9140F]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Agregar a Favoritos
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
