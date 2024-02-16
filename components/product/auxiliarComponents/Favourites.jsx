import { Context } from "@/app/context/GlobalContext";
import {
  addProductToFavourites,
  getFavouriteProducts,
} from "@/app/context/actions";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Favourites = ({ product = false, size = "lg" }) => {
  const { state, dispatch } = useContext(Context);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddToFavourites = async () => {
    try {
      if (!state.user) {
        return toast.info("Para añadir a favoritos debes iniciar sesion");
      }

      if (product) {
        if (isFavourite) {
          return toast.info(
            `El producto ${product.name} ya esta en tu lista de favoritos`
          );
        }
        const data = {
          productId: product.id,
          userId: state.user.id,
        };
        await addProductToFavourites(data);
        await getFavouriteProducts(state.user.id, dispatch);
        return toast.success(
          `Añadiste ${product.name} a tu lista de favoritos`
        );
      }

      if (state.productDetail) {
        if (isFavourite) {
          return toast.info(
            `El producto ${state.productDetail.name} ya esta en tu lista de favoritos`
          );
        }
        const data = {
          productId: state.productDetail.id,
          userId: state.user.id,
        };
        await addProductToFavourites(data);
        await getFavouriteProducts(state.user.id, dispatch);
        return toast.success(
          `Añadiste ${state.productDetail.name} a tu lista de favoritos`
        );
      }
    } catch (error) {
      return toast.error("Ocurrio un error al añadir a favoritos", {
        description: "Intenta nuevamente mas tarde",
      });
    }
  };

  useEffect(() => {
    if (state.favouriteProducts) {
      if (product) {
        const exist =
          state.favouriteProducts.find((p) => p.id === product.id) !==
          undefined;
        setIsFavourite(exist);
      } else {
        const exist =
          state.favouriteProducts.find(
            (product) => product.id === state.productDetail.id
          ) !== undefined;
        setIsFavourite(exist);
      }
    }
  }, [state.favouriteProducts]);

  return (
    <div
      onClick={(e) => handleAddToFavourites()}
      className="w-full flex flex-row justify-center items-center py-2"
    >
      <span
        className={`text-[#C9140F] flex flex-row ${
          size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-xs"
        } items-center gap-2 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavourite ? "#C9140F" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            size === "lg" || size === "sm" ? "w-6 h-6" : "w-4 h-4"
          } stroke-[#C9140F]`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        Agregar a Favoritos
      </span>
    </div>
  );
};

export default Favourites;
