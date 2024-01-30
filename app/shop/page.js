"use client";
import ProductCard from "@/components/product/ProductCard";
import SmallProductCard from "@/components/product/SmallProductCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import Loading from "./loading";

const Shop = () => {
  const searchParams = useSearchParams();
  const [openFilters, setOpenFilters] = useState(false);
  const [openOrdering, setOpenOrdering] = useState(false);
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-row justify-center items-center">
        <div className="px-4 py-6 xs:px-6 xs:py-8 sm:p-10 max-w-screen-2xl">
          <div className="relative flex flex-row justify-between items-center">
            <span className="text-lg xs:text-xl sm:text-3xl font-bold">
              Tienda
            </span>
            <div className="flex flex-row justify-center items-center gap-4 xs:gap-6 sm:gap-8">
              <span
                className="hidden md:flex flex-row justify-center items-center gap-1 text-blue-600 xs:text-xl sm:text-2xl font-medium cursor-pointer"
                onClick={() => setOpenOrdering(!openOrdering)}
              >
                Ordernar
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
              <span
                className="flex flex-row justify-center items-center gap-1 text-blue-600 xs:text-xl sm:text-2xl font-medium cursor-pointer"
                onClick={() => setOpenFilters(!openFilters)}
              >
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
            {openFilters ? (
              <div className="absolute z-20 right-0 top-6 xs:top-8 sm:top-10 flex flex-row justify-center items-center">
                <div className="bg-white z-10 py-2.5 px-5 rounded-md flex flex-col justify-center items-start gap-2">
                  <span className="text-xl font-medium tracking-wider">
                    Categorías
                  </span>
                  <div className="flex flex-col justify-center items-start gap-1">
                    {[
                      "Bolsos",
                      "Collares",
                      "Pulseras",
                      "Anillos",
                      "Aros",
                      "Atrapa Sueños",
                      "Brazaletes",
                      "Adornos",
                    ].map((cat) => {
                      return (
                        <span
                          key={cat}
                          className="tracking-wider indent-1 font-light cursor-pointer"
                        >
                          {cat}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="fixed z-0 h-screen w-screen bg-black/50 top-0 left-0"
                  onClick={() => setOpenFilters(!openFilters)}
                ></div>
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            {openOrdering ? (
              <div className="absolute z-20 right-[138px] top-6 xs:top-8 sm:top-10  hidden md:flex flex-row justify-center items-center ">
                <div className="bg-white z-10 py-2.5 px-5 rounded-md flex flex-col justify-center items-start gap-2">
                  <span className="text-xl font-medium tracking-wider">
                    Categorías
                  </span>
                  <div className="flex flex-col justify-center items-start gap-1">
                    {[
                      "Menor Precio",
                      "Mayor Precio",
                      "Mas Relevantes",
                      "Menos Relevantes",
                    ].map((cat) => {
                      return (
                        <span
                          key={cat}
                          className="tracking-wider indent-1 font-light cursor-pointer"
                        >
                          {cat}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="fixed z-0 h-screen w-screen bg-black/50 top-0 left-0"
                  onClick={() => setOpenOrdering(!openOrdering)}
                ></div>
              </div>
            ) : (
              <div className="hidden"></div>
            )}
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
    </Suspense>
  );
};

export default Shop;
