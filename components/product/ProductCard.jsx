import Image from "next/image";
import React from "react";
import RatingStars from "./auxiliarComponents/RatingStars";
import Link from "next/link";
import Favourites from "./auxiliarComponents/Favourites";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-[220px] min-w-[220px] max-h-[456px] h-[456px] py-4 hover:-translate-y-1 duration-300">
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
      <div className="flex flex-col h-[210px] gap-1 items-start justify-center py-3 min-w-[220px] max-w-[220px]">
        <div className="flex flex-col h-[210px] gap-1 items-start justify-start py-3 min-w-[220px] max-w-[220px]">
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
                  : Number(product.price)}
              </span>
              {product.discount !== 0 && (
                <span className="bg-[#C9140F] text-xl text-white font-medium tracking-widest px-2">
                  -{product.discount}%
                </span>
              )}
            </div>
          </Link>
          {product.discount !== 0 && (
            <Link href={`/shop/${product.id}?name=${product.name}`}>
              <span className="text-2xl line-through text-black/50">
                ${Number(product.price)}
              </span>
            </Link>
          )}
        </div>
        <Favourites product={product} size="sm" />
      </div>
    </div>
  );
};

export default ProductCard;
