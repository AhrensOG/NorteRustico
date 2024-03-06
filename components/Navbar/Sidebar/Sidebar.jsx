import { Context } from "@/app/context/GlobalContext";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Sidebar = ({ isOpen = true, setIsOpen }) => {
  const { state } = useContext(Context);
  const router = useRouter();

  const initialValues = {
    search: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      if (values.search !== "") {
        router.push(`/shop?name=${values.search}`);
      }
      if (values.search === "") {
        router.push("/shop");
      }
      resetForm();
      return setIsOpen(false);
    },
  });
  return (
    <div
      className={`md:hidden fixed top-0 left-0 z-40 bg-black/20 h-screen w-screen transition-transform duration-100 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      
      <div className={`fixed h-screen w-1/2 bg-[#CA995D] px-4 pt-8`}>
        <div className="flex flex-col items-start justify-center gap-8 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 absolute -top-5 -right-2 stroke-[#523900]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <Image
            src={"/Product.png"}
            width={80}
            height={80}
            alt="Profile Image"
            className="rounded-full w-[80px] h-[80px] border border-[#523900]"
          />
          <div className="w-full max-w-44 relative">
            <form id="form" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                id="search"
                name="search"
                className="w-full rounded-lg py-0.5 pl-3 pr-10 outline-none shadow-black/30 shadow-lg"
                placeholder="Buscar"
                onChange={formik.handleChange}
                value={formik.values.search}
                title="Buscar - Search"
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 absolute top-1 right-2 cursor-pointer"
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
          <Link href={"/shop"}>
            <span
              className="flex flex-row gap-2 justify-start items-center text-sm  text-[#523900] uppercase font-semibold cursor-pointer"
              title="Tienda - Shop"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-[#523900]"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              Tienda
            </span>
          </Link>
          <Link href={state.user ? "/user/favourites" : "/authenticate"}>
            <span
              className="flex flex-row gap-2 justify-start items-center text-sm  text-[#523900] uppercase font-semibold cursor-pointer"
              title="Favoritos - Favourites"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6 stroke-[#523900]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              Favoritos
            </span>
          </Link>
          <Link href={state.user ? "/user/profile" : "/authenticate"}>
            <span
              className="flex flex-row gap-2 justify-start items-center text-sm  text-[#523900] uppercase font-semibold cursor-pointer"
              title="Perfil - Profile"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-[#523900]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              Perfil
            </span>
          </Link>
          <Link href={state.user ? "/user/cart" : "/authenticate"}>
            <span
              className="flex flex-row gap-2 justify-start items-center text-sm  text-[#523900] uppercase font-semibold cursor-pointer"
              title="Carrito - Cart"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6 stroke-[#523900]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Carrito
            </span>
          </Link>
          {/* <span
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-row gap-2 justify-start items-center text-sm  text-[#523900] uppercase font-semibold cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 rotate-90 stroke-[#523900]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Salir
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
