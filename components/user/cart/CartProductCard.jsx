import React from "react";

const CartProductCard = () => {
  return (
    <div className="w-full py-2">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-start items-center gap-2">
          <img
            src="/Product.png"
            alt="ProductImage"
            className="w-16 h-16 xs:w-20 xs:h-20 rounded"
          />
          <div className="space-y-1">
            <span className="font-medium xs:text-lg">Bolso QOM</span>
            <div className="text-sm xs:text-base space-x-4">
              <span className="text-blue-500">Editar</span>
              <span className="text-[#C9140F]">Remover</span>
            </div>
          </div>
        </div>
        <span className="xs:text-lg">$ 1500</span>
      </div>
    </div>
  );
};

export default CartProductCard;
