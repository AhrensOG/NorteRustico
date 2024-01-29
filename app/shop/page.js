"use client";
import ProductCard from "@/components/product/ProductCard";
import SmallProductCard from "@/components/product/SmallProductCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="px-4 py-6 xs:px-6 xs:py-8 sm:p-10 max-w-screen-2xl">
        <div className="flex flex-row justify-between items-center">
          <span className="text-lg xs:text-xl sm:text-3xl font-bold">
            Tienda
          </span>
          <span className="flex flex-row justify-center items-center gap-1 text-blue-600 xs:text-xl sm:text-2xl font-medium cursor-pointer">
            Filtrar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
        <div className="sm:hidden flex flex-row flex-wrap justify-around items-center gap-1 xs:gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <SmallProductCard key={value} />
          ))}
        </div>
        <div className="hidden sm:flex flex-row flex-wrap justify-around items-center gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <ProductCard key={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const searchParams = useSearchParams();
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default Shop;
