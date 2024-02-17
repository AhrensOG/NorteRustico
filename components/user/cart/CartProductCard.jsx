import { Context } from "@/app/context/GlobalContext";
import { removeProductFromCart } from "@/app/context/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useContext } from "react";

const CartProductCard = ({ product }) => {
  const { dispatch } = useContext(Context);

  return (
    <div className="w-full py-2">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="w-16 h-16 xs:w-20 xs:h-20 relative">
            <Image
              src={product.ProductImages[0].url}
              alt="ProductImage"
              className="w-full h-full rounded object-center object-cover transition-opacity opacity-0 duration-500"
              fill
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              sizes="(max-width: 80px) 25vw, 80px"
              priority
              quality={100}
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium xs:text-base lg:text-lg">
              {product.name}
              <span className="text-sm text-black/50 pl-1">
                ({product.items})
              </span>
            </p>
            <div className="text-sm xs:text-base space-x-4">
              <Link href={`/shop/${product.id}?name=${product.name}`}>
                <span className="text-blue-500">Editar</span>
              </Link>
              <button
                onClick={() => removeProductFromCart(product, dispatch)}
                className="text-[#C9140F]"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <span className="xs:text-lg text-black/50 line-through">
            $ {product.price}
          </span>
          <span className="xs:text-lg">$ {product.discountedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
