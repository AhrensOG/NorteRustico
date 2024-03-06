import React, { useState } from "react";
import ProfileOrderDropDownCard from "./ProfileOrderDropDownCard";
import Link from "next/link";
import { toast } from "sonner";

const ProfileOrderDropDown = ({ order }) => {
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(order.createdAt).toLocaleDateString("es-AR");

  const copyTrackingIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(order.trackingId);
      toast.info("Número de seguimiento copiado!");
    } catch (error) {
      toast.error("Error al copiar el número de seguimiento!");
    }
  };

  return (
    <div className="w-full">
      {/* Button to open dropdown */}
      <div
        className={`flex flex-row gap-1 justify-between items-center border-2 p-1.5 xs:p-2 sm:p-3 rounded-md cursor-pointer ${
          open && "rounded-b-none"
        }`}
        onClick={(e) => setOpen(!open)}
      >
        <div className="flex flex-row justify-start gap-1 w-full">
          <span className="text-xs font-medium text-[#523900] p-0.5 xs:text-sm sm:text-lg ">
            ID: {order.orderId}
          </span>
          <span className="text-xs font-medium text-green-700 p-0.5 xs:text-sm sm:text-lg ">
            {order.status === "Paid" && "Pagado"}
          </span>
        </div>
        <div className="flex flex-row justify-end items-center">
          <span className="text-xs font-medium text-[#523900] p-0.5 xs:text-sm sm:text-lg ">
            {formattedDate}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#523900]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* Dropdoown card */}
      {open && (
        <div
          className={`p-1.5 xs:p-2 sm:p-3 border border-t-0 rounded-t-none rounded-md`}
        >
          <div className="flex flex-row justify-center items-center p-1.5 xs:p-2 sm:p-3 relative">
            <div
              className={`absolute border-2 rounded-md w-full ${
                order.trackingId !== null ? "h-16" : "h-10"
              } h-16 top-0 flex flex-col justify-center items-center gap-1`}
            >
              <div className="flex flex-row justify-center items-center gap-">
                <span className="text-blue-700 text-xs xs:text-sm font-medium">
                  ID de Seguimiento: {order.trackingId || "En gestión"}
                </span>
                {order.trackingId !== null && (
                  <button onClick={copyTrackingIdToClipboard}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[18px] h-[18px] cursor-pointer stroke-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {order.trackingId !== null && (
                <Link href={'https://www.andreani.com/#!/personas'} target="_blank">
                  <span className="text-xs xs:text-sm text-red-700 underline underline-offset-2">Ir a Andreani</span>
                </Link>
              )}
            </div>
          </div>
          <div
            className={`${
              order.Products?.length > 1
                ? "overflow-y-scroll"
                : "justify-center items-center"
            } flex flex-col gap-2 max-h-52 scrollbar-thin scrollbar-thumb-[#CA995D] scrollbar-track-[#CA995D]/50 ${
              order.trackingId !== null ? "mt-16" : "mt-10"
            }`}
          >
            {order.Products?.length > 0 ? (
              order.Products.map((p) => (
                <ProfileOrderDropDownCard key={p.id} product={p} />
              ))
            ) : (
              <div className="text-black/50">Esta orden no tiene productos</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrderDropDown;
