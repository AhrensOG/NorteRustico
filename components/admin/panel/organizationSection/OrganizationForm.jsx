import { Context } from "@/app/context/GlobalContext";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
// import {
//   addImagesToOrganization,
//   createOrganization,
//   getOrganization,
//   removeImagesToOrganization,
//   updateOrganization,
// } from "@/context/actions";
import { toast } from "sonner";
import ImageCard from "./auxiliarComponents/ImageCard";
import {
  addImagesToOrganization,
  createOrganization,
  getOrganization,
  removeImagesToOrganization,
  updateOrganization,
} from "@/app/context/actions";

const OrganizationForm = ({ data = null, setReloadCarousel }) => {
  const { dispatch } = useContext(Context);
  const action = data ? "PUT" : "POST";

  const [loader, setLoader] = useState(false);
  const [prevImages, setPrevImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const initialValues = data || {
    name: "",
    whatsAppLink: "",
    instagramLink: "",
    facebookLink: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      if (action === "POST") {
        let createdOrganization;
        try {
          createdOrganization = await createOrganization(values);
        } catch (error) {
          return toast.error(
            `Ups! Ocurrio un error en la creacion de la organización`,
            {
              description: "Intenta nuevamente mas tarde",
            }
          );
        }

        if (newImages.length) {
          try {
            await addImagesToOrganization(newImages, createdOrganization.id);
            setNewImages([]);
          } catch (error) {
            return toast.error(
              `Ups! Ocurrio un error al subir las imagenes de la organización`,
              {
                description: "Intenta nuevamente mas tarde",
              }
            );
          }
        }
        await getOrganization(dispatch);
        setLoader(false);
        return toast.success(`La informacion se actualizo correctamente`);
      }
      if (action === "PUT") {
        setReloadCarousel(true);
        await updateOrganization(values, data.id);

        if (removedImages.length) {
          await removeImagesToOrganization(removedImages, data.id);
          setRemovedImages([]);
        }
        if (newImages.length) {
          await addImagesToOrganization(newImages, data.id);
          setNewImages([]);
        }
        await getOrganization(dispatch);
        setLoader(false);
      }
      setReloadCarousel(false);
      return toast.success(`La informacion se actualizo correctamente`);
    } catch (error) {
      setReloadCarousel(false);
      return toast.error(
        `Ups! Ocurrio un error en la actualizacion de la organización`,
        {
          description: `Intenta nuevamente mas tarde`,
        }
      );
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    if (data) {
      setPrevImages(data.OrganizationImages || []);
    }
  }, [data]);

  const handleChangeNewImages = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleRemovePrevImages = (image) => {
    if (prevImages.length === 1) {
      return toast.info(
        "Recomendamos no eliminar todas las imagenes del carrusel"
      );
    }
    setPrevImages((prevImg) =>
      prevImg.filter((img) => img.name !== image.name)
    );

    if (!removedImages.some((img) => img.name === image.name)) {
      setRemovedImages((curr) => [...curr, image]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 max-h-[450px]">
      <span className="text-4xl font-medium text-[#1D4ED8] w-full text-center">
        {data ? "Actualizar Informacion" : "Crear Organización"}
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-2 overflow-y-scroll scrollbar-none border-2 rounded-md shadow-inner shadow-[#1D4ED8]/20 "
      >
        {!data ? (
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre de la Organización"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="border border-[#1D4ED8]/40 p-2 rounded-md outline-none"
          />
        ) : (
          <div className="hidden"></div>
        )}
        <input
          id="whatsAppLink"
          name="whatsAppLink"
          type="text"
          placeholder="Link de WhatsApp"
          onChange={formik.handleChange}
          value={formik.values.whatsAppLink}
          className="border border-[#1D4ED8]/40 p-2 rounded-md outline-none"
        />
        <input
          id="instagramLink"
          name="instagramLink"
          type="text"
          placeholder="Link de Instragram"
          onChange={formik.handleChange}
          value={formik.values.instagramLink}
          className="border border-[#1D4ED8]/40 p-2 rounded-md outline-none"
        />
        <input
          id="facebookLink"
          name="facebookLink"
          type="text"
          placeholder="Link de Facebook"
          onChange={formik.handleChange}
          value={formik.values.facebookLink}
          className="border border-[#1D4ED8]/40 p-2 rounded-md outline-none"
        />
        <div>
          <span className="text-sm text-[#1D4ED8]">
            Imágenes del carrusel (JPG, PNG | Recomendado: WEBP )
          </span>
          <input
            title="file"
            type="file"
            multiple
            onChange={handleChangeNewImages}
            className="border border-[#1D4ED8]/40 rounded-md outline-none w-full pr-3 text-gray-500 file:p-2 file:mr-2 file:shadow file:bg-[#1D4ED8] file:border-none file:text-white file:font-semibold"
          />
          <div className="flex flex-row flex-wrap gap-2 pt-2">
            {prevImages.length > 0 &&
              prevImages.map((img) => {
                return (
                  <ImageCard
                    key={img.id}
                    value={img}
                    removeValue={handleRemovePrevImages}
                  />
                );
              })}
          </div>
        </div>
        <button
          type="submit"
          title="button"
          className="p-2 text-xl rounded-md bg-[#1D4ED8] text-white font-bold"
        >
          {loader && action === "POST"
            ? "Creando..."
            : loader && action === "PUT"
            ? "Actualizando..."
            : action === "POST"
            ? "Crear"
            : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default OrganizationForm;
