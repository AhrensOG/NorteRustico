import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import SelectInputCard from "./SelectInputCard";
import { Context } from "@/app/context/GlobalContext";
import {
  addCategoriesToProduct,
  addImagesToProduct,
  addTagsToProduct,
  createProduct,
  getAllProducts,
  removeCategoriesToProduct,
  removeImagesToProduct,
  removeTagsToProduct,
  searchProductsByName,
  updateProduct,
} from "@/app/context/actions";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import ImageInputCard from "./ImageInputCard";

const ProductForm = ({
  setCrateProduct = false,
  setEditProduct = false,
  data = null,
}) => {
  const { state, dispatch } = useContext(Context);

  const initialValues = data || {
    name: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    fewUnits: "",
    limitedOffer: "",
    heigth: "",
    width: "",
    large: "",
    weight: "",
  };
  const action = data?.id ? "PUT" : "POST";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [removedCategories, setRemovedCategories] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);

  const [prevImages, setPrevImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loader, setLoader] = useState(false);

  const handleChangeCategories = (e) => {
    e.preventDefault();
    const categoryObj = state.categories.find((c) => c.name === e.target.value);

    if (
      categoryObj &&
      !selectedCategories.some((cat) => cat.name === e.target.value)
    ) {
      setRemovedCategories((curr) =>
        curr.filter((cat) => cat.name !== categoryObj.name)
      );

      setSelectedCategories((curr) => [...curr, categoryObj]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.name !== category.name)
    );
    if (!removedCategories.some((cat) => cat.name === category.name)) {
      setRemovedCategories((curr) => [...curr, category]);
    }
  };

  const handleChangeTags = (e) => {
    e.preventDefault();
    const tagObj = state.tags.find((t) => t.name === e.target.value);

    if (tagObj && !selectedTags.some((tag) => tag.name === e.target.value)) {
      setRemovedTags((curr) => curr.filter((tag) => tag.name !== tagObj.name));

      setSelectedTags((curr) => [...curr, tagObj]);
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t.name !== tag.name));
    if (!removedTags.some((t) => t.name === tag.name)) {
      setRemovedTags((curr) => [...curr, tag]);
    }
  };

  const handleRemovePrevImages = (image) => {
    setPrevImages((prevImg) =>
      prevImg.filter((img) => img.name !== image.name)
    );

    if (!removedImages.some((img) => img.name === image.name)) {
      setRemovedImages((curr) => [...curr, image]);
    }
  };

  const handleChangeNewImages = (e) => {
    e.preventDefault();
    Array.from(e.target.files).forEach((image) => {
      setNewImages((curr) => [...curr, image]);
    });
  };

  const onSubmit = async (values, { resetForm }) => {
    if (action === "POST") {
      try {
        setLoader(true);
        if (
          !selectedCategories.length ||
          !selectedTags.length ||
          !newImages.length
        ) {
          return toast.error("Ocurrio un error al intentar crear el producto", {
            description: `Verifica que todos los campos esten completos.`,
          });
        }
        const product = await createProduct(values);
        await addCategoriesToProduct(product.id, selectedCategories);
        await addTagsToProduct(product.id, selectedTags);
        try {
          await addImagesToProduct(product.id, newImages);
        } catch (error) {
          return toast.error(
            "Ocurrio un error al intentar subir las imagenes.",
            { description: `Verifica los archivos (JPG/PNG).` }
          );
        }
        await getAllProducts(dispatch);
        if (state.searchedProductName) {
          await searchProductsByName(state.searchedProductName, dispatch);
        }
        resetForm();

        setSelectedCategories([]);
        setRemovedCategories([]);

        setSelectedTags([]);
        setRemovedTags([]);

        setRemovedImages([]);
        setNewImages([]);

        return toast.success("Producto creado exitosamente!");
      } catch (error) {
        setLoader(false);
        return toast.error("Ocurrio un error al intentar crear el producto", {
          description: `Verifica que todos los campos esten completos.`,
        });
      } finally {
        setLoader(false);
      }
    }
    if (action === "PUT") {
      setLoader(true);
      try {
        const product = await updateProduct(values);
        if (removedCategories.length) {
          if (selectedCategories.length >= 1) {
            await removeCategoriesToProduct(product.id, removedCategories);
            setRemovedCategories([]);
          } else {
            return toast.error(
              "Estas quitando todas las categorias al producto.",
              { description: `Debes seleccionar por lo menos una categoria.` }
            );
          }
        }
        if (removedTags.length) {
          if (selectedTags.length >= 1) {
            await removeTagsToProduct(product.id, removedTags);
            setRemovedTags([]);
          } else {
            return toast.error(
              "Estas quitando todas las etiquetas al producto.",
              { description: `Debes seleccionar por lo menos una categoria.` }
            );
          }
        }
        if (removedImages.length) {
          if (prevImages.length >= 1) {
            try {
              await removeImagesToProduct(product.id, removedImages);
            } catch (error) {
              return toast.error(
                "Ocurrio un error al intentar eliminar las imagenes.",
                {
                  description: `Intentalo mas tarde o comunicalo a tu WebMaster.`,
                }
              );
            }
          } else {
            return toast.error(
              "Estas quitando todas las imagenes al producto.",
              { description: `Debes seleccionar por lo menos una imagen.` }
            );
          }
        }
        if (selectedCategories.length) {
          await addCategoriesToProduct(product.id, selectedCategories);
        }
        if (selectedTags.length) {
          await addTagsToProduct(product.id, selectedTags);
        }
        if (newImages.length) {
          try {
            await addImagesToProduct(product.id, newImages);
          } catch (error) {
            return toast.error(
              "Ocurrio un error al intentar subir las imagenes.",
              { description: `Verifica los archivos (JPG / PNG ).` }
            );
          }
        }

        await getAllProducts(dispatch);
        if (state.searchedProductName) {
          await searchProductsByName(state.searchedProductName, dispatch);
        }
        return toast.success("Producto actualizado exitosamente!");
      } catch (error) {
        setLoader(false);
        return toast.error(
          "Ocurrió un error al intentar actualizar el producto",
          {
            description: "Verifica que todos los campos y las imagenes.",
          }
        );
      } finally {
        setLoader(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    data?.Categories && setSelectedCategories(data.Categories);
    setRemovedCategories([]);
    data?.Tags && setSelectedTags(data.Tags);
    setRemovedTags([]);
    data?.ProductImages && setPrevImages(data.ProductImages);
    setRemovedImages([]);
  }, [data, newImages]);

  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6">
      <div
        className={`bg-white max-w-screen-sm w-full rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2`}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            {action === "POST" ? "Crear Producto" : "Actualizar Producto"}
          </span>
        </div>
        {/* FORM */}
        <div className="flex-1 w-full">
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full h-full justify-between gap-8"
          >
            <div className="w-full flex flex-col gap-2 overflow-y-scroll max-h-[460px] scrollbar-none">
              {/* Name / Quantity / Description */}
              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-full gap-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="border-2 outline-blue-700 py-0.5 px-2 rounded-md"
                  />
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Cantidad"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    className="border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex w-full">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Descripción"
                    rows={2}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="border-2 outline-blue-700 py-0.5 px-2 rounded-md w-full"
                  />
                </div>
              </div>

              {/* Price / Discount / Radio inputs */}
              <div className="flex flex-row w-full gap-2">
                {/* Price / Discount  */}
                <div className="flex flex-col w-full gap-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Precio"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    className="border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    placeholder="Descuento"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                    className="border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* RADIO INPUTS */}
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-xs">¿Pocas unidades?</span>
                    <div className="space-x-2">
                      <input
                        type="radio"
                        name="fewUnits"
                        value="yes"
                        onChange={formik.handleChange}
                        checked={
                          formik.values.fewUnits === "yes" ||
                          formik.values.fewUnits === true
                        }
                      />
                      <label className="text-xs" htmlFor="yes">
                        Si
                      </label>
                    </div>
                    <div className="space-x-2">
                      <input
                        type="radio"
                        name="fewUnits"
                        value="no"
                        onChange={formik.handleChange}
                        checked={
                          formik.values.fewUnits === "no" ||
                          formik.values.fewUnits === false
                        }
                      />
                      <label className="text-xs" htmlFor="no">
                        No
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-xs">
                      ¿Oferta por tiempo limitado?
                    </span>
                    <div className="space-x-2">
                      <input
                        type="radio"
                        name="limitedOffer"
                        value="yes"
                        onChange={formik.handleChange}
                        checked={
                          formik.values.limitedOffer === "yes" ||
                          formik.values.limitedOffer === true
                        }
                      />
                      <label className="text-xs" htmlFor="yes">
                        Si
                      </label>
                    </div>
                    <div className="space-x-2">
                      <input
                        type="radio"
                        name="limitedOffer"
                        value="no"
                        onChange={formik.handleChange}
                        checked={
                          formik.values.limitedOffer === "no" ||
                          formik.values.limitedOffer === false
                        }
                      />
                      <label className="text-xs" htmlFor="no">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-row w-full gap-2">
                  <input
                    id="heigth"
                    name="heigth"
                    type="number"
                    placeholder="Alto ( cm )"
                    onChange={formik.handleChange}
                    value={formik.values.heigth}
                    className="w-full border-2 outline-blue-700 py-0.5 px-2 rounded-md"
                  />
                  <input
                    id="width"
                    name="width"
                    type="number"
                    placeholder="Ancho ( cm )"
                    onChange={formik.handleChange}
                    value={formik.values.width}
                    className="w-full border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex flex-row w-full gap-2">
                  <input
                    id="large"
                    name="large"
                    type="text"
                    placeholder="Largo ( cm )"
                    onChange={formik.handleChange}
                    value={formik.values.large}
                    className="w-full border-2 outline-blue-700 py-0.5 px-2 rounded-md"
                  />
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Peso ( kg )"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                    className="w-full border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-col w-full gap-2">
                <select
                  className="border-2 py-0.5 px-1 rounded-md w-full outline-none text-black/35 font-medium"
                  onChange={(e) => handleChangeCategories(e)}
                >
                  <option value={null} name={null}>
                    Seleccionar categorias
                  </option>
                  {state?.categories !== undefined &&
                  Array.isArray(state?.categories) &&
                  state?.categories?.length > 0 ? (
                    state?.categories?.map((c) => {
                      return (
                        <option
                          key={c.id}
                          value={c.name}
                          name={c.name}
                          className="text-black"
                        >
                          {c.name}
                        </option>
                      );
                    })
                  ) : (
                    <option className="notFound " disabled>
                      Sin Categorias
                    </option>
                  )}
                </select>
                <div className="flex flex-row flex-wrap gap-2">
                  {selectedCategories.length > 0 &&
                    selectedCategories.map((c) => {
                      return (
                        <SelectInputCard
                          key={c.id}
                          value={c}
                          removeValue={handleRemoveCategory}
                        />
                      );
                    })}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col w-full gap-2">
                <select
                  className="border-2 py-0.5 px-1 rounded-md w-full outline-none text-black/35 font-medium"
                  onChange={(e) => handleChangeTags(e)}
                >
                  <option value={null} name={null}>
                    Seleccionar Etiquetas
                  </option>
                  {state?.tags !== undefined &&
                  Array.isArray(state?.tags) &&
                  state?.tags?.length > 0 ? (
                    state.tags.map((c) => {
                      return (
                        <option
                          key={c.id}
                          value={c.name}
                          name={c.name}
                          className="text-black"
                        >
                          {c.name}
                        </option>
                      );
                    })
                  ) : (
                    <option className="notFound " disabled>
                      Sin Categorias
                    </option>
                  )}
                </select>
                <div className="flex flex-row flex-wrap gap-2">
                  {selectedTags.length > 0 &&
                    selectedTags.map((t) => {
                      return (
                        <SelectInputCard
                          key={t.id}
                          value={t}
                          removeValue={handleRemoveTag}
                        />
                      );
                    })}
                </div>
              </div>

              {/* File Input */}
              <div className="flex flex-col w-full gap-2">
                <input
                  type="file"
                  multiple
                  className="border rounded-md outline-none w-full pr-3 text-gray-500 file:p-2 file:mr-2 file:bg-blue-700 file:border-none file:text-white file:font-medium cursor-pointer file:cursor-pointer"
                  onChange={(e) => handleChangeNewImages(e)}
                />
                <div className="flex flex-row flex-wrap gap-2">
                  {prevImages.length ? (
                    prevImages.map((img) => {
                      return (
                        <ImageInputCard
                          key={img.id}
                          value={img}
                          removeValue={handleRemovePrevImages}
                        />
                      );
                    })
                  ) : (
                    <div className="hidden"></div>
                  )}
                </div>
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
                onClick={
                  setCrateProduct
                    ? () => setCrateProduct(false)
                    : () => setEditProduct(false)
                }
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

export default ProductForm;
