import React from "react";
import SmallProductCard from "../product/SmallProductCard";

const RelationatedProducts = ({ products }) => {
  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="w-full py-10 max-w-screen-lg 2xl:max-w-screen-xl">
        <span className="text-xl font-medium">Productos Relacionados</span>
        <div className="overflow-x-scroll flex flex-row gap-6 md:gap-10 scrollbar-thumb-[#CA995D] scrollbar-thin scrollbar-track-[#CA995D]/50">
          {products.map((p) => (
            <SmallProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationatedProducts;
