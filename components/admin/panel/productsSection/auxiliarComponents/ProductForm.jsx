import { useFormik } from "formik";
import React, { useState } from "react";
import SelectInputCard from "./SelectInputCard";

const ProductForm = ({ setCrateProduct }) => {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    fewUnits: "",
    limitedOffer: "",
  };

  const state = {
    categories: [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
    ],
    tags: [
      { id: 1, name: "Tag 1" },
      { id: 2, name: "Tag 2" },
      { id: 3, name: "Tag 3" },
    ],
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [removedCategories, setRemovedCategories] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);

  const [prevImages, setPrevImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

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
    console.log(values);
    console.log(selectedCategories);
    console.log(removedCategories);
    console.log(selectedTags)
    console.log(removedTags)
    console.log(newImages)
    console.log(removedImages)
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6">
      <div className="bg-white max-w-screen-sm w-full h-3/4 rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2">
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Crear Producto
          </span>
        </div>
        {/* FORM */}
        <div className="flex-1 w-full">
          <form
            id="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full h-full justify-between"
          >
            <div className="w-full flex flex-col gap-2 overflow-y-scroll max-h-96 scrollbar-none">

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-full gap-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="border-2 py-0.5 px-2 rounded-md"
                  />
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Cantidad"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    className="border-2 py-0.5 px-2 rounded-md"
                  />
                </div>
                <div className="flex w-full">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Descripción"
                    rows={2}
                    maxLength={10}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="border-2 py-0.5 px-2 rounded-md w-full"
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
                    className="border-2 py-0.5 px-2 rounded-md"
                  />
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    placeholder="Descuento"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                    className="border-2 py-0.5 px-2 rounded-md"
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
                        checked={formik.values.fewUnits === "yes"}
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
                        checked={formik.values.fewUnits === "no"}
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
                        checked={formik.values.limitedOffer === "yes"}
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
                        checked={formik.values.limitedOffer === "no"}
                      />
                      <label className="text-xs" htmlFor="no">
                        No
                      </label>
                    </div>
                  </div>
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
                  {state?.categories?.length ? (
                    state.categories.map((c) => {
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
                  {state?.tags?.length ? (
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
              <div className="flex flex-col w-full">
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
                        <SelectInputCard
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
            <div className="space-x-4">
              <button
                className="bg-blue-700 p-0.5 px-4 rounded-md text-white border border-blue-500"
                type="submit"
              >
                Guardar
              </button>
              <button
                className="p-0.5 px-4 rounded-md border border-black"
                onClick={(e) => setCrateProduct(false)}
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
