import React from "react";
import RatingStars from "../product/auxiliarComponents/RatingStars";
import ProductDetailCarousel from "./auxiliarComponents/ProductDetailCarousel";

const ProductDetail = ({ product }) => {
  return (
    <div className="flex flex-col py-2 gap-2 sm:flex-row sm:gap-4 md:gap-10 sm:items-start justify-center items-center w-full">
      <div className="flex flex-row justify-center items-center pb-10 sm:pb-0">
        <div className="relative w-72 h-72 xs:w-80 xs:h-80 md:w-[400px] lg:w-[550px] lg:h-96">
          <ProductDetailCarousel
            images={product.ProductImages}
            lateralColum={true}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-between max-w-72 xs:max-w-80 sm:h-80 lg:h-96 gap-4 sm:gap-0">
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {product.name}
            </span>
            <div className="flex flex-row gap-1 justify-center items-center">
              <RatingStars rating={product.score} />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="text-2xl md:text-3xl font-medium">
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
              <span className="bg-[#C9140F] text-xl md:text-2xl text-white font-medium tracking-widest px-2">
                -{product.discount}%
              </span>
            </div>
            <span className="text-2xl md:text-3xl line-through text-black/50">
              ${Number(product.price)}
            </span>
            <span className="text-sm md:text-base text-black/70">
              {product.description}
            </span>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row justify-center items-center gap-0.5">
              <div className="flex flex-row items-center justify-center w-full basis-2/5 border-2 rounded py-1 px-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                  <span className="text-black/70 font-medium">1</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
              <button className="basis-3/5 bg-[#CA995D] border border-[#CA995D] rounded py-1 px-3">
                Agregar al carrito
              </button>
            </div>
            <button className="w-full bg-[#C9140F] rounded py-1 px-3 text-white uppercase tracking-wider">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
