import React, { useContext, useEffect, useState } from "react";
import PaymentForm from "./auxiliarComponents/PaymentForm";
import DeliveryOptions from "./auxiliarComponents/DeliveryOptions";
import PaymentInformation from "./auxiliarComponents/PaymentInformation";
import { deleteDeliveryCostInformation } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";

const Payment = ({ setShowPayment }) => {
  const { state, dispatch } = useContext(Context);
  const [showPersonalData, setShowPersonalData] = useState(true);
  const [showDeliveryCostAndPayment, setShowDeliveryCostAndPayment] =
    useState(false);

  const handleChangeSection = (value, SetValue) => {
    setShowPersonalData(false);
    setShowDeliveryCostAndPayment(false);

    return SetValue(value);
  };

  useEffect(() => {
    return () => deleteDeliveryCostInformation(dispatch);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center z-10">
      {/* BLACK SHADOW */}
      <div className="fixed bg-black/50 w-full h-full z-10"></div>
      {/* PAYMENT */}
      <div className="fixed max-w-screen-md max-h-[95vh] w-full h-full z-20 p-2">
        <div className=" w-full h-full bg-slate-100 rounded-md flex flex-col justify-center items-center gap-2">
          <div className="w-full text-center rounded rounded-b-none bg-[#C9140F] p-2 relative">
            <h1 className="text-lg font-bold text-white ">Detalles del Pago</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute top-[10px] right-2 text-white cursor-pointer"
              onClick={(e) => setShowPayment(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="flex-1 overflow-scroll scrollbar-none scroll-smooth space-y-4 p-2 flex flex-col justify-start items-center sm:hidden">
            {showPersonalData && (
              <PaymentForm
                setShowDeliveryCostAndPayment={setShowDeliveryCostAndPayment}
                handleChangeSection={handleChangeSection}
              />
            )}
            {showDeliveryCostAndPayment && <DeliveryOptions />}
            {showDeliveryCostAndPayment && <PaymentInformation />}
            {showDeliveryCostAndPayment && (
              <button
                onClick={() => handleChangeSection(true, setShowPersonalData)}
                className="text-[#C9140F] text-xs underline"
              >
                Paso Anterior
              </button>
            )}
          </div>
          <div className="hidden w-full sm:flex flex-1 p-2 flex-row flex-wrap flex-grow justify-evenly items-start overflow-y-auto">
            <PaymentForm
              setShowDeliveryCostAndPayment={setShowDeliveryCostAndPayment}
              handleChangeSection={handleChangeSection}
            />
            <div className="flex flex-col justify-start items-center gap-6">
              <DeliveryOptions />
              <PaymentInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
