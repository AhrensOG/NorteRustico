import Image from "next/image";
import React from "react";
import RatingStars from "./auxiliarComponents/RatingStars";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-[220px] min-w-[220px] py-4 hover:-translate-y-1 duration-300">
      <Link href={`/shop/${product.id}?name=${product.name}`}>
        <div className="w-[220px] h-[230px] relative">
          <Image
            src={product.ProductImages[0]?.url}
            fill
            alt="ProductImage"
            className="rounded-2xl object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 220px) 25vw, 220px"
            loading="lazy"
            quality={50}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1 items-start justify-center py-3 min-w-[220px] max-w-[220px]">
        <Link href={`/shop/${product.id}?name=${product.name}`}>
          <span className="text-xl font-medium text-black/85">
            {product.name}
          </span>
        </Link>
        <div className="flex flex-row gap-1 justify-center items-center">
          <RatingStars rating={product.score} />
        </div>
        <Link href={`/shop/${product.id}?name=${product.name}`}>
          <div className="flex flex-row justify-center items-center gap-2">
            <span className="text-2xl font-medium">
              $
              {product.discount
                ? Number.isInteger(
                    product.price - product.price * (product.discount / 100)
                  )
                  ? Number(
                      product.price - product.price * (product.discount / 100)
                    )
                  : (
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)
                : product.price}
            </span>
            <span className="bg-[#C9140F] text-xl text-white font-medium tracking-widest px-2">
              -{product.discount}%
            </span>
          </div>
        </Link>
        <Link href={`/shop/${product.id}?name=${product.name}`}>
          <span className="text-2xl line-through text-black/50">
            ${Number(product.price)}
          </span>
        </Link>
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
