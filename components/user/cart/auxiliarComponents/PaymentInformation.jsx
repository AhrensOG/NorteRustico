import { Context } from "@/app/context/GlobalContext";
import React, { useContext } from "react";

const PaymentInformation = () => {
  const { state, dispatch } = useContext(Context);

  const handlePayment = () => {
    console.log(state);
  };

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
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>Envío</span>
              <span>
                ${" "}
                {state.payment?.deliveryCost?.tarifaConIva?.total
                  ? state.payment.deliveryCost.tarifaConIva.total
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
                  ? state.payment?.deliveryCost?.tarifaConIva?.total
                    ? Number(state.discountedCartPrice) +
                      Number(state.payment.deliveryCost.tarifaConIva.total)
                    : Number(state.discountedCartPrice)
                  : state.cartPrice
                  ? state.payment?.deliveryCost?.tarifaConIva?.total
                    ? Number(state.cartPrice) +
                      Number(state.payment.deliveryCost.tarifaConIva.total)
                    : Number(state.cartPrice)
                  : 0}
              </span>
            </div>
            <button
              onClick={() => handlePayment()}
              className="w-full bg-[#C9140F] py-1.5 px-2 text-white font-bold rounded text-sm xs:text-base sm:text-lg"
            >
              IR A PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
