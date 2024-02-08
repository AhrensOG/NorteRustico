"use client";
import PanelSidebar from "@/components/admin/panel/PanelSidebar";
import PanelProductsSection from "@/components/admin/panel/productsSection/PanelProductsSection";
import React, { useState } from "react";

const page = () => {
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
