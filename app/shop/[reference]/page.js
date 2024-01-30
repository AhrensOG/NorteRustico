"use client";
import ProductComments from "@/components/shop/ProductComments";
import ProductDetail from "@/components/shop/ProductDetail";
import RelationatedProducts from "@/components/shop/RelationatedProducts";
import React from "react";

const ProductDetailPage = ({ params }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="p-4 md:p-6 max-w-screen-xl flex flex-col items-start justify-center gap-4 w-full">
        {/* Arrow to come back*/}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </span>

        <ProductDetail />
        <RelationatedProducts />
        <ProductComments />
      </div>
    </div>
  );
};

export default ProductDetailPage;
