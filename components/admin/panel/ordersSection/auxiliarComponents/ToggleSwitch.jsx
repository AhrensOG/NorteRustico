import React from "react";

const ToggleSwitch = ({ delivered, setDelivered }) => {
  return (
    <div
      className={`absolute right-2 top-2 cursor-pointer`}
      onClick={() => setDelivered(!delivered)}
    >
      <div
        className={`absolute right-0 border ${
          !delivered ? "w-48" : "w-32"
        } h-6 rounded-full ${
          !delivered
            ? "border-[#1D4ED8] text-[#1D4ED8]"
            : "border-green-800 text-green-800"
        } duration-300 px-3`}
      >
        <div
          className={`absolute right-2 ${
            !delivered ? "text-current" : "hidden"
          } duration-200 whitespace-nowrap`}
        >
          Pendiente de entrega
        </div>
        <span
          className={`absolute top-0 ${
            !delivered ? "hidden" : "text-current"
          } duration-200 whitespace-nowrap break-all`}
        >
          Entregado
        </span>
      </div>

      <div
        className={`absolute right-[172px] top-1 w-4 h-4 rounded-full ${
          !delivered
            ? "translate-x-0 bg-[#1D4ED8]"
            : "translate-x-[168px] bg-green-800"
        }   transform transition duration-500`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
