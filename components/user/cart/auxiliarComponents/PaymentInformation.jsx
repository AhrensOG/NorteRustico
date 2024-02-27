import { Context } from "@/app/context/GlobalContext";
import {
  addProductsToOrder,
  createOrder,
  createPayment,
} from "@/app/context/actions";
import Loader from "@/components/Loader";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentInformation = () => {
  const { state, dispatch } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);

  const handlePayment = async () => {
    if (!state.payment?.deliveryCost?.tarifaConIva?.total) {
      return toast.info("Recuerda que debes calcular el costo de envío!");
    }
    try {
      setLoader(true);
      const orderData = {
        ...state,
        cartTotalPrice: total,
      };
      const order = await createOrder(orderData, dispatch);
      const orderProductsData = {
        orderId: order.id,
        products: state.cart,
      };
      await addProductsToOrder(orderProductsData);
      const user = state?.user;
      const cart = state?.cart;
      const deliveryCost = state.payment?.deliveryCost?.tarifaConIva?.total;
      const init_point = await createPayment(
        user,
        cart,
        deliveryCost,
        order.id
      );
      if (init_point) {
        window.open(`${init_point}`, "_blank");
        toast.info("Vamos a redirigirte a la ventana de pago!");
      }
    } catch (error) {
      setLoader(false);
      return toast.error("Ocurrio un error al procesar la orden de compra", {
        description: "Intenta nuevamente mas tarde",
      });
    } finally {
      setLoader(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (state.discountedCartPrice) {
      total += Number(state.discountedCartPrice);
    } else if (state.cartPrice) {
      total += Number(state.cartPrice);
    }
    if (state.payment?.deliveryCost?.tarifaConIva?.total) {
      total += Number(state.payment.deliveryCost.tarifaConIva.total);
    }
    return setTotal(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [state]);

  return (
    <div className="flex flex-row justify-center items-center w-full sm:border-2 sm:rounded-md sm:shadow-black/20 sm:shadow-lg">
      <div className="w-full min-w-max xs:max-w-[450px] sm:max-w-[360px] md:w-[360px] flex flex-col justify-center items-center gap-8 sm:p-10">
        <h2 className="capitalize xs:text-lg sm:text-xl">Resumen del Pedido</h2>
        <div className="w-full space-y-8 divide-y divide-black/50">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>{state.cart ? state.cartItems : "Sin "} Productos</span>
              <span>$ {state.cartPrice ? state.cartPrice : 0}</span>
            </div>
            {state.discountedCartPrice !== state.cartPrice && (
              <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
                <span>Descuento</span>
                <span>
                  ${" "}
                  {state.discountedCartPrice
                    ? (state.cartPrice - state.discountedCartPrice).toFixed(2)
                    : 0}
                </span>
              </div>
            )}
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg">
              <span>Envío</span>
              <span>
                ${" "}
                {state.payment?.deliveryCost?.tarifaConIva?.total
                  ? state.payment.deliveryCost.tarifaConIva.total
                  : 0}
              </span>
            </div>
          </div>
          <div className="w-full pt-2 space-y-8">
            <div className="w-full flex flex-row justify-between items-center text-sm xs:text-base sm:text-lg uppercase font-medium">
              <span>Total</span>
              <span>$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => handlePayment()}
              className="w-full bg-black/95 py-1.5 px-2 text-white font-medium rounded text-sm xs:hidden"
            >
              {loader ? (
                <Loader size={30} color="white" />
              ) : (
                <span className="flex flex-row justify-center items-center gap-2">
                  <Image src={"/mp.png"} alt="mp" width={30} height={30} />
                  Pagar con Mercado Pago
                </span>
              )}
            </button>
            <button
              onClick={() => handlePayment()}
              className="w-full bg-black/95 py-1.5 px-2 text-white font-medium rounded hidden xs:block sm:hidden"
            >
              {loader ? (
                <Loader size={30} color="white" />
              ) : (
                <span className="flex flex-row justify-center items-center gap-2">
                  <Image src={"/mp.png"} alt="mp" width={30} height={30} />
                  Pagar con Mercado Pago
                </span>
              )}
            </button>
            <button
              onClick={() => handlePayment()}
              className="w-full bg-black/95 py-1.5 px-2 text-white font-medium rounded hidden sm:block sm:text-base"
            >
              {loader ? (
                <Loader size={30} color="white" />
              ) : (
                <span className="flex flex-row justify-center items-center gap-2">
                  <Image src={"/mp.png"} alt="mp" width={30} height={30} />
                  Pagar con Mercado Pago
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
