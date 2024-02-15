import { Context } from "@/app/context/GlobalContext";
import Loader from "@/components/Loader";
import React, { useContext, useEffect, useState } from "react";
import SelectInputCard from "../productsSection/auxiliarComponents/SelectInputCard";
import { useFormik } from "formik";
import { toast } from "sonner";
import { createTag, deleteTag, getAllTags } from "@/app/context/actions";

const PanelTagsSection = ({ setShowTags }) => {
  const { state, dispatch } = useContext(Context);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    name: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
      if (!values.name) {
        return toast.info("Ingresa el nombre de la etiqueta.");
      }
      for (const tag of state?.tags) {
        if (tag.name.toLowerCase() === values.name.toLowerCase()) {
          return toast.warning(
            `La etiqueta '${
              values.name.charAt(0).toUpperCase() +
              values.name.slice(1).toLowerCase()
            }' ya existe.`,
            {
              description: "Intenta con un nombre diferente.",
            }
          );
        }
      }
      await createTag(values);
      resetForm();
      await getAllTags(dispatch);
      return toast.success(
        `Etiqueta '${
          values.name.charAt(0).toUpperCase() +
          values.name.slice(1).toLowerCase()
        }' creada exitosamente.`
      );
    } catch (error) {
      setLoader(false);
      return toast.error("Ocurrió un error al intentar crear la etiqueta", {
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

  const handleRemoveTag = async (tag) => {
    try {
      await deleteTag(tag.id);
      await getAllTags(dispatch);
      return toast.success(`Se ha eliminado la etiqueta '${tag.name}'.`);
    } catch (error) {
      return toast.error("Ocurrió un error al intentar borrar la etiqueta", {
        description: "Intenta nuevamente mas tarde.",
      });
    }
  };

  useEffect(() => {}, [state.tags]);

  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6 z-30">
      <div
        className={`bg-white max-w-screen-sm w-full rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2`}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Crear Etiquetas
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
                  {state?.tags?.length > 0 ? (
                    state.tags.map((c) => {
                      return (
                        <SelectInputCard
                          key={c.id}
                          value={c}
                          removeValue={handleRemoveTag}
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
                onClick={() => setShowTags(false)}
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

export default PanelTagsSection;
