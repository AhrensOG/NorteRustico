import React from "react";

const ProfileDataForm = ({ setEditData }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          type="text"
          className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
          placeholder="Email"
        />
        <input
          type="text"
          className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
          placeholder="Nombre"
        />
        <input
          type="text"
          className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
          placeholder="Apellido"
        />
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <input
            type="text"
            className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
            placeholder="Género"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
            placeholder="DNI"
          />
          <input
            type="text"
            className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
            placeholder="Teléfono"
          />
        </div>
        <input
          type="text"
          className="border w-full py-1 px-2 rounded-md outline-[#CA995D]"
          placeholder="Dirección"
        />
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button className="border w-full py-1 px-2 rounded-md bg-blue-500 text-white font-medium">Guardar</button>
          <button className="border border-black w-full py-1 px-2 rounded-md font-medium" onClick={() => setEditData(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDataForm;

// defaultValue={'hectorezequielv@hotmail.com'} disabled
