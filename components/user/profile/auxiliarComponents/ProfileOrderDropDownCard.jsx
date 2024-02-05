import React from "react";

const ProfileOrderDropDownCard = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full border-2 rounded-md p-1 xs:p-2 sm:p-3">
      <div className="flex flex-col justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <img
          src="/Product.png"
          alt="ProductImage"
          className="w-12 h-12 rounded-full"
        />
        <span>Bolso QOM</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <span>Precio</span>
        <span>$ 12.648</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xs font-medium xs:text-sm sm:text-lg">
        <span>Unidades</span>
        <span>2</span>
      </div>
    </div>
  );
};

export default ProfileOrderDropDownCard;
