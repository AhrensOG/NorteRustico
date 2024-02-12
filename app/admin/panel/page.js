"use client";
import { Context } from "@/app/context/GlobalContext";
import { getAllCategories, getAllProducts, getAllTags } from "@/app/context/actions";
import PanelSidebar from "@/components/admin/panel/PanelSidebar";
import PanelProductsSection from "@/components/admin/panel/productsSection/PanelProductsSection";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { dispatch } = useContext(Context)
  const [showProducts, setShowProducts] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const handleChangeSection = (value, setter) => {
    setShowProducts(false);
    setShowUsers(false);
    setShowOrders(false);
    setShowDelivery(false);

    setter(value);
  };

  useEffect(() => {
    const getData = async () => {
      await getAllProducts(dispatch);
      await getAllCategories(dispatch);
      await getAllTags(dispatch);
    };
    getData();
  }, []);  

  return (
    <div className="flex flex-row w-full h-full bg-slate-200 relative">
      <PanelSidebar
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        showUsers={showUsers}
        setShowUsers={setShowUsers}
        showOrders={showOrders}
        setShowOrders={setShowOrders}
        showDelivery={showDelivery}
        setShowDelivery={setShowDelivery}
        handleChangeSection={handleChangeSection}
      />
      <PanelProductsSection />
    </div>
  );
};

export default page;
