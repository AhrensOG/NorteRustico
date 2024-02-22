"use client";
import { Context } from "@/app/context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartInformation = ({ setShowPayment }) => {
  const { state, dispatch } = useContext(Context);

  const handleShowPayment = () => {
    if(!state.cart || state.cart?.length === 0) {
      return toast.info('Tu carrito esta vacío. Visita la tienda!')
    }
    setShowPayment(true);
  } 

  return (
    <div className="flex flex-row justify-center items-center w-full sm:border-2 sm:rounded-md sm:shadow-black/20 sm:shadow-lg">
      <div className="w-full min-w-max xs:max-w-[450px] sm:max-w-[360px] md:w-[360px] flex flex-col justify-center items-center gap-8 sm:p-10">
        <h2 className="capitalize xs:text-lg sm:text-xl">Resumen del Pedido</h2>
        <div className="w-full space-y-8 divide-y divide-black/50">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>{state.cart ? state.cartItems : "Sin "} Productos</span>
              <span>$ {state.cartPrice ? state.cartPrice : 0}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>Descuento</span>
              <span>
                ${" "}
                {state.discountedCartPrice
                  ? state.cartPrice - state.discountedCartPrice
                  : 0}
              </span>
            </div>
          </div>
          <div className="w-full pt-2 space-y-8">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg uppercase font-medium">
              <span>Total</span>
              <span>
                ${" "}
                {state.discountedCartPrice
                  ? state.discountedCartPrice
                  : state.cartPrice
                  ? state.cartPrice
                  : 0}
              </span>
            </div>
            <button onClick={() => handleShowPayment()} className="w-full bg-[#C9140F] py-1.5 px-2 text-white font-bold rounded text-sm xs:text-base sm:text-lg">
              IR A PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInformation;
