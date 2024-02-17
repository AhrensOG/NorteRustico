"use client";
import { Context } from "@/app/context/GlobalContext";
import CartInformation from "@/components/user/cart/CartInformation";
import CartProductCard from "@/components/user/cart/CartProductCard";
import Link from "next/link";
import React, { useContext } from "react";

const CartPage = () => {
  const { state } = useContext(Context);
  return (
    <div className="p-4 pb-16 flex flex-col items-center justify-center w-full">
      <div className="2xl:max-w-screen-xl md:max-w-screen-lg w-full space-y-6 sm:space-y-10">
        {/* TITLE  */}
        <h1 className="text-start font-medium xs:text-xl sm:text-2xl">
          Carrito
          <span className="font-light text-xs sm:text-base pl-1.5">
            {state.cartItems ? state.cartItems : 0} ITEMS
          </span>
        </h1>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-4 md:gap-8">
          {/* CART PRODUCTS */}
          <div className="w-full flex flex-col divide-y-2 overflow-y-scroll max-h-40 xs:max-h-52 sm:max-h-80 scrollbar-none">
            {state.cart?.length > 0 ? (
              state.cart.map((product) => {
                return <CartProductCard key={product.id} product={product} />;
              })
            ) : (
              <div className="flex flex-col w-full items-center justify-center text-lg text-black/50">
                <span>Aun no hay productos en el carrito.</span>
                <p>
                  {" "}
                  Visita la{" "}
                  <span className="text-blue-700">
                    <Link href={'/shop'}>tienda</Link>{" "}
                  </span>{" "}
                  y añade algunos!
                </p>
              </div>
            )}
          </div>

          {/* INFORMATION CART */}
          <div className="w-full md:w-auto">
            <CartInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
