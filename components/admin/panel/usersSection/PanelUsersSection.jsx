import React from "react";
import Header from "../auxiliarComponents/Header";
import PanelUsersSearchbar from "./auxiliarComponents/PanelUsersSearchbar";

const PanelUsersSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
        <Header title="Usuarios" />

        <div className="flex flex-col w-full h-full bg-white rounded-md px-4 py-4">
          {/* header options */}
          <div className="flex flex-col sm:flex-row justify-start items-center gap-2 z-0">
            <PanelUsersSearchbar />
          </div>

          {/* Listed Products */}
          {/* {state?.searchedProducts?.length > 0 ? (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PanelUsersSection;
