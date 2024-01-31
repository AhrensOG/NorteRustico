import React from "react";

const ProfileDataSection = () => {
  return (
    <div className="flex flex-row flex-wrap  justify-start items-start gap-4 md:border-2 rounded-md rounded-tl-none p-2">
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Mis Datos</span>
        <span className="text-black/70 md:text-lg">Hector Vallejos</span>
        <span className="text-black/70 md:text-lg">1995-04-19</span>
        <span className="text-black/70 md:text-lg">Masculino</span>
        <span className="text-black/70 md:text-lg">40987228</span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Correo Electrónico</span>
        <span className="text-black/70 md:text-lg">
          hectorezequielv@hotmail.com
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Dirección</span>
        <span className="text-black/70 md:text-lg">
          {" "}
          P. Sherman, calle wallaby 42 Sydney
        </span>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <span className="font-bold md:text-lg">Codigo Postal</span>
        <span className="text-black/70 md:text-lg">3600</span>
      </div>
    </div>
  );
};

export default ProfileDataSection;
