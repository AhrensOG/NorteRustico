import Image from "next/image";
import React from "react";
import RatingStars from "./auxiliarComponents/RatingStars";
import Link from "next/link";
import Favourites from "./auxiliarComponents/Favourites";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-[250px] min-w-[250px] max-h-[516px] h-[516px] py-4 hover:-translate-y-1 duration-300">
      <Link href={`/shop/${product.id}?name=${product.name}`}>
        <div className="max-w-[250px] max-h-[260px] w-full h-full relative">
          <Image
            src={product.ProductImages[0]?.url}
            fill
            alt="ProductImage"
            className="rounded-2xl object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 250px) 25vw, 250px"
            priority={true}
            quality={100}
          />
        </div>
      </Link>
      <div className="flex flex-col max-h-[240px] gap-1 items-start justify-center py-3 max-w-[250px] w-full h-full">
        <div className="flex flex-col max-h-[240px] gap-1 items-start justify-start py-3 max-w-[250px] w-full h-full">
          <Link href={`/shop/${product.id}?name=${product.name}`}>
            <span className="text-2xl font-medium text-black/85">
              {product.name}
            </span>
          </Link>
          <div className="flex flex-row gap-1 justify-center items-center">
            <RatingStars rating={product.score} />
          </div>
          <Link href={`/shop/${product.id}?name=${product.name}`}>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="text-3xl font-medium">
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
                <span className="bg-[#C9140F] text-2xl text-white font-medium tracking-widest px-2">
                  -{product.discount}%
                </span>
              )}
            </div>
          </Link>
          {product.discount !== 0 && (
            <Link href={`/shop/${product.id}?name=${product.name}`}>
              <span className="text-3xl line-through text-black/50">
                ${Number(product.price)}
              </span>
            </Link>
          )}
        </div>
        <Favourites product={product} size="lg" />
      </div>
    </div>
  );
};

export default ProductCard;
