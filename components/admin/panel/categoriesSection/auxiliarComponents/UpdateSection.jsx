import { Context } from "@/app/context/GlobalContext";
import {
  getAllCategories,
  getAllProducts,
  updateCategory,
} from "@/app/context/actions";
import Loader from "@/components/Loader";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const UpdateSection = ({ category, setShowUpdateCategories }) => {
  const [loader, setLoader] = useState(false);
  const { dispatch } = useContext(Context);

  const initialValues = category || {
    name: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
      if (!values.name) {
        return toast.info("Ingresa el nombre de la etiqueta.");
      }
      resetForm();
      await updateCategory(values.id, values.name);
      await getAllCategories(dispatch);
      await getAllProducts(dispatch);
      setShowUpdateCategories(false);
      return toast.success(
        `Etiqueta '${values.name}' actualizada exitosamente.`
      );
    } catch (error) {
      setLoader(false);
      return toast.error(
        "Ocurrió un error al intentar actualizar la etiqueta",
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
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6 z-30">
      <div
        className={`bg-white max-w-screen-xs w-full rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2`}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Actualizar Categoria
          </span>
        </div>
        {/* FORM */}
        <div className="flex-1 w-full">
          <div
            id="form"
            className="flex flex-col w-full h-full justify-between gap-8"
          >
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border-2 py-0.5 px-2 rounded-md w-full outline-blue-700"
            />
            <div className="space-x-4 flex flex-row">
              <button
                onClick={formik.handleSubmit}
                className="bg-blue-700 p-0.5 px-4 rounded-md text-white border border-blue-500 flex flex-row justify-center items-center gap-2"
                type="submit"
              >
                {loader ? "Actualizando..." : "Actualizar"}
                {loader && <Loader size={14} />}
              </button>
              <button
                className="p-0.5 px-4 rounded-md border border-black"
                onClick={() => setShowUpdateCategories(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSection;
