import ProductCard from "@/components/product/ProductCard";
import React from "react";

const ProductsSection = () => {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 500;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 500;
  };
  return (
    <div className="flex flex-row justify-center items-center py-16 px-2">
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <ProductCard key={value} />
            ))}
          </div>
        </div>
        {/* Mobile Design */}
        <div className="md:hidden flex flex-row flex-wrap justify-evenly items-center gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <ProductCard key={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
