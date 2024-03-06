import React from "react";
import SmallProductCard from "../product/SmallProductCard";

const RelationatedProducts = ({ products }) => {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 500;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 500;
  };

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="w-full py-10 max-w-screen-lg 2xl:max-w-screen-xl">
        <span className="text-xl font-medium">Productos Relacionados</span>
        <div className="relative group">
          {/* Left Arrow */}
          <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
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
          </button>
          {/* Right Arrow */}
          <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
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
          </button>
          <div id="content" className="overflow-x-scroll flex flex-row gap-6 md:gap-10 scrollbar-none scroll-smooth">
            {products.map((p) => (
              <SmallProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationatedProducts;
