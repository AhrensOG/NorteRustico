import { Context } from "@/app/context/GlobalContext";
import { getFavouriteProducts, removeProductToFavourites } from "@/app/context/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";

const FavouriteProductCard = ({ product }) => {
  const { state, dispatch } = useContext(Context);

  const handleRemoveProductToFavourites = async () => {
    try {
      const body = {
        productId: product.id,
        userId: state.user.id
      }
      await removeProductToFavourites(body)
      await getFavouriteProducts(state.user.id, dispatch)
      return toast.success(`Removiste ${product.name} de tu lista de favoritos`)
    } catch (error) {
      return toast.error(
        "Ocurrio un error al intentar remover el producto de tu lista de favoritos", { description: 'Intenta nuevamente mas tarde' }
      );
    }
  };

  return (
    <div className="w-full sm:max-w-none flex flex-row space-x-4 justify-center">
      <Link href={`/shop/${product.id}?name=${product.name}`}>
        <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
          <Image
            src={product.ProductImages[0].url}
            fill
            alt={product.name}
            className="rounded-md object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 112px) 25vw, 112px"
          />
        </div>
      </Link>
      <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between items-start py-2">
        <span className="xs:text-base lg:text-lg font-medium">
          <Link href={`/shop/${product.id}?name=${product.name}`}>
            {product.name}
          </Link>
        </span>
        <div className="flex flex-col justify-center items-end sm:items-start">
          <span className="xs:text-base lg:text-lg font-medium">
            <Link href={`/shop/${product.id}?name=${product.name}`}>
              $ {product.price}
            </Link>
          </span>
          <span className="xs:text-base lg:text-lg text-[#C9140F] cursor-pointer" onClick={() => handleRemoveProductToFavourites()}>
            Remover
          </span>
        </div>
      </div>
    </div>
  );
};

export default FavouriteProductCard;
