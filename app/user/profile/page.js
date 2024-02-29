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
          <div className="w-full p-4 md:px-2 lg:px-0 pb-10">
            <span className="text-lg font-bold">Productos Recomendados</span>
            <div className="overflow-x-scroll flex flex-row gap-6 md:gap-10 scrollbar-thumb-[#CA995D] scrollbar-thin scrollbar-track-[#CA995D]/50">
              {state.searchedProductsByScore.map((p) => (
                <SmallProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : (
          <Loader size={40} color="#1D4ED8" />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
