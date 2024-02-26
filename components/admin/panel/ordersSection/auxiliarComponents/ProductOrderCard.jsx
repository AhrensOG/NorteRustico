import React, { useState } from "react";

const ProductOrderCard = ({ product }) => {
  const [alert, setAlert] = useState(false);
  return (
    <div className="border border-[#1D4ED8] p-1 px-2 rounded-lg">
      <div className={`grid ${product.deletedAt ? 'grid-cols-[4fr_1fr_1fr_1.1fr_20px]' : 'grid-cols-[4fr_1fr_1fr_1.25fr]'} relative`}>
        <span className="text-[#1D4ED8] text-sm">
          Producto: {product.OrderProducts?.name}
        </span>
        <span className="text-[#1D4ED8] text-sm">
          Cantidad: {product.OrderProducts?.items}
        </span>
        <span className="text-[#1D4ED8] text-sm">Precio: ${Number(product.OrderProducts?.price).toLocaleString()}</span>
        <span className="text-[#1D4ED8] text-sm">Descuento: {Number(product.OrderProducts?.discount).toLocaleString()}%</span>
        {product.deletedAt ? (
          <div className="realtive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-5 h-5 animate-pulse stroke-red-700 top-[45px] right-5"
              onMouseEnter={() => setAlert(!alert)}
              onMouseLeave={() => setAlert(!alert)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
            {alert ? (
              <div className="absolute top-[1px] right-6 bg-red-700 border border-red-700 rounded-md text-[8px] p-[2px] px-1 text-white">
                Producto eliminado
                <div className="bg-red-700 absolute w-[6px] h-[6px] -right-[3px] top-[5px] rotate-45"></div>
              </div>
            ) : (
              <div className="hidden"></div>
            )}
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
};

export default ProductOrderCard;
