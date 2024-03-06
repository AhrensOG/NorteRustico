"use client";
import { Context } from "@/app/context/GlobalContext";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import Loader from "@/components/Loader";
import SmallProductCard from "@/components/product/SmallProductCard";
import ProfileSection from "@/components/user/profile/ProfileSection";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 500;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 500;
  };

  useEffect(() => {
    if (!state.user) {
      const getUser = async () => {
        const res = await isUserLogged(dispatch);
        if (res === false) {
          toast.info("Inicia sesión y vuelve a ver tu perfil!", {
            description: "Vamos a redirigirte!",
          });
          router.push("/authenticate");
        }
      };
      getUser();
    }
  }, []);

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="max-w-screen-lg w-full flex flex-col justify-center items-center">
        <ProfileSection />
        {/* Recommended Products */}
        {state.searchedProductsByScore ? (
          <div className="w-full p-4 md:px-2 lg:px-0 pb-10 relative group">
            {/* Left Arrow */}
            <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={scrollLeft}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            {/* Right Arrow */}
            <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={scrollRight}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <span className="text-lg font-bold">Productos Recomendados</span>
            <div id="content" className="overflow-x-scroll flex flex-row gap-6 md:gap-10 scrollbar-none scroll-smooth">
              {state.searchedProductsByScore.map((p) => (
                <SmallProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full py-20">
            <Loader size={40} color="#1D4ED8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
