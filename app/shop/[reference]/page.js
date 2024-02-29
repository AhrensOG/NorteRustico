"use client";
import { Context } from "@/app/context/GlobalContext";
import { getOneProduct, searchRelatedProducts } from "@/app/context/actions";
import ProductComments from "@/components/shop/ProductComments";
import ProductDetail from "@/components/shop/ProductDetail";
import RelationatedProducts from "@/components/shop/RelationatedProducts";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/components/Loader";
import { isUserLogged } from "@/app/context/actions/isUserLogged";

const ProductDetailPage = ({ params }) => {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    const getProduct = async () => {
      try {
        await getOneProduct(params.reference, dispatch);
      } catch (error) {
        return toast.error(
          "Ocurrio un error el solicitar el detalle del producto",
          { description: "Intenta nuevamente mas tarde" }
        );
      }
    };
    getProduct();

    return () => getOneProduct(false, dispatch);
  }, []);

  useEffect(() => {
    if (state.productDetail) {
      const getRelatedProducts = async () => {
        try {
          await searchRelatedProducts(state.productDetail.Categories, dispatch);
        } catch (error) {
          return toast.error(
            "Ocurrio un error el solicitar los productos relacionados"
          );
        }
      };
      getRelatedProducts();
    }
  }, [state.productDetail]);

  useEffect(() => {
    if (!state.user) {
      const getUser = async () => {
        await isUserLogged(dispatch);
      };
      getUser();
    }
  }, [state.user]);

  return (
    <div className="flex flex-row justify-center items-center h-full">
      {state.productDetail ? (
        <div className="p-4 md:p-6 max-w-screen-xl flex flex-col items-start justify-center gap-4 w-full">
          {/* Arrow to come back*/}
          <span>
            <Link href={"/"}>
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
            </Link>
          </span>

          <ProductDetail product={state.productDetail} />
          {state.searchedRelatedProducts ? (
            <RelationatedProducts products={state.searchedRelatedProducts} />
          ) : (
            <div className="flex flex-row justify-center items-center w-full my-40">
              <Loader size={40} color="#1D4ED8" />
            </div>
          )}
          <ProductComments />
        </div>
      ) : (
        <Loader size={60} color="#1D4ED8" />
      )}
    </div>
  );
};

export default ProductDetailPage;
