import Image from "next/image";
import React from "react";

const ProfileOrderDropDownCard = ({ product }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full border-2 rounded-md p-1 xs:p-2 sm:p-3">
      <div className="flex flex-col justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <div className="w-12 h-12 relative">
          <Image
            src={product.ProductImages[0]?.url || ""}
            alt="ProductImage"
            className="rounded-full object-cover object-center transition-opacity opacity-0 duration-500"
            width={48}
            height={48}
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            priority={true}
            quality={100}
          />
        </div>
        <span>{product.OrderProducts?.name}</span>
      </div>
      <div className="flex flex-col max-w-28 justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <span>Precio</span>
        <span>$ {product.OrderProducts?.price}</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <span>Unidades</span>
        <span>{product.OrderProducts?.items}</span>
      </div>
    </div>
  );
};

export default ProfileOrderDropDownCard;
