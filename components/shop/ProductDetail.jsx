import React from "react";
import RatingStars from "../product/auxiliarComponents/RatingStars";
import ProductDetailCarousel from "./auxiliarComponents/ProductDetailCarousel";

const ProductDetail = () => {
  const imagesList = [
    "/Product.png",
    "/Hero1.png",
    "/Hero2.png",
    "/LogoFooter.png",
  ];
  return (
    <div className="flex flex-col py-2 gap-2 sm:flex-row sm:gap-4 md:gap-10 sm:items-start justify-center items-center w-full">
      <div className="flex flex-row justify-center items-center pb-10 sm:pb-0">
        <div className="relative w-72 h-72 xs:w-80 xs:h-80 md:w-[400px] lg:w-[550px] lg:h-96">
          <ProductDetailCarousel images={imagesList} lateralColum={true} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 stroke-[#C9140F] absolute top-2 right-2 sm:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-between max-w-72 xs:max-w-80 sm:h-80 lg:h-96 gap-4 sm:gap-0">
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl md:text-3xl font-bold text-black">
              Bolso QOM
            </span>
            <div className="flex flex-row gap-1 justify-center items-center">
              <RatingStars />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="text-2xl md:text-3xl font-medium">$1500</span>
              <span className="bg-[#C9140F] text-xl md:text-2xl text-white font-medium tracking-widest px-2">
                -30%
              </span>
            </div>
            <span className="text-2xl md:text-3xl line-through text-black/50">
              $1950
            </span>
            <span className="text-sm md:text-base text-black/70">
              Cesta tejida con fibras vegetales, fabricado por miembros de los
              pueblos originarios QOM
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
