import { Context } from "@/app/context/GlobalContext";
import Loader from "@/components/Loader";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/app/context/actions";
import CategoryCard from "./auxiliarComponents/CategoryCard";

const PanelCategoriesSection = ({ setShowCategories }) => {
  const { state, dispatch } = useContext(Context);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    name: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
      if (!values.name) {
        return toast.info("Ingresa el nombre de la categoria.");
      }
      if (Array.isArray(state?.categories)) {
        for (const category of state?.categories) {
          if (category.name.toLowerCase() === values.name.toLowerCase()) {
            console.log(category);
            return toast.warning(
              `La categoria '${
                values.name.charAt(0).toUpperCase() +
                values.name.slice(1).toLowerCase()
              }' ya existe.`,
              {
                description: "Intenta con un nombre diferente.",
              }
            );
          }
        }
      }
      await createCategory(values);
      resetForm();
      await getAllCategories(dispatch);
      return toast.success(
        `Categoria '${
          values.name.charAt(0).toUpperCase() +
          values.name.slice(1).toLowerCase()
        }' creada exitosamente.`
      );
    } catch (error) {
      setLoader(false);
      return toast.error("Ocurrió un error al intentar crear la categoria", {
        description: "Intenta nuevamente mas tarde.",
      });
    } finally {
      setLoader(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleRemoveCategory = async (category) => {
    try {
      await deleteCategory(category.id);
      await getAllCategories(dispatch);
      return toast.success(`Se ha eliminado la categoría '${category.name}'.`);
    } catch (error) {
      return toast.error("Ocurrió un error al intentar borrar la categoria", {
        description: "Intenta nuevamente mas tarde.",
      });
    }
  };

  useEffect(() => {}, [state.categories]);

  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6 z-30">
      <div
        className={`bg-white max-w-screen-sm w-full rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2`}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Crear Categorias
          </span>
        </div>
        {/* FORM */}
        <div className="flex-1 w-full">
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full h-full justify-between gap-8"
          >
            <div className="w-full flex flex-col gap-2 overflow-y-scroll max-h-96 scrollbar-none">
              {/* Categories */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row flex-wrap gap-2">
                  {state?.categories !== undefined &&
                  Array.isArray(state?.categories) &&
                  state?.categories?.length > 0 ? (
                    state.categories.map((c) => {
                      return (
                        <CategoryCard
                          key={c.id}
                          value={c}
                          removeValue={handleRemoveCategory}
                          fullName={true}
                        />
                      );
                    })
                  ) : (
                    <div className="flex flex-row w-full justify-center">
                      <Loader size={26} color="#1D4ED8" />
                    </div>
                  )}
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="border-2 py-0.5 px-2 rounded-md w-full outline-blue-700"
                />
              </div>
            </div>
            <div className="space-x-4 flex flex-row">
              <button
                className="bg-blue-700 p-0.5 px-4 rounded-md text-white border border-blue-500 flex flex-row justify-center items-center gap-2"
                type="submit"
              >
                {loader ? "Guardando..." : "Guardar"}
                {loader && <Loader size={14} />}
              </button>
              <button
                className="p-0.5 px-4 rounded-md border border-black"
                onClick={() => setShowCategories(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PanelCategoriesSection;
