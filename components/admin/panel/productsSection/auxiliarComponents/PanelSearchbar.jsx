import React, { useContext } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { searchProductsByName } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";

const PanelSearchbar = () => {
  const { dispatch } = useContext(Context);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        await searchProductsByName(values.search, dispatch);
      } catch (error) {
        await searchProductsByName(false, dispatch);
        return toast.error("Ocurrió un error al buscar los productos", {
          description: "Intenta nuevamente mas tarde.",
        });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row justify-center items-center w-full"
    >
      <div className="relative">
        <input
          type="text"
          id="search"
          name="search"
          className="border max-w-60 w-full rounded-md border-black/40 p-1.5 pr-10 outline-none"
          placeholder="Buscar..."
          onChange={formik.handleChange}
          value={formik.values.search}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.8}
          stroke="currentColor"
          className="w-6 h-6 absolute right-2 top-2 cursor-pointer"
          onClick={formik.handleSubmit}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </form>
  );
};

export default PanelSearchbar;
