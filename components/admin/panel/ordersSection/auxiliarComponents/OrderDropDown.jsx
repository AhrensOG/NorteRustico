import { Context } from "@/app/context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import ToggleSwitch from "./ToggleSwitch";
import ProductOrderCard from "./ProductOrderCard";
import { getAllOrders, updateOrder } from "@/app/context/actions";
import { useFormik } from "formik";

const OrderDropDown = ({ order }) => {
  const { state, dispatch } = useContext(Context);
  const dateObj = new Date(order.createdAt);
  const date = dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const initialValues = {
    trackingId: order?.trackingId || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = {
        orderId: order?.id,
        trackingId: values.trackingId,
      };
      try {
        await updateOrder(data);
        await getAllOrders(dispatch);
        return toast.success('Añadiste el codigo de seguimiento!')
      } catch (error) {
        return toast.error("Ocurrio un error al actualizar la orden.", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
    },
  });

  const handleDelivered = async () => {
    const data = {
      orderId: order?.id,
      delivered: !order?.delivered,
    };
    try {
      await updateOrder(data);
      await getAllOrders(dispatch);
    } catch (error) {
      return toast.error("Ocurrio un error al actualizar la orden.", {
        description: "Intenta nuevamente mas tarde.",
      });
    }
  };

  const handleCancelOrderAlert = async () => {
    try {
      const data = {
        orderId: order?.id,
        status: "Cancel",
      };
      await updateOrder(data);
      await getAllOrders(dispatch);
      return toast.success(`La orden ha sido cancelada!`);
    } catch (error) {
      return toast.error("Ocurrio un error al cancelar la orden.", {
        description: "Intenta nuevamente mas tarde.",
      });
    }
  };

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div className="">
      <div
        className={`w-full bg-white border border-[#1D4ED8] p-3 ${
          openDropDown ? "rounded-t-lg" : "rounded-lg"
        } flex flex-row cursor-pointer`}
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <p className="col-span-2 font-semibold text-[#1D4ED8]">
            Orden: {order.orderId ? order.orderId : "-"}
          </p>
          <p className="col-span-2 font-semibold text-[#1D4ED8]">
            Estado:
            <span
              className={`${
                order.status === "Paid"
                  ? "text-green-800"
                  : order.status === "Pending"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {" "}
              {order.status === "Paid"
                ? "Pagado"
                : order.status === "Pending"
                ? "Pendiente"
                : "Cancelado"}{" "}
            </span>
          </p>
          <p className="col-span-3 font-semibold text-[#1D4ED8]">
            Usuario: {order.User.email}
          </p>
          <p className="col-span-1 font-semibold text-[#1D4ED8]">
            Entregado: {order.delivered ? "SI" : "NO"}
          </p>
          <p className="col-span-1 font-semibold text-[#1D4ED8]">{date}</p>
        </div>
      </div>
      {openDropDown ? (
        <div className="flex flex-col justify-between items-center gap-4 w-full p-3 border-b border-x rounded-b-lg border-[#1D4ED8] relative">
          {order.status !== "Cancel" && (
            <ToggleSwitch
              delivered={order?.delivered}
              setDelivered={handleDelivered}
            />
          )}
          <div className="flex flex-row justify-between items-start w-full gap-2">
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-[#1D4ED8]">
                Datos del Cliente
              </span>
              <span className="text-[#1D4ED8]">
                Nombre: {`${order.User.name} ${order.User.surname}`}
              </span>
              <span className="text-[#1D4ED8]">
                Teléfono: {order.User.phone}
              </span>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-[#1D4ED8]">
                Datos de contacto
              </span>
              <span className="text-[#1D4ED8]">
                Nombre: {`${order.name} ${order.surname}`}
              </span>
              <span className="text-[#1D4ED8]">Teléfono: {order.phone}</span>
              <span className="text-[#1D4ED8]">DNI: {order.dni}</span>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-[#1D4ED8]">Datos de envío</span>
              <span className="text-[#1D4ED8]">País: {order.country}</span>
              <span className="text-[#1D4ED8]">
                Provincia: {order.province}
              </span>
              <span className="text-[#1D4ED8]">Ciudad: {order.city}</span>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-transparent">''</span>
              <span className="text-[#1D4ED8]">
                Codigo Postal: {order.postalCode}
              </span>
              <span className="text-[#1D4ED8]">
                Calle: {`${order.street} ${order.streetNumber}`}
              </span>
              <span className="text-[#1D4ED8]">
                Piso / Depto: {`${order.flat} ${order.apartament}`}
              </span>
            </div>
          </div>
          {order.status !== "Cancel" && (
            <div className="flex flex-row w-full justify-start items-end gap-2">
              <div>
                <span className="text-xs font-medium text-[#1D4ED8]">
                  ID de Seguimiento
                </span>
                <div>
                  <input
                    type="text"
                    name="trackingId"
                    onChange={formik.handleChange}
                    value={formik.values.trackingId}
                    className="border border-[#1D4ED8] p-0.5 px-2 rounded-md rounded-r-none max-w-36 text-[#1D4ED8] font-medium outline-none"
                  />
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="rounded-l-none border border-l-0 border-[#1D4ED8] p-0.5 px-2 rounded-md text-[#1D4ED8] font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  toast.info("Cuidado! Estas por cancelar la orden!", {
                    action: {
                      label: "Confirmar",
                      onClick: handleCancelOrderAlert,
                    },
                  })
                }
                className="border border-[#C9140F] p-0.5 px-2 rounded-md text-[#C9140F] font-medium"
              >
                Cancelar orden
              </button>
            </div>
          )}
          <div className="flex flex-col w-full gap-1 items-center relative">
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-bold text-[#1D4ED8]">
                Productos / Total: $ {Number(order.totalPrice).toFixed(2)}
              </span>
              <span className="font-bold text-[#1D4ED8]">
                Precio del carrito: $ {Number(order.cartPrice).toFixed(2)} / OFF ${" "}
                {Number(order.discountedCartPrice).toFixed(2)}
              </span>
              <span className="font-bold text-[#1D4ED8]">
                Costo de envío: $ {Number(order.deliveryCost).toFixed(2)}
              </span>
            </div>
            <div
              className={`flex flex-col gap-2 w-full max-h-[85px]" overflow-y-scroll scrollbar-none border border-[#1D4ED8] p-2 rounded-lg shadow-black/20 shadow-inner`}
            >
              {order.Products.map((p) => {
                return <ProductOrderCard key={p.id} product={p} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default OrderDropDown;
