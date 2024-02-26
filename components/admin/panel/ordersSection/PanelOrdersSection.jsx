import React, { useContext, useEffect, useState } from "react";
import Header from "../auxiliarComponents/Header";
import OrderDropDown from "./auxiliarComponents/OrderDropDown";
import { Context } from "@/app/context/GlobalContext";
import { getAllOrders } from "@/app/context/actions";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const PanelOrdersSection = () => {
  const { state, dispatch } = useContext(Context);

  const [auto, setAuto] = useState(false);

  useEffect(() => {
    let intervalID;
    const autoRefresh = async () => {
      if (auto) {
        intervalID = setInterval(() => {
          getAllOrders(dispatch);
        }, 120000);
      } else {
        clearInterval(intervalID);
      }
    };
    autoRefresh();
    return () => clearInterval(intervalID);
  }, [auto]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
        <Header title="Pedidos" />

        <div className="flex flex-col w-full h-full bg-white rounded-md px-4 py-4 gap-4">
          <div className="flex flex-row justify-end items-center gap-4">
            <div
              className="p-1.5 px-4 rounded-md bg-[#1D4ED8] text-white font-semibold cursor-pointer"
              onClick={() => setAuto(!auto)}
            >
              <p>
                {auto ? (
                  <span className="flex flex-row justify-center items-center gap-4">
                    Stop
                    <Loader size={14} color="white" />
                  </span>
                ) : (
                  "AutoRefresh"
                )}
              </p>
            </div>
            <div
              className="bg-[#1D4ED8] p-1.5 px-4 rounded-md text-white font-semibold cursor-pointer"
              onClick={() => {
                getAllOrders(dispatch);
                toast.success("Actualizado!", {
                  duration: 3000,
                  position: "top-center",
                });
              }}
            >
              Refresh
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 overflow-y-scroll h-[67.5vh] scrollbar-none p-2 border shadow-black/20 shadow-inner rounded-md">
            {state?.orders?.map((o) => {
              return (
                o.status !== "Shopping" && o.status !== "Pending" && (
                  <OrderDropDown key={o.id} order={o} />
                )
              );
            })}
            {
              state?.orders?.length === 0 && <span className="w-full h-full flex justify-center items-center text-xl font-medium text-black/50">Aun no hay ordenes de compra!</span> 
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelOrdersSection;
