import { Context } from "@/app/context/GlobalContext";
import {
  addProductsToOrder,
  createOrder,
  createPayment,
  getOneOrder,
} from "@/app/context/actions";
import Loader from "@/components/Loader";
import MPButton from "@/components/payment/MPButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentInformation = ({ order }) => {
  const { state, dispatch } = useContext(Context);
  const [total, setTotal] = useState(0);
  // const [paymentInterval, setPaymentInterval] = useState(null);
  // const router = useRouter();

  // const handlePayment = async () => {
  //   // const interval = setInterval(() => checkOrderStatus(order.id), 10000);
  //   // setPaymentInterval(interval);
  // };

  // const checkOrderStatus = async (id) => {
  //   try {
  //     const orderStatus = await getOneOrder(id);
  //     if (orderStatus.status === "Paid") {
  //       clearInterval(paymentInterval);
  //       toast.success("¡Felicidades! Tu producto está en camino!", {
  //         description: "Verifica tu orden en tu perfil!",
  //         position: "top-center",
  //       });
  //       return router.push("/user/profile");
  //     }
  //   } catch (error) {
  //     return toast.error("Error al verificar el estado de la orden");
  //   }
  // };

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
    // return () => {
    //   if (paymentInterval) {
    //     clearInterval(paymentInterval);
    //   }
    // };
  }, [state]);

  return (
    <div className="flex flex-row justify-center items-center w-full sm:border-2 sm:rounded-md sm:shadow-black/20 sm:shadow-lg">
      <div className="w-full min-w-[280px] xs:max-w-[450px] sm:max-w-[360px] md:w-[360px] flex flex-col justify-center items-center gap-8 sm:p-10">
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
            <MPButton />
            {/* <div onClick={handlePayment}>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
