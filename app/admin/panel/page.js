"use client";
import { Context } from "@/app/context/GlobalContext";
import {
  getAllCategories,
  getAllOrders,
  getAllProducts,
  getAllTags,
  getOrganization,
} from "@/app/context/actions";
import PanelSidebar from "@/components/admin/panel/PanelSidebar";
import PanelTagsSection from "@/components/admin/panel/TagsSection/PanelTagsSection";
import PanelCategoriesSection from "@/components/admin/panel/categoriesSection/PanelCategoriesSection";
import PanelOrdersSection from "@/components/admin/panel/ordersSection/PanelOrdersSection";
import PanelOrganizationSection from "@/components/admin/panel/organizationSection/PanelOrganizationSection";
import PanelProductsSection from "@/components/admin/panel/productsSection/PanelProductsSection";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ADMIN_1 = process.env.NEXT_PUBLIC_ADMIN_1;
const ADMIN_2 = process.env.NEXT_PUBLIC_ADMIN_2;
const ADMIN_3 = process.env.NEXT_PUBLIC_ADMIN_3;

const PanelPage = () => {
  const { state, dispatch } = useContext(Context);
  const [showProducts, setShowProducts] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showOrganization, setShowOrganization] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const router = useRouter();

  const handleChangeSection = (value, setter) => {
    setShowProducts(false);
    setShowOrganization(false);
    setShowOrders(false);
    setShowDelivery(false);

    setter(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await getAllProducts(dispatch);
      } catch (error) {
        return toast.error("Ocurrio un error al lisar los productos.", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
      try {
        await getAllCategories(dispatch);
      } catch (error) {
        return toast.error("Ocurrio un error al lisar las categorias.", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
      try {
        await getAllTags(dispatch);
      } catch (error) {
        return toast.error("Ocurrio un error al lisar las etiquetas.", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
      try {
        await getAllOrders(dispatch);
      } catch (error) {
        return toast.error("Ocurrio un error al lisar las ordenes.", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
      try {
        await getOrganization(dispatch);
      } catch (error) {
        return toast.error(
          "Ocurrio un error al lisar los datos de la organizacion.",
          {
            description: "Intenta nuevamente mas tarde.",
          }
        );
      }
    };
    getData();
  }, []);

  useEffect(() => {}, [state.user]);

  if (state.user === undefined) {
    return (
      <div className="h-screen w-screen flex flex-row justify-center items-center">
        <span className="text-6xl text-blue-700 font-medium">
          Checking Permissions
        </span>
      </div>
    );
  }

  if (
    state.user?.id === ADMIN_1 ||
    state.user?.id === ADMIN_2 ||
    state.user?.id === ADMIN_3
  ) {
    return (
      <div className="flex flex-row w-full h-full bg-slate-200 relative">
        <PanelSidebar
          showProducts={showProducts}
          showCategories={showCategories}
          showTags={showTags}
          showOrganization={showOrganization}
          showOrders={showOrders}
          showDelivery={showDelivery}
          setShowProducts={setShowProducts}
          setShowCategories={setShowCategories}
          setShowTags={setShowTags}
          setShowOrganization={setShowOrganization}
          setShowOrders={setShowOrders}
          setShowDelivery={setShowDelivery}
          handleChangeSection={handleChangeSection}
        />
        {showProducts && <PanelProductsSection />}
        {showCategories && (
          <PanelCategoriesSection setShowCategories={setShowCategories} />
        )}
        {showTags && <PanelTagsSection setShowTags={setShowTags} />}
        {showOrders && <PanelOrdersSection />}
        {showOrganization && <PanelOrganizationSection />}
      </div>
    );
  } else {
    router.push("/admin/authenticate");
    return (
      <div className="h-screen w-screen flex flex-row justify-center items-center">
        <span className="text-6xl text-red-700 font-medium">Unauthorized</span>
      </div>
    );
  }
};

export default PanelPage;
