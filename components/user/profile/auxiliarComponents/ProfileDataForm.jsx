import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Context } from "@/app/context/GlobalContext";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { updateUser } from "@/app/context/actions";

const ProfileDataForm = ({ setEditData }) => {
  const { state, dispatch } = useContext(Context);
  const [loader, setLoader] = useState(false);

  const initialValues = state.user || {
    name: "",
    surname: "",
    street: "",
    streetNumber: "",
    flat: "",
    apartament: "",
    postalCode: "",
    country: "",
    province: "",
    city: "",
    dni: "",
    phone: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      await updateUser(values, dispatch)
      return toast.success("Informacion actualizada exitosamente!");
    } catch (error) {
      setLoader(false);
      return toast.error(
        "Ocurrió un error al intentar actualizar tu informacion",
        {
          description: "Intenta nuevamente mas tarde.",
        }
      );
    } finally {
      setLoader(false);
      setEditData(false)
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        <input
          type="text"
          name="email"
          value={formik.values.email || ""}
          onChange={formik.handleChange}
          className="border w-full py-1 px-2 rounded-md outline-blue-700 text-black/60"
          placeholder="Email"
          disabled
        />
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="name"
            value={formik.values.name || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Nombre"
          />
          <input
            type="text"
            name="surname"
            value={formik.values.surname || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Apellido"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="dni"
            value={formik.values.dni || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="DNI"
          />
          <input
            type="text"
            name="phone"
            value={formik.values.phone || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Teléfono"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="country"
            value={formik.values.country || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="País"
          />
          <input
            type="text"
            name="province"
            value={formik.values.province || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Provincia"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="street"
            value={formik.values.street || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Calle"
          />
          <input
            type="text"
            name="city"
            value={formik.values.city || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Ciudad"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="streetNumber"
            value={formik.values.streetNumber || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Número de calle"
          />
          <input
            type="text"
            name="postalCode"
            value={formik.values.postalCode || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Código Postal"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="flat"
            value={formik.values.flat || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Piso"
          />
          <input
            type="text"
            name="apartament"
            value={formik.values.apartament || ""}
            onChange={formik.handleChange}
            className="border w-full py-1 px-2 rounded-md outline-blue-700"
            placeholder="Departamento"
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button
            type="submit"
            className="border w-full py-1 px-2 rounded-md bg-blue-700 text-white font-medium"
          >
            {loader ? <Loader size={24} /> : 'Guardar'}
          </button>
          <button
            type="button"
            className="border border-black w-full py-1 px-2 rounded-md font-medium"
            onClick={() => setEditData(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDataForm;
