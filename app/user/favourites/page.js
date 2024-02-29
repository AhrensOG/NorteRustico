"use client";
import { Context } from "@/app/context/GlobalContext";
import { searchRelatedProducts } from "@/app/context/actions";
import Loader from "@/components/Loader";
import RelationatedProducts from "@/components/shop/RelationatedProducts";
import FavouriteProductCard from "@/components/user/favourites/FavouriteProductCard";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

function extractUniqueCategories(products) {
  const uniqueCategories = {};
  products.forEach((product) => {
    if (product.Categories && Array.isArray(product.Categories)) {
      product.Categories.forEach((category) => {
        if (!uniqueCategories[category.id]) {
          uniqueCategories[category.id] = category;
        }
      });
    }
  });

  return Object.values(uniqueCategories);
}

//////////////////////////////////////////////////////////////////////////////////

const FavouritesPage = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!state.user) {
      toast.info("Inicia sesión y vuelve por tu favoritos!", {
        description: "Vamos a redirigirte!",
      });
      return router.push("/authenticate");
    }
    const getRelatedProducts = async () => {
      try {
        if (state.favouriteProducts) {
          const categories = extractUniqueCategories(state.favouriteProducts);
          await searchRelatedProducts(categories, dispatch);
        }
      } catch (error) {
        return toast.error(
          "Ocurrio un error el solicitar los productos relacionados"
        );
      }
    };
    getRelatedProducts();
  }, [state.favouriteProducts]);

  if (state.favouriteProducts === undefined) {
    return (
      <div className="p-4 xs:p-8 w-full flex flex-col justify-center items-center h-full">
        <Loader size={40} color="#1D4ED8" />
      </div>
    );
  }

  if (!state.favouriteProducts) {
    return (
      <div className="flex flex-row w-full h-full items-center justify-center text-black/50 text-lg xs:text-xl sm:text-2xl md:text-3xl text-center">
        <h2 className="flex flex-col">
          Tu lista esta vacía.
          <span>Visita la tienda y añade algunos!</span>{" "}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 xs:p-8 w-full flex flex-col justify-center items-center h-full">
      <div className="w-full flex flex-col justify-center items-start max-w-screen-xl space-y-10">
        {/* TITLE  */}
        <h1 className="text-start font-medium xs:text-xl sm:text-2xl">
          Favoritos
          <span className="font-light text-xs sm:text-base pl-1.5">
            {state.favouriteProducts.length} ITEMS
          </span>
        </h1>

        <div className="w-full space-y-20">
          <div>
            <div className="overflow-y-scroll scrollbar-none max-h-80 sm:overflow-y-hidden sm:max-h-none sm:grid sm:grid-cols-2 sm:gap-2 sm:justify-items-center md:grid-cols-3">
              {state.favouriteProducts.map((item, index) => (
                <div
                  key={index}
                  className={`w-full bg-white py-4 border-b sm:border-r ${
                    index % 2 === 1 ? "sm:border-r-0" : ""
                  } ${
                    index >= state.favouriteProducts.length - 2
                      ? "sm:border-b-0"
                      : ""
                  } md:hidden `}
                >
                  <FavouriteProductCard product={item} />
                </div>
              ))}
              {state.favouriteProducts.map((item, index) => (
                <div
                  key={index}
                  className={`w-full bg-white py-4 px-1 border-b border-r ${
                    index % 3 === 2 ? "border-r-0" : ""
                  } ${
                    index >= state.favouriteProducts.length - 3
                      ? "sm:border-b-0"
                      : ""
                  } hidden md:block`}
                >
                  <FavouriteProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
          {state.searchedRelatedProducts ? (
            <RelationatedProducts products={state.searchedRelatedProducts} />
          ) : (
            <div className="flex flex-row justify-center items-center w-full my-40">
              <Loader size={40} color="#1D4ED8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
