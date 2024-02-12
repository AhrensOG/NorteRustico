import RatingStars from "@/components/product/auxiliarComponents/RatingStars";
import ProductDetailCarousel from "@/components/shop/auxiliarComponents/ProductDetailCarousel";
import React from "react";

const ProductVisualization = ({ setShowDetail, data }) => {
  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6">
      <div className="bg-white max-w-screen-sm w-full h-2/3 rounded-md p-4 px-6 flex flex-col justify-start items-start">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Previsualización
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black/60 cursor-pointer"
            onClick={(e) => setShowDetail(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        {/* CARD  */}
        <div className="w-full h-full flex flex-row justify-center items-center relative gap-4">
          <div className="absolute w-full h-full z-30"></div>
          {/* CAROUSEL */}
          <div className="w-72 h-72">
            <ProductDetailCarousel
              images={data.ProductImages}
              lateralColum={false}
            />
          </div>
          {/* PRODUCT INFO */}
          <div className="flex flex-col items-start justify-between max-w-80 gap-4 sm:gap-0">
            <div className="flex flex-col items-start justify-center">
              <span className="text-2xl md:text-3xl font-bold text-black">
                {data.name}
              </span>
              <div className="flex flex-row gap-1 justify-center items-center">
                <RatingStars rating={data.score} />
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-2xl md:text-3xl font-medium">
                  $
                  {data.discount
                    ? Number.isInteger(data.price - data.price * (data.discount / 100)) ? Number(data.price - data.price * (data.discount / 100)) : (data.price - data.price * (data.discount / 100)).toFixed(2)
                    : data.price}
                </span>
                {data.discount && (
                  <span className="bg-[#C9140F] text-xl md:text-2xl text-white font-medium tracking-widest px-2">
                    -{data.discount}%
                  </span>
                )}
              </div>
              <span className="text-2xl md:text-3xl line-through text-black/50">
                ${Number(data.price)}
              </span>
              <span className="text-sm md:text-base text-black/70">
                {data.description}
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
    </div>
  );
};

export default ProductVisualization;
