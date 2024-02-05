import CartInformation from "@/components/user/cart/CartInformation";
import CartProductCard from "@/components/user/cart/CartProductCard";
import React from "react";

const CartPage = () => {
  return (
    <div className="p-4 pb-16 flex flex-col items-center justify-center w-full">
      <div className="max-w-screen-xl w-full space-y-6 sm:space-y-10">
        {/* TITLE  */}
        <h1 className="text-start font-medium xs:text-xl sm:text-2xl">
          Carrito
          <span className="font-light text-xs sm:text-base pl-1.5">2 ITEMS</span>
        </h1>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-4 md:gap-8">
          {/* CART PRODUCTS */}
          <div className="w-full flex flex-col divide-y-2 overflow-y-scroll max-h-40 xs:max-h-52 sm:max-h-80 scrollbar-none">
            <CartProductCard/>
            <CartProductCard/>
            <CartProductCard/>
            <CartProductCard/>
          </div>

          {/* INFORMATION CART */}
          <div className="w-full md:w-auto">
            <CartInformation/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
