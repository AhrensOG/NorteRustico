import React, { useContext, useEffect, useState } from "react";
import PanelSearchbar from "./auxiliarComponents/PanelSearchbar";
import PanelProductsListCard from "./auxiliarComponents/PanelProductsListCard";
import ProductVisualization from "./auxiliarComponents/ProductVisualization";
import ProductForm from "./auxiliarComponents/ProductForm";
import Header from "../auxiliarComponents/Header";
import { Context } from "@/app/context/GlobalContext";
import UpdateAllProductsForm from "./auxiliarComponents/UpdateAllProductsForm";

const PanelProductsSection = () => {
  const { state } = useContext(Context);
  const [showDetail, setShowDetail] = useState(false);
  const [createProduct, setCrateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editAllProduct, setEditAllProduct] = useState(false);

  useEffect(() => {}, [state.products]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
        <Header title="Productos" />

        <div className="flex flex-col w-full h-full bg-white rounded-md px-4 py-4">
          {/* header options */}
          <div className="flex flex-col md:flex-row justify-start items-center gap-2">
            <div className="flex flex-col md:flex-row justify-start items-center w-full gap-2">
              <button
                className="bg-blue-700 p-1.5 font-medium text-white rounded-md flex flex-row justify-start items-center gap-1.5 min-w-[166px] w-full sm:max-w-[232px] md:max-w-44  border border-blue-700"
                onClick={(e) => setCrateProduct(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                Añadir Producto
              </button>
              <button
                className="bg-blue-700 p-1.5 font-medium text-white rounded-md flex flex-row justify-start items-center gap-1.5 min-w-[166px] w-full sm:max-w-[232px] md:max-w-44  border border-blue-700"
                onClick={(e) => setEditAllProduct(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Actualizar Stock
              </button>
            </div>
            <PanelSearchbar />
          </div>

          {/* Listed Products */}
          {state?.searchedProducts?.length > 0 ? (
            <div className="mt-4 overflow-y-scroll max-h-[430px] bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center scrollbar-none gap-4">
              {state.searchedProducts.map((p) => (
                <PanelProductsListCard
                  key={p.id}
                  setShowDetail={setShowDetail}
                  setEditProduct={setEditProduct}
                  data={p}
                />
              ))}
            </div>
          ) : state?.products?.length > 0 ? (
            <div className="mt-4 overflow-y-scroll max-h-[430px] bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center scrollbar-none gap-4">
              {state.products.map((p) => (
                <PanelProductsListCard
                  key={p.id}
                  setShowDetail={setShowDetail}
                  setEditProduct={setEditProduct}
                  data={p}
                />
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex flex-row justify-center items-center text-xl font-medium text-black/50">
              Cargando Productos...
            </div>
          )}
          {/* Product Previsualization */}
          {showDetail && (
            <ProductVisualization
              setShowDetail={setShowDetail}
              data={showDetail}
            />
          )}
          {editProduct ? (
            <ProductForm setEditProduct={setEditProduct} data={editProduct} />
          ) : (
            createProduct && <ProductForm setCrateProduct={setCrateProduct} />
          )}

          {editAllProduct === true && (
            <UpdateAllProductsForm
              setEditAllProducts={setEditAllProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelProductsSection;
