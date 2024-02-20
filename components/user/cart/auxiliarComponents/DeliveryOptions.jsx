import React, { useContext, useState } from "react";
import AndreaniSVG from "./AndreaniSVG";
import Loader from "@/components/Loader";
import { Context } from "@/app/context/GlobalContext";
import { getDeliveryCost } from "@/app/context/actions";
import { toast } from "sonner";

const DeliveryOptions = () => {
  const [loader, setLoader] = useState(false);
  const { state, dispatch } = useContext(Context);

  const handleDeliveryCost = async () => {
    try {
      setLoader(true);
      if (state.payment?.totalWeight && state.payment?.totalVolume) {  
        return await getDeliveryCost(state.payment, dispatch)
      }
      return toast.info('Recuerda guardar tu información antes de calcular el envío!')
    } catch (error) {
      setLoader(false);
      return toast.error(
        "Ocurrió un error al intentar cotizar el envío",
        {
          description: "Verifica el Codigo Postal",
        }
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full sm:w-auto flex flex-col justify-center items-center space-y-4">
      <h2 id="deliveryTypes" className="text-lg">
        Metodos de Envio
      </h2>

      <div className="flex flex-row justify-center items-center w-full">
        <div className="flex-grow border-2 rounded-md rounded-r-none border-[#C9140F] border-r-0 p-1 flex flex-row justify-center items-center">
          <AndreaniSVG w={120} h={30} />
        </div>
        <div className="flex-grow rounded-md rounded-l-none border-[#C9140F] flex flex-row justify-center items-center bg-[#C9140F]">
          <button
            onClick={() => handleDeliveryCost()}
            className="p-[9px] min-w-32 text-white font-medium"
          >
            {loader ? <Loader size={24} color="white" /> : "Calcular Envío"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
