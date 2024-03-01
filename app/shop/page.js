"use client";
import ProductCard from "@/components/product/ProductCard";
import SmallProductCard from "@/components/product/SmallProductCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Loading from "./loading";
import { Context } from "../context/GlobalContext";
import Loader from "@/components/Loader";

const Shop = () => {
  const { state } = useContext(Context);
  const searchParams = useSearchParams();

  const [openFilters, setOpenFilters] = useState(false);
  const [openOrdering, setOpenOrdering] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [orderByScore, setOrderByScore] = useState({ ascending: false });
  const [orderByPrice, setOrderByPrice] = useState({ ascending: false });

  useEffect(() => {
    const name = searchParams.get("name");

    let filtered = state.products;

    if (name && state?.products) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((product) =>
        product.Categories.some((cat) => cat.name === selectedCategory)
      );
    }

    if (orderByScore) {
      filtered = sortByScore(filtered, orderByScore.ascending);
    }

    if (orderByPrice) {
      filtered = sortByPrice(filtered, orderByPrice.ascending);
    }

    setFilteredProducts(filtered);
  }, [
    searchParams,
    state.products,
    selectedCategory,
    orderByScore,
    orderByPrice,
  ]);

  const sortByScore = (products, ascending) => {
    return products?.slice().sort((a, b) => {
      if (ascending) {
        setOpenOrdering(false);
        return b.score - a.score;
      } else {
        setOpenOrdering(false);
        return a.score - b.score;
      }
    });
  };

  const sortByPrice = (products, ascending) => {
    return products?.slice().sort((a, b) => {
      if (ascending) {
        setOpenOrdering(false);
        return b.price - a.price;
      } else {
        setOpenOrdering(false);
        return a.price - b.price;
      }
    });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setOpenFilters(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      {filteredProducts?.length > 0 ? (
        <div className="flex flex-row justify-center items-center">
          <div className="px-4 py-6 xs:px-6 xs:py-8 sm:p-10 max-w-screen-2xl w-full">
            <div className="flex flex-col justify-center items-start w-full pb-4">
              {searchParams.get("name") !== null &&
                searchParams.get("name") !== "" && (
                  <span className="text-lg font-semibold  text-black/50">
                    Resultados para: '{searchParams.get("name")}'
                  </span>
                )}
              {selectedCategory !== false && selectedCategory !== "All" && (
                <span className="text-lg font-semibold  text-black/50">
                  Categoría: '{selectedCategory}'
                </span>
              )}
            </div>
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
                      <span
                        className={`tracking-wider indent-1 font-light cursor-pointer ${
                          selectedCategory === "All" ? "text-blue-600" : ""
                        }`}
                        onClick={() => handleCategoryFilter("All")}
                      >
                        Todas
                      </span>
                      {state?.categories?.map((cat) => {
                        return (
                          <span
                            key={cat.id}
                            className={`tracking-wider indent-1 font-light cursor-pointer ${
                              selectedCategory === cat.name
                                ? "text-blue-600"
                                : ""
                            }`}
                            onClick={() => handleCategoryFilter(cat.name)}
                          >
                            {cat.name}
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
                      Ordenar
                    </span>
                    <div className="flex flex-col justify-center items-start gap-1">
                      {[
                        {
                          name: "Menor Precio",
                          type: "DESC",
                          action: setOrderByPrice,
                        },
                        {
                          name: "Mayor Precio",
                          type: "ASC",
                          action: setOrderByPrice,
                        },
                        {
                          name: "Menos Relevantes",
                          type: "DESC",
                          action: setOrderByScore,
                        },
                        {
                          name: "Mas Relevantes",
                          type: "ASC",
                          action: setOrderByScore,
                        },
                      ].map((ord) => {
                        return (
                          <span
                            key={ord.name}
                            className={`tracking-wider indent-1 font-light cursor-pointer ${
                              selectedCategory === ord.name
                                ? "text-blue-600"
                                : ""
                            }`}
                            onClick={() =>
                              ord.action({ ascending: ord.type === "ASC" })
                            }
                          >
                            {ord.name}
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
              {filteredProducts.map((p) => (
                <SmallProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="hidden sm:flex flex-row flex-wrap justify-around items-center gap-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : state?.products && state.products.length > 0 ? (
        <div className="flex flex-row justify-center items-center">
          <div className="px-4 py-6 xs:px-6 xs:py-8 sm:p-10 max-w-screen-2xl w-full">
            {searchParams.get("name") !== null &&
              searchParams.get("name") !== "" && (
                <span className="text-lg font-semibold  text-black/50">
                  Sin resultados para: '{searchParams.get("name")}'
                </span>
              )}
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
              {state?.products?.map((p) => (
                <SmallProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="hidden sm:flex flex-row flex-wrap justify-around items-center gap-3">
              {state?.products?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-full h-full justify-center items-center">
          <Loader size={60} color="#1D4ED8" />
        </div>
      )}
    </Suspense>
  );
};

export default Shop;
