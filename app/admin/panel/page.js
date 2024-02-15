"use client";
import { Context } from "@/app/context/GlobalContext";
import { getAllCategories, getAllProducts, getAllTags } from "@/app/context/actions";
import PanelSidebar from "@/components/admin/panel/PanelSidebar";
import PanelTagsSection from "@/components/admin/panel/TagsSection/PanelTagsSection";
import PanelCategoriesSection from "@/components/admin/panel/categoriesSection/PanelCategoriesSection";
import PanelProductsSection from "@/components/admin/panel/productsSection/PanelProductsSection";
import PanelUsersSection from "@/components/admin/panel/usersSection/PanelUsersSection";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const PanelPage = () => {
  const { dispatch } = useContext(Context)
  const [showProducts, setShowProducts] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
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
      try {
        await getAllProducts(dispatch);
      } catch (error) {
        return toast.error('Ocurrio un error al lisar los productos.', { description: 'Intenta nuevamente mas tarde.' })
      }
      try {
        await getAllCategories(dispatch);
      } catch (error) {
        return toast.error('Ocurrio un error al lisar las categorias.', { description: 'Intenta nuevamente mas tarde.' })
      }
      try {
        await getAllTags(dispatch);
      } catch (error) {
        return toast.error('Ocurrio un error al lisar las etiquetas.', { description: 'Intenta nuevamente mas tarde.' })
      }
    };
    getData();
  }, []);  

  return (
    <div className="flex flex-row w-full h-full bg-slate-200 relative">
      <PanelSidebar
        showProducts={showProducts}
        showCategories={showCategories}
        showTags={showTags}
        showUsers={showUsers}
        showOrders={showOrders}
        showDelivery={showDelivery}

        setShowProducts={setShowProducts}
        setShowCategories={setShowCategories}
        setShowTags={setShowTags}
        setShowUsers={setShowUsers}
        setShowOrders={setShowOrders}
        setShowDelivery={setShowDelivery}
        handleChangeSection={handleChangeSection}
      />
      {
        showProducts && <PanelProductsSection />
      }
      {
        showCategories && <PanelCategoriesSection setShowCategories={setShowCategories}/>
      }
      {
        showTags && <PanelTagsSection setShowTags={setShowTags}/>
      }
      {
        showUsers && <PanelUsersSection />
      }
    </div>
  );
};

export default PanelPage;
