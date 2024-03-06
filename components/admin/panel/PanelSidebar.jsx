import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const PanelSidebar = ({
  showProducts,
  showCategories,
  showTags,
  showUsers,
  showOrders,

  setShowProducts,
  setShowCategories,
  setShowTags,
  setShowUsers,
  setShowOrders,
  handleChangeSection,
}) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-[#CA995D] max-w-64 w-full">
      <div className="p-8 flex flex-col justify-center items-start gap-16">
        <div className="relative w-48 h-20">
          <Image
            src={"/Logo.png"}
            fill
            alt="Logo"
            className="rounded-2xl object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 190px) 25vw, 80px"
            priority={true}
          />
        </div>
        <div className="flex flex-col justify-center items-start w-full gap-4">
          <span
            className={`flex flex-row justify-start items-center text-xl gap-2 w-full ${
              showProducts && "bg-black text-white"
            } hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg cursor-pointer`}
            onClick={() => handleChangeSection(true, setShowProducts)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            Productos
          </span>
          <span
            className={`flex flex-row justify-start items-center text-xl gap-2 w-full ${
              showCategories && "bg-black text-white"
            } hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg cursor-pointer`}
            onClick={() => setShowCategories(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
              />
            </svg>
            Categorias
          </span>
          <span
            className={`flex flex-row justify-start items-center text-xl gap-2 w-full ${
              showTags && "bg-black text-white"
            } hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg cursor-pointer`}
            onClick={() => setShowTags(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
            Etiquetas
          </span>
          <span
            className={`flex flex-row justify-start items-center text-xl gap-2 w-full ${
              showUsers && "bg-black text-white"
            } hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg cursor-pointer`}
            onClick={() => handleChangeSection(true, setShowUsers)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Clientes
          </span>
          <span
            className={`flex flex-row justify-start items-center text-xl gap-2 w-full ${
              showOrders && "bg-black text-white"
            } hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg cursor-pointer`}
            onClick={() => handleChangeSection(true, setShowOrders)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Pedidos
          </span>
          <button
            onClick={() =>
              toast.info("Deseas cerrar sesion?", {
                action: {
                  label: "Confirmar",
                  onClick: handleSignOut,
                },
              })
            }
            className="flex flex-row justify-start items-center text-xl gap-2 w-full hover:bg-black hover:text-white p-1.5 pr-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelSidebar;
