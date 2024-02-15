import { Context } from "@/app/context/GlobalContext";
import React, { useContext } from "react";

const ProfileDataSection = () => {
  const { state } = useContext(Context);

  return (
    <div className="flex flex-row w-full flex-wrap  justify-start items-start gap-4 md:border-2 rounded-md rounded-tl-none p-2">
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Mis Datos</span>
        <span className="text-black/70 md:text-lg">
          {state.user?.name && state.user?.surname
            ? `${state.user?.name} ${state.user?.surname}`
            : "-"}
        </span>
        <span className="text-black/70 md:text-lg">
          {state.user?.dni || "-"}
        </span>
        <span className="text-black/70 md:text-lg">
          {state.user?.phone || "-"}
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Correo Electrónico</span>
        <span className="text-black/70 md:text-lg">
          {state.user?.email || "-"}
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Ubicacion</span>
        <span className="text-black/70 md:text-lg">
          {`${state.user?.country || "-"}`}
        </span>
        <span className="text-black/70 md:text-lg">
          {`${state.user?.province || "-"}`}
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Direccion</span>
        <span className="text-black/70 md:text-lg">
          {`${state.user?.city || "-"}`}
        </span>
        <span className="text-black/70 md:text-lg">
          {`${state.user?.street || "-"} ${state.user?.streetNumber || ""}`}
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Codigo Postal</span>
        <span className="text-black/70 md:text-lg">
          {state.user?.postalCode || "-"}
        </span>
      </div>
    </div>
  );
};

export default ProfileDataSection;
