import React from "react";

const CartInformation = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full sm:border-2 sm:rounded-md sm:shadow-black/20 sm:shadow-lg">
      <div className="w-full min-w-max xs:max-w-[450px] sm:max-w-[360px] md:w-[360px] flex flex-col justify-center items-center gap-8 sm:p-10">
        <h2 className="capitalize xs:text-lg sm:text-xl">Resumen del Pedido</h2>
        <div className="w-full space-y-8 divide-y divide-black/50">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>2 Productos</span>
              <span>$ 3500</span>
            </div>
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>Descuento</span>
              <span>$ 500</span>
            </div>
          </div>
          <div className="w-full pt-2 space-y-8">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg uppercase font-medium">
              <span>Total</span>
              <span>$ 3000</span>
            </div>
            <button className="w-full bg-[#C9140F] py-1.5 px-2 text-white font-bold rounded text-sm xs:text-base sm:text-lg">
              IR A PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInformation;
