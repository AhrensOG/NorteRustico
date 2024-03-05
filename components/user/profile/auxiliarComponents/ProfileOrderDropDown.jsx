import React, { useState } from "react";
import ProfileOrderDropDownCard from "./ProfileOrderDropDownCard";

const ProfileOrderDropDown = ({ order }) => {
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(order.createdAt).toLocaleDateString("es-AR");
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
        <div className={` ${ order.Products?.length > 1 ? 'overflow-y-scroll' : 'justify-center items-center' } p-1.5 xs:p-2 sm:p-3 border border-t-0 rounded-t-none rounded-md flex flex-col gap-2 max-h-52 scrollbar-thin scrollbar-thumb-[#CA995D] scrollbar-track-[#CA995D]/50`}>
          {order.Products?.length > 0 ? (
            order.Products.map((p) => (
              <ProfileOrderDropDownCard key={p.id} product={p} />
            ))
          ) : (
            <div className="text-black/50">Esta orden no tiene productos</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileOrderDropDown;
