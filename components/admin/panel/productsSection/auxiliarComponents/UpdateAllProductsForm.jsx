import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import { getAllProducts, updateAllProducts } from "@/app/context/actions";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const UpdateAllProductsForm = ({ setEditAllProducts }) => {
  const { dispatch } = useContext(Context);

  const initialValues = {
    price: "",
    quantity: "",
  };

  const [loader, setLoader] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
      if (values.price === "" && values.quantity === "") {
        return toast.info("Debes completar al menos un campo para actualizar");
      }
      await updateAllProducts(values);
      await getAllProducts(dispatch);
      await resetForm();
      setEditAllProducts(false);
      return toast.success("Productos actualizados exitosamente!");
    } catch (error) {
      setLoader(false);
      return toast.error(
        "Ocurrió un error al intentar actualizar los productos",
        {
          description: "Verifica que los campos esten completos!",
        }
      );
    } finally {
      setLoader(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="fixed bg-black/50 w-full h-full top-0 left-0 flex flex-row items-center justify-center px-6">
      <div
        className={`bg-white max-w-screen-xs w-full rounded-md p-4 px-6 flex flex-col justify-start items-start gap-2`}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <span className="text-lg font-medium text-black/60">
            Actualizar todos los Productos
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
              {/* Price / Discount  */}
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Precio ( % )"
                onChange={formik.handleChange}
                value={formik.values.price}
                className="border-2 outline-blue-700 py-0.5 px-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
              <div className="flex flex-row w-full gap-2"></div>
            </div>
            <div className="space-x-4 flex flex-row">
              <button
                className="bg-blue-700 p-0.5 px-4 rounded-md text-white border border-blue-500 flex flex-row justify-center items-center gap-2"
                type="submit"
              >
                {loader ? "Actualizando..." : "Actualizar"}
                {loader && <Loader size={14} />}
              </button>
              <button
                className="p-0.5 px-4 rounded-md border border-black"
                onClick={() => setEditAllProducts(false)}
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

export default UpdateAllProductsForm;
