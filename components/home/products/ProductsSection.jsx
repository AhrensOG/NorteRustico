import { Context } from "@/app/context/GlobalContext";
import Loader from "@/components/Loader";
import ProductCard from "@/components/product/ProductCard";
import SmallProductCard from "@/components/product/SmallProductCard";
import React, { useContext } from "react";

const ProductsSection = () => {
  const { state } = useContext(Context);
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 500;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 500;
  };
  console.log(state)
  return (
    <div className="flex flex-row justify-center items-center py-16 px-2">
      {state.searchedProductsByScore?.length > 0 ? (
        <div className="max-w-screen-2xl w-full">
          <div className="text-4xl font-extrabold tracking-wider w-full pb-4">
            TOP
          </div>
          {/* Web Design */}
          <div className="hidden md:block relative group">
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={scrollLeft}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={scrollRight}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div
              id="content"
              className="flex flex-row gap-10 justify-between items-center overflow-x-auto scroll-smooth scrollbar-track-[#CA995D]/50 scrollbar-thumb-[#CA995D] scrollbar-thin"
            >
              {state.searchedProductsByScore.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          {/* Mobile Design */}
          <div className="hidden xs:flex md:hidden flex-row flex-wrap justify-evenly items-center gap-6">
            {state.searchedProductsByScore.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex xs:hidden flex-row flex-wrap justify-evenly items-center gap-6">
            {state.searchedProductsByScore.map((p) => (
              <SmallProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : (
        <Loader size={60} color="#1D4ED8"/>
      )}
    </div>
  );
};

export default ProductsSection;
