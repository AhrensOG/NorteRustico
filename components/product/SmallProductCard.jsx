import React from "react";
import RatingStars from "./auxiliarComponents/RatingStars";
import Image from "next/image";
import Link from "next/link";
import Favourites from "./auxiliarComponents/Favourites";

const SmallProductCard = ({ product }) => {
  return (
    <div className="w-[130px] py-4 hover:-translate-y-1 duration-300 flex flex-col h-[368px]">
      <Link href={`/shop/${product.id}?name=${product.name}`}>
        <div className="w-[130px] h-[140px] relative">
          <Image
            src={product.ProductImages[0]?.url}
            fill
            alt="ProductImage"
            className="rounded-2xl object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 130px) 5vw, 130px"
            loading="lazy"
            quality={100}
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 items-start justify-center py-3 min-w-[130px] max-w-[130px] h-full">
        <div className="flex flex-col gap-1 items-start justify-start w-full h-full">
          <Link href={`/shop/${product.id}?name=${product.name}`}>
            <span className="text-base font-medium text-black/85">
              {product.name}
            </span>
          </Link>
          <div className="flex flex-row gap-1 justify-center items-center">
            <RatingStars rating={product.score} />
          </div>
          <div className="flex flex-row justify-start items-center gap-2 w-full">
            <Link href={`/shop/${product.id}?name=${product.name}`}>
              <span className="text-lg font-medium">
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
            </Link>
            {product.discount !== 0 && (
              <span className="bg-[#C9140F] text-base text-white font-medium tracking-widest w-full text-center">
                <Link href={`/shop/${product.id}?name=${product.name}`}>
                  -{product.discount}%
                </Link>
              </span>
            )}
          </div>
          {product.discount !== 0 && (
            <Link href={`/shop/${product.id}?name=${product.name}`}>
              <span className="text-lg line-through text-black/50">
                ${Number(product.price)}
              </span>
            </Link>
          )}
        </div>
        <Favourites product={product} size="xs" />
      </div>
    </div>
  );
};

export default SmallProductCard;
