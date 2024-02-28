import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Context } from "@/app/context/GlobalContext";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDeliveryCost, savePaymentInformation, updateUser } from "@/app/context/actions";

const PaymentForm = ({
  setShowDeliveryCostAndPayment,
  handleChangeSection,
}) => {
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
    if (
      values.name === "" ||
      values.surname === "" ||
      values.street === "" ||
      values.streetNumber === "" ||
      values.flat === "" ||
      values.apartament === "" ||
      values.postalCode === "" ||
      values.country === "" ||
      values.province === "" ||
      values.city === "" ||
      values.dni === "" ||
      values.phone === "" ||
      !values.name ||
      !values.surname ||
      !values.street ||
      !values.streetNumber ||
      !values.flat ||
      !values.apartament ||
      !values.postalCode ||
      !values.country ||
      !values.province ||
      !values.city ||
      !values.dni ||
      !values.phone
    ) {
      return toast.info("Recuerda que debes completar todos los campos!");
    }
    try {
      setLoader(true);
      const data = {};
      await savePaymentInformation(values, dispatch);
      if (!state?.user?.street) {
        data.street = values.street;
      }
      if (!state?.user?.streetNumber) {
        data.streetNumber = values.streetNumber;
      }
      if (!state?.user?.flat) {
        data.flat = values.flat;
      }
      if (!state?.user?.apartament) {
        data.apartament = values.apartament;
      }
      if (!state?.user?.postalCode) {
        data.postalCode = values.postalCode;
      }
      if (!state?.user?.country) {
        data.country = values.country;
      }
      if (!state?.user?.province) {
        data.province = values.province;
      }
      if (!state?.user?.city) {
        data.city = values.city;
      }
      if (!state?.user?.dni) {
        data.dni = values.dni;
      }
      if (!state?.user?.phone) {
        data.phone = values.phone;
      }
      if (Object.keys(data).length > 0) {
        data.id = state?.user?.id;
        await updateUser(data, dispatch);
      }

      try {
        if (state.payment?.totalWeight && state.payment?.totalVolume && values.postalCode) {
          await getDeliveryCost(state.payment, values.postalCode, dispatch);
        }
      } catch (error) {
        return toast.error("Ocurrió un error al intentar cotizar el envío", {
          description: "Verifica el Codigo Postal",
        });
      }

      toast.success("Informacion actualizada exitosamente!");
      return handleChangeSection(true, setShowDeliveryCostAndPayment);
    } catch (error) {
      setLoader(false);
      return toast.error(
        "Ocurrió un error al intentar guardar tu informacion",
        {
          description: "Intenta nuevamente mas tarde.",
        }
      );
    } finally {
      setLoader(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="w-full sm:w-auto space-y-4">
      <h2 className="text-lg">Datos Personales</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center gap-2 max-w-80"
      >
        <input
          type="text"
          name="email"
          value={formik.values.email || ""}
          onChange={formik.handleChange}
          className="border w-full py-1 px-2 rounded-md outline-blue-700 text-black/50"
          placeholder="Email"
          disabled
        />
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Nombre</label>
            <input
              type="text"
              name="name"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Nombre"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Apellido</label>
            <input
              type="text"
              name="surname"
              value={formik.values.surname || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">DNI</label>
            <input
              type="text"
              name="dni"
              value={formik.values.dni || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="DNI"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Teléfono"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Pais</label>
            <input
              type="text"
              name="country"
              value={formik.values.country || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="País"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Provincia</label>
            <input
              type="text"
              name="province"
              value={formik.values.province || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Provincia"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Calle</label>
            <input
              type="text"
              name="street"
              value={formik.values.street || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Calle"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Ciudad</label>
            <input
              type="text"
              name="city"
              value={formik.values.city || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Ciudad"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">
              Altura de Calle
            </label>
            <input
              type="text"
              name="streetNumber"
              value={formik.values.streetNumber || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Número de calle"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Codigo Postal</label>
            <input
              type="text"
              name="postalCode"
              value={formik.values.postalCode || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Código Postal"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Piso</label>
            <input
              type="text"
              name="flat"
              value={formik.values.flat || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Piso"
            />
          </div>
          <div className="w-full">
            <label className="text-xs px-1 text-black/50">Departamento</label>
            <input
              type="text"
              name="apartament"
              value={formik.values.apartament || ""}
              onChange={formik.handleChange}
              className="border w-full py-1 px-2 rounded-md outline-blue-700"
              placeholder="Departamento"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button
            type="submit"
            className="sm:hidden border w-full py-1 px-2 rounded-md bg-[#C9140F] text-white font-medium"
          >
            {loader ? <Loader size={24} /> : "Siguiente Paso"}
          </button>
          <button
            type="submit"
            className="hidden sm:block border w-full py-1 px-2 rounded-md bg-[#C9140F] text-white font-medium"
          >
            {loader ? <Loader size={24} /> : "Guardar Información"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
