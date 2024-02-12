import React, { useContext, useEffect, useState } from "react";
import PanelSearchbar from "./auxiliarComponents/PanelSearchbar";
import PanelProductsListCard from "./auxiliarComponents/PanelProductsListCard";
import ProductVisualization from "./auxiliarComponents/ProductVisualization";
import ProductForm from "./auxiliarComponents/ProductForm";
import Header from "../auxiliarComponents/Header";
import { Context } from "@/app/context/GlobalContext";

const PanelProductsSection = () => {
  const { state } = useContext(Context);
  const [showDetail, setShowDetail] = useState(false);
  const [createProduct, setCrateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {}, [state.products]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
        <Header title="Productos" />

        <div className="flex flex-col w-full h-full bg-white rounded-md px-4 py-4">
          {/* header options */}
          <div className="flex flex-row justify-start items-center gap-2">
            <button
              className="bg-blue-700 p-1.5 font-medium text-white rounded-md flex flex-row justify-start items-center gap-1.5 w-full max-w-48 border border-blue-700"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Añadir Producto
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default PanelProductsSection;
